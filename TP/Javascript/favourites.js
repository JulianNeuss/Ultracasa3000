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

Vue.component('favourites',{
    template:
        `<v-row>
            <v-col v-for="fav in favs"  :key="fav" cols="12" md="6">
                <v-container>
                    <v-list-item one-line>
                        <v-icon > star </v-icon>
                        <v-list-item-content class="align-self-start">
                            <v-list-item-title  class="headline font-weight-bold">{{ fav.name}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider width="500"></v-divider>  <!-- hay que sacar width y ponerlo en un css-->
                    <v-row>
                        <v-col v-show="fav.name == 'Favourite Rooms'" v-for="room in rooms" :key="room"  cols="6" md="6" >
                            <v-card :elevation="21" height="150" type="button">  <!-- hay que sacar height y ponerlo en un css-->
                                <v-list-item three-line>
                                    <v-list-item-content class="align-self-start">
                                        <v-list-item-title class="medium mb-2"  >{{ room.title }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                        </v-col>
                        <v-col v-show="fav.name == 'Favourite Devices'" v-for="device in devices" :key="device"  cols="6" md="6" >
                            <v-card :elevation="21" height="150" type="button" @click="dialog = !dialog">  <!-- hay que sacar height y ponerlo en un css-->
                                <v-list-item three-line>
                                    <v-list-item-content class="align-self-start">
                                        <v-list-item-title class="medium mb-2"  >{{ device.title }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-dialog v-model="dialog"  width="400px">  <!-- cambiar width tiene que estar en un CSS -->
                                            <v-card>
                                                <v-card-title class="grey darken-1"> {{ device.title }}</v-card-title>
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
                            </v-card>
                        </v-col>
                    </v-row>

                </v-container>
            </v-col>
        </v-row>`,
    data(){
        return {
            dialog: false,
            favs: [
                { name: 'Favourite Rooms' },
                { name: 'Favourite Devices'},
            ],
            rooms: [
                { title:'Living'},
                { title:'Kitchen'},
                { title:'Playroom'},
                { title:'Add other'}

            ],
            devices: [
                { title: 'AC'},
                { title: 'Apple Homepods'},
                { title:'Add other'}
            ]
        }
    }

})

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        active_tab: 2,
        tabs: [
            { index: 0, name: 'HOME', href:'index.HTML' },
            { index: 1, name: 'RUTINES', href:'rutines.HTML' },
            { index: 2, name: 'FAVOURITES', href:'favourites.HTML'},
            { index: 3, name: 'SAFETY'},
        ]
    }),
})