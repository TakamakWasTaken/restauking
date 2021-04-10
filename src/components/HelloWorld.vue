<template>
  <v-container>
   
    <v-layout v-if="restos != undefined" align-center justify-center row fill-height>
      <v-flex
        v-for="r in restos"
        :key="r.id"
        xs4
        sm3
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
            <v-card-title primary-title>
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
            <router-link class="detailsBtn" tag="button" :to="{ name: 'Details', params: { restaurantId: r.id }}">Voir le détail</router-link>

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
    computed: {

    },
    data: () => ({
      restos: undefined
    }),
    mounted: function () {
      var store = this.$store;
      // store.dispatch('getRestaurantsAsync');
      // store.dispatch('getRestaurantsAsync',{search:'',open_now:true,categories:'FastFood'});
      // store.dispatch('getDetailsRestaurantAsync','4qS4kIbGlGfswmUY-o37_g');
      store.dispatch('getRestaurantsAsync',{location:'Clermont-Ferrand',search:'',is_closed:true,categories:'Fast Food'}).then(() => {
       this.restos = store.state.restaurant.restaurants;
     });
    }
  }
</script>
