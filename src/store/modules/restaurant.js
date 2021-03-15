const moduleRestaurant = {
    state: () => ({
        restaurants: {}
      }),
    mutations: {
        getRestaurants () {
        }
      },
    actions: {
        getRestaurants (context) {
          context.commit('getRestaurants')
        }
    }
  }