import Details from './components/Details.vue';
import HelloWorld from './components/HelloWorld.vue'

export default [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
        path: '/Details/:restaurantId ',
        name: 'Details',
        component: Details
    }
  ]