Vue.component('toolbar', {
        template:
            `<v-toolbar color="deep-purple darken-1" dark  flat>
                        <v-btn color="deep-purple darken-1" depressed  href="index.html">
                            <v-toolbar-title class="ml-0 pl-3">
                                        <span class="title ml-3 mr-5">UC<span class="font-italic font-weight-light">3000</span>
                                        </span> <!-- para que UC se vea en negrita y 3000 no -->
                            </v-toolbar-title>
                        </v-btn>
                        <v-spacer></v-spacer> <!-- deja espacio entre el search y boton de  notificaciones y settings -->

                        <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>

                        <v-spacer></v-spacer> <!-- deja espacio entre el search y boton de  notificaciones y settings -->

                        <v-btn icon>
                            <v-icon>settings</v-icon>
                        </v-btn>
            </v-toolbar>`,

})

Vue.component('lastused', {
    template:
        `<div>
            <p class="headline font-weight-bold">Last Used</p>
            <v-divider></v-divider>
    
                   <v-row>
                         <v-col v-for="last in lastusedvec" :key="last"  cols="12" md="4" >
                            <v-card :elevation="21" height="150" type="button">  <!-- hay que sacar height y ponerlo en un css-->
                               <v-list-item three-line>
                                      <v-list-item-content class="align-self-start">
                                            <v-list-item-title  class="medium mb-2"  v-text="last.title"></v-list-item-title>
                                            <v-list-item-subtitle v-text="last.room"></v-list-item-subtitle>
                                      </v-list-item-content>
                                    <v-icon> {{ last.icon }}</v-icon>
                               </v-list-item>
                 
                            </v-card>
                         </v-col>
                   </v-row>
        </div>`,
    data(){
        return {
            lastusedvec: [
                { title: 'Living', icon: 'tv' },
                { title: 'Smart Tv', room: 'Living' , icon: 'tv'},
                { title: 'Apple Homepods', room:'Dorm Jorge' , icon: 'speaker'},
            ]
        }
    }
})



Vue.component('devices',{
    template:
    `<div>
        <p class="headline font-weight-bold">Devices</p>
               <v-divider></v-divider>
               <v-row>
                    <v-col v-for="device in devices" :key="device"  cols="12" md="4" >
                         <v-card :elevation="21" height="150" type="button" >  <!-- hay que sacar height y ponerlo en un css-->
                              <v-list-item three-line>
                                  <v-list-item-content class="align-self-start">
                                        <v-list-item-title  class="medium mb-2"  v-text="device.title"></v-list-item-title>
                                        <v-list-item-subtitle v-text="device.room"></v-list-item-subtitle>
                                  </v-list-item-content>
                              </v-list-item>
                         </v-card>
                    </v-col>
               </v-row> 
    </div>`,
    data(){
        return {
            devices: [
                { title: 'Lights'},
                { title: 'AC', room: 'Kitchen', icon: 'ac_unit'},
                { title: 'Smart Tv', room: 'Living', icon: 'tv'},
            ]
        }
    }

})

Vue.component('rooms',{
    template:
    `<div> 

            <p class="headline font-weight-bold">Room's</p>
                          <!-- <v-btn icon>
                              <v-icon>add</v-icon>
                          </v-btn> -->
                          <v-divider></v-divider>
                          <v-row>
                              <v-col v-for="room in rooms" :key="room"  cols="12" md="6" >
                                  <v-card :elevation="21" height="150" type="button" @click="dialog = !dialog">  <!-- hay que sacar height y ponerlo en un css-->
                                    <v-img class="white--text" height="150"   :src="room.src">  <!-- hay que sacar height y ponerlo en un css-->
                                        <v-card-title v-text="room.title" > </v-card-title>
                                        <v-dialog v-model="dialog"  width="400px">  <!-- cambiar width tiene que estar en un CSS -->
                                            <v-card>
                                                <v-card-title class="grey darken-1"> CREATE RUTINE</v-card-title>
                                                <v-container grid-list-sm>
                                                    <v-layout row wrap>
                                                        <v-flex  xs12  align-center  justify-space-between >
                                                            <v-layout align-center>
                                                                <v-text-field placeholder="Name"></v-text-field>
                                                            </v-layout>
                                                        </v-flex>
                                                        <v-flex xs6>
                                                            <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
                                                        </v-flex>
                                                        <v-flex xs6>
                                                            <v-text-field  placeholder="Job title" ></v-text-field>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <v-text-field  prepend-icon="mail"  placeholder="Email"></v-text-field>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000"></v-text-field>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                                <v-card-actions>
                                                    <v-btn text color="primary">More</v-btn>
                                                    <v-spacer></v-spacer>
                                                    <v-btn  text  color="primary" @click="dialog = false" >Cancel</v-btn>
                                                    <v-btn text @click="dialog = false">Save</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-img>
                                  </v-card>
                            </v-col>
                        </v-row>
     </div>`,
    data() {
        return {
            dialog: false,
            rooms: [
                { title: 'Living'},
                { title: 'Garage'},
                { title: 'Kitchen'},
                { title: 'Playroom'},
                { title: 'Dorm Jorge'},
                { title: 'Dorm Susana'},
                { title: 'Dorm Betty'},
                { title: 'Add New Room'},
            ]
        }
    }

})

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        active_tab: 0,
        tabs: [
            { index: 0, name: 'HOME', href:'index.HTML' },
            { index: 1, name: 'RUTINES', href:'rutines.HTML' },
            { index: 2, name: 'FAVOURITES', href: 'favourites.HTML' },
            { index: 3, name: 'SAFETY'},
        ]
    }),
})
