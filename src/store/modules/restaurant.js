import {getRestaurantsAPI, getRestaurantDetailsAPI } from '../../api/yelpAPI'

export default {
    state: {
        restaurants:  [],
        detailsRestaurant: {},
      },
    mutations: {
        setRestaurants (state, restaurants)  {
          state.restaurants = restaurants ;
        },
        setDetailsRestaurant (state, detailsRestaurant)  {
          state.detailsRestaurant = detailsRestaurant ;
        }
      },
    actions: {
       async getRestaurantsAsync (context,param) {
         if(param)
          context.commit('setRestaurants', await getRestaurantsAPI(param.location,param.search,param.open_now,param.categories))
          else
          context.commit('setRestaurants', await getRestaurantsAPI())
        },
        async getDetailsRestaurantAsync (context,id) {
           context.commit('setDetailsRestaurant', await getRestaurantDetailsAPI(id))
         }
    }
  }