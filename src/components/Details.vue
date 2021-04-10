<template>
    <v-container>
        <div>RestaurantDetails {{ $route.params.restaurantId }}</div>
        <ModalReservation :id-restaurant="$route.params.restaurantId"></ModalReservation>
    </v-container>
</template>

<script>
import ModalReservation from './ModalReservation'

export default {
    
    components: {
        ModalReservation,
    },

}
</script>
