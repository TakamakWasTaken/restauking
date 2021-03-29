<template>
  <v-container>
   
    <div v-if="this.restos != undefined">resto YES
      <v-card v-for="r in restos" :key="r.id">
        {{ r.name }}
      </v-card>

    </div>
    <div v-else>resto NO</div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
