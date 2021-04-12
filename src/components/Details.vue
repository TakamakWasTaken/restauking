<template>
    <v-container class="detailsContainer">
        <v-card class="restoCardDetails" v-if="resto != undefined">
          <v-img v-if="resto.image_url"
            :src="`${ resto.image_url }`"
            class="restaurantImg"
          ></v-img>
          <v-img v-else
            :src="require('../assets/restaurant-default.png')"
            class="restaurantImg"
          ></v-img>
          <div class="restaurantInfos">
            <v-card-title primary-title class="restoName">
              {{ resto.name }}
            </v-card-title>
            <div class="restaurantLocation">
              <img :src="require('../assets/position.png')" class="logoIcons" height="21px">
              {{ resto.location.city }}
              <div v-if="resto.price" style="margin-left: 5px;"> - {{ resto.price}}</div>
              
            </div>
            <div>
                <img :src="require('../assets/phone.jpg')" class="logoIcons" height="21px">
                {{ resto.display_phone }}
            </div>
            <div v-if="resto.transactions.length != 0">
                <p v-for="t in resto.transactions" :key="t.id">{{ resto.transactions.title }}</p>
            </div>
            
            <div v-if="resto.hours != undefined" class="hoursContainer">
                <h4>Horaires d'ouverture:</h4>
                <ul>
                    <li v-for="h in resto.hours[0].open" :key="h.id">
                        {{getDay(h.day)}}: 
                        {{formatHour(h.start)}} - {{formatHour(h.end)}}
                    </li>
                </ul>
            </div>
            <div v-else>Pas d'horaire indiqué</div>
            <h4 class="catTitle">Catégories:</h4>
            <v-layout class="categoryContainer" v-if="resto.categories.length != 0">
                <v-card class="restaurantCategory" v-for="c in resto.categories" :key="c.id">{{ c.title }}</v-card>

            </v-layout>
            <div v-else>Aucune catégorie trouvée</div>
            <div v-if="resto.review_count != undefined" class="reviewCountContainer">
                <b>Nombre de vues:</b> {{ resto.review_count }}
            </div>
            <v-row>
                <v-rating
                background-color="blue lighten-2"
                color="blue"
                half-increments
                hover
                readonly
                length="5"
                size="24"
                :value="resto.rating"
                class="ratingDetails"
                ></v-rating>
                <ModalReservation :id-restaurant="$route.params.restaurantId"></ModalReservation>
            </v-row>
            </div>
            <router-link class="routerLink" tag="button" :to="{ name: 'Home'}">Retour</router-link>
        </v-card>
        <div v-else>Chargement du restaurant</div>
    </v-container>
</template>

<script>
import ModalReservation from './ModalReservation'

export default {
    name: 'Details',
    components: {
        ModalReservation,
    },
    data: () => ({
        resto: undefined
    }),
    mounted: function () {
        var store = this.$store;
        store.dispatch('getDetailsRestaurantAsync',this.$route.params.restaurantId).then(() => {
            this.resto = store.state.restaurant.detailsRestaurant;
        });
    },
    methods: {
        getDay(day) {
            var weekDay;
            if(day == 0)
                weekDay="Lundi"
            else if(day==1)
                weekDay="Mardi"
            else if(day==2)
                weekDay="Mercredi"
            else if(day==3)
                weekDay="Jeudi"
            else if(day==4)
                weekDay="Vendredi"
            else if(day==5)
                weekDay="Samedi"
            else if(day==6)
                weekDay="Dimanche"
            return weekDay
        },
        formatHour(time) {
            return time.substring(0, 2) + "h" + time.substring(2)
        }
    }

}
</script>
