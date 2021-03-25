import {getRestaurantsAPI } from '../../api/yelpAPI'

export default {
    state: {
        restaurants: {}
      },
    mutations: {
        getRestaurants ()  {
          getRestaurantsAPI();
        }
      },
    actions: {
        getRestaurants (context) {
          context.commit('getRestaurants')
        }
    }
  }