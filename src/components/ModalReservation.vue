<template>
  <div class="reservationContainer">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Reservation
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Reservation</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="name"
                  label="Name*"
                  required
                ></v-text-field>
              </v-col>         
              <v-col cols="12"
                sm="6"
                md="8">
                <v-text-field
                v-model="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
                <v-col
                cols="12"
              >
                <v-date-picker v-model="date"
                  required
                ></v-date-picker>
              </v-col>
              <v-col
               cols="12"
                sm="6"
              >
                <v-select
                v-model="time"
                  :items="['20:30', '21:00', '21:30', '22:00', '22:30']"
                  label="Time*"
                  required
                ></v-select>
              </v-col>
              <v-col
              cols="12"
                sm="6"
              >
                <v-select
                v-model="people"
                  :items="['1', '2', '3', '4', '5','6']"
                  label="People*"
                  required
                ></v-select>
              </v-col>
              <v-col
               cols="12"
              >
               <v-textarea
               v-model="message"
                  label="Message"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
         @click="submit"
          >
            Save
          </v-btn>
           <v-btn
            color="blue darken-1"
            text
         @click="submitAndPaid"
          >
            Save and paid
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="color"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
 data: () => ({
      snackbar: false,
      text:'',
      color:'',
      timeout: 2000,
      dialog: false,
       date: new Date().toISOString().substr(0, 10),
       name:'',
       email:'',
       people :1,
       message:'',
       time:'',
    }),
    props:[
        'idRestaurant'
    ],
    methods: {
      submit () {
       if(this.date && this.name && this.email && this.people && this.time)
       {
            this.$store.dispatch('addReservation',{name : this.name,email:this.email,nbPeople:this.people,date:this.date,time:this.time,message:this.message,idRestaurant:this.idRestaurant});
            this.text = 'Booked';
            this.color = 'green';
            this.snackbar = true;
           this.dialog = false
       }
      },
      submitAndPaid () {
       if(this.date && this.name && this.email && this.people && this.time)
       {
             this.$store.dispatch('addReservation',{name : this.name,email:this.email,nbPeople:this.people,date:this.date,time:this.time,message:this.message,idRestaurant:this.idRestaurant}).then((id) => {
              this.$store.dispatch('payReservation',{nbPeople:this.people,pricePerPeople:20,idReservation : id}).then((result) => {
              if(result){
                 this.color = 'green';
                this.text = 'Booked and paid';
              }else{
                 this.color = 'orange';
                this.text = 'Booked but error in paid';
              }
              this.snackbar = true;
              });
            });  
            this.dialog = false
       }
      },
    }
  
}
</script>

<style>

</style>