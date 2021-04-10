import Vue from 'vue'
import Vuex from 'vuex'
import moduleRestaurant from './modules/restaurant'
import moduleReservation from './modules/reservation'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
    restaurant: moduleRestaurant,
    reservation: moduleReservation,
    }
  })