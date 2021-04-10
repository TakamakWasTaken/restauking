import {addReservation,checkoutReservation,getReservations } from '../../database/firebase'
import {payReservation } from '../../api/paymentRequestAPI'

export default {
    state: {
        reservations:  [],
      },
    mutations: {
        setReservations (state, reservations)  {
          state.reservations = reservations ;
        }
      },
    actions: {
      
         addReservation (context,param) {
          return addReservation(param.name,param.email,param.nbPeople,param.date,param.time,param.message,param.idRestaurant)
         },
         async getReservations (context,email) {
          context.commit('setReservations', await getReservations(email))
         },
         async payReservation (context,param) {
          if (await payReservation(param.nbPeople,param.pricePerPeople))
          {
            checkoutReservation(param.idReservation)
            return true;
          }
          return false;
         },
    }
  }