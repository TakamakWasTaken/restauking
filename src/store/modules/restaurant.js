import {getRestaurantsAPI, getRestaurantDetailsAPI,getCategoriesAPI, getAutoCompleteRestaurantsAPI } from '../../api/yelpAPI'

export default {
    state: {
        restaurants:  [],
        categories:  [],
        detailsRestaurant: {},
      },
    mutations: {
        setRestaurants (state, restaurants)  {
          state.restaurants = restaurants ;
        },
        setCategories (state, categories)  {
          state.categories = categories ;
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
         },
       async getCategoriesAsync (context) {
          context.commit('setCategories', await getCategoriesAPI())
        },
        async getAutoCompleteRestaurantsAsync (context,param) {
         return await getAutoCompleteRestaurantsAPI(param.search, param.latitude, param.longitude)
        }
    }
  }