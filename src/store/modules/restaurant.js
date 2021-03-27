import {getRestaurantsAPI } from '../../api/yelpAPI'

export default {
    state: {
        restaurants: {}
      },
    mutations: {
        setRestaurants (state, restaurants)  {
          state.restaurants = restaurants ;
        }
      },
    actions: {
       async getRestaurantsAsync (context,param) {
         if(param)
          context.commit('setRestaurants', await getRestaurantsAPI(param.location,param.search,param.is_closed,param.categories))
          else
          context.commit('setRestaurants', await getRestaurantsAPI())
        }
    }
  }