import firebase from 'firebase/app'
import 'firebase/database'

 const db = firebase
  .initializeApp({ databaseURL: 'https://restauking-4c780-default-rtdb.firebaseio.com/' })
  .database()


 function addReservation(name,email,nbPeople,date,time,message,idRestaurant,is_checkout = false){
    var pushedRef = db.ref('bookings').push({
        name: name,
        email: email,
        nbPeople: nbPeople,
        date : date,
        time : time,
        message : message,
        idRestaurant: idRestaurant,
        is_checkout :is_checkout
      })
      console.log('addReservation()',name,email,nbPeople,date,time,message,idRestaurant,is_checkout, pushedRef.key);
      return pushedRef.key;
  }

   async function getReservations(email){
     try {
    const snapshot = await db.ref('bookings').orderByChild('email').equalTo(email).get()
      if (snapshot.exists()) {
        console.log('getReservations()', snapshot.val());
        return snapshot.val();
      }
      else {
        console.log('getReservations()', "No data available");
      }
    }
    catch(error) {
      console.log('getReservations()',error);
    }
    return [];
  }

  function checkoutReservation(idReservation){
    db.ref('bookings/'+idReservation).update({
        is_checkout :true
      })
      console.log('checkoutReservation()',idReservation);
  }

  export {addReservation,checkoutReservation,getReservations,db}