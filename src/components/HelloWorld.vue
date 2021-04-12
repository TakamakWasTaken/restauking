<template>
  <v-container style="margin-top:12px;">
    <v-autocomplete
      dense
      filled
      solo
      auto-select-first
      label="Autocomplete search"
      :search-input.sync="autoCompleteSearch"
      :loading="loading"
      :items="items"
      item-text="name"
      item-value="name"
      @keyup="search"
    ></v-autocomplete>
    <h3>Catégories:</h3>
    <v-row class="searchCategoryContainer" v-if="categoriesAvailable != undefined">
      <v-col v-for="c in categoriesAvailable" :key="c.id" cols="2">
        <v-checkbox style="max-height: 20px;"
          v-model="selectedCategories"
          @click="search"
          :value="c.alias"
          :label="c.title"
        ></v-checkbox>
      </v-col>
    </v-row>
    <div v-else>
      Loading available categories
    </div>
    <v-range-slider
      :tick-labels="starNumber"
      hint=""
      min="1"
      max="5"
      step="0.5"
      label="Filtrer par note"
      ticks="always"
      tick-size="5"
      class="searchSlider"
      v-model="range"
      @change="tes"
    ></v-range-slider>
    <v-checkbox
      v-model="openOnly"
      @click="search"
      label="Seulement les restaurants ouverts"
    ></v-checkbox>
    <v-layout v-if="restaurantsFiltered != undefined" align-center justify-center row fill-height>

      <v-flex
        v-for="r in restaurantsFiltered"
        :key="r.id"
        xs4
        class="restoCardContainer">
        <v-card class="restoCard">
          <v-img v-if="r.image_url"
            :src="`${ r.image_url }`"
            class="restaurantImg"
          ></v-img>
          <v-img v-else
            :src="require('../assets/restaurant-default.png')"
            class="restaurantImg"
          ></v-img>
          <div class="restaurantInfos">
            <v-card-title primary-title class="restoName">
              <h2 class="headline mb-0">{{ r.name }}</h2>
            </v-card-title>
            <div class="restaurantLocation">
              <img :src="require('../assets/position.png')" class="logoPosition" height="21px">
              {{ r.location.city }}<div v-if="r.price" style="margin-left: 5px;"> - {{ r.price}}</div>
            </div>
            <v-layout class="categoryContainer" v-if="r.categories.length != 0">
              <v-card class="restaurantCategory" v-for="c in r.categories" :key="c.id">{{ c.title }}</v-card>

            </v-layout>
            <div v-else>no cat</div>
            <v-rating
              background-color="blue lighten-2"
              color="blue"
              half-increments
              hover
              readonly
              length="5"
              size="24"
              :value="r.rating"
            ></v-rating>
            <router-link class="routerLink" tag="button" :to="{ name: 'Details', params: { restaurantId: r.id }}">Voir le détail</router-link>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-else>Searching restaurants</div>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
      restos: undefined,
      query: "",
      autoCompQuery:null,
      loading: false,
      openOnly: false,
      selectedCategories: [],
      categoriesAvailable: [],
      results: [],
      starNumber: [1,1.5,2,2.5,3,3.5,4,4.5,5],
      autoCompleteSearch: null,
      range: [1,5],
    }),
    mounted: function () {
      var store = this.$store;
      // store.dispatch('getRestaurantsAsync');
      // store.dispatch('getRestaurantsAsync',{search:'',open_now:true,categories:'FastFood'});
      // store.dispatch('getDetailsRestaurantAsync','4qS4kIbGlGfswmUY-o37_g');
      store.dispatch('getRestaurantsAsync',{location:'',search:'',categories:''}).then(() => {
        this.restos = store.state.restaurant.restaurants;
      });
      
        store.dispatch('getCategoriesAsync').then(() => {
        this.categoriesAvailable = store.state.restaurant.categories;
      });
      
    },
    methods: {
      search(){
        console.log("Querry --> " + this.query);
        var cats="";
        for(var i=0; i< this.selectedCategories.length; i++){
          if(i==0)
            cats +=this.selectedCategories[i];
          else
            cats+=","+this.selectedCategories[i];
        }
        this.$store.dispatch('getRestaurantsAsync',{location:'Lyon',search:this.query,open_now:this.openOnly,categories:cats}).then(() => {
          this.restos = this.$store.state.restaurant.restaurants;
        });
      },
      tes(){
        console.log(this.range);
      }
    },
    watch: {
      autoCompleteSearch (val) {
        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true
        
        console.log("ICI: "+this.autoCompQuery);
        this.$store.dispatch('getAutoCompleteRestaurantsAsync',{search:val,latitude:45.759060,longitude:4.847331}).then((result) => {
          this.results = result;
        }).finally(() => {
          console.log(this.results);
          this.isLoading = false;
          this.query= val;
          this.search();
        });
      },
    },
    computed: {
      items(){
        return this.results
      },
      restaurantsFiltered(){
        return this.restos?.filter(x=> x.rating>= this.range[0] && x.rating<= this.range[1]);
      }
    },
  }
</script>
