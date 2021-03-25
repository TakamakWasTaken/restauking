import Vue from 'vue'
import Vuex from 'vuex'
import moduleRestaurant from './modules/restaurant'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
    restaurant: moduleRestaurant,
    }
  })