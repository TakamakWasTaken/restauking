<template>
  <v-container>
   
    <v-layout v-if="this.restos != undefined" align-center justify-center row fill-height>
      <v-flex
        v-for="r in restos"
        :key="r.id"
        xs4
        sm3
        class="flexContainer"
      >
        <v-card width="95%" height="380px" class="restoCard">
          
          <v-img v-if="r.image_url"
            :src="`${ r.image_url }`"
            class="restaurantImg"
          ></v-img>
          <v-img v-else
            :src="require('../assets/restaurant-default.png')"
            class="restaurantImg"
          ></v-img>
          <v-card-title primary-title>
            <h2 class="headline mb-0">{{ r.name }}</h2>
          </v-card-title>
          <div class="restaurantLocation">{{ r.location.city }}
          </div>
        <v-card></v-card>
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
      restos: undefined
    }),
   mounted: function () {
     this.$store.dispatch('getRestaurantsAsync');
     this.$store.dispatch('getRestaurantsAsync',{location:'Clermont-Ferrand',search:'',is_closed:true,categories:'Fast Food'}).then(() => {
       this.restos = this.$store.state.restaurant.restaurants;
     });
    }
  }
</script>
