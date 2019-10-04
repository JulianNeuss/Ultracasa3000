Vue.component('favourites',{
    template:
        `<v-row>
            <v-col v-for="fav in favs"  :key="fav.name" cols="12" md="6">
                <v-container>
                    <v-list-item one-line>
                        <v-icon > star </v-icon>
                        <v-list-item-content class="align-self-start">
                            <v-list-item-title  class="headline font-weight-bold">{{ fav.name}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>  
                    <v-row>
                        <v-col v-show="fav.name == 'Favourite Rooms'" v-for="room in rooms" :key="room.title"  cols="6" md="6" >
                            <v-card class="favs-card-style" :elevation="21" type="button"> 
                                <v-list-item three-line>
                                    <v-list-item-content class="align-self-start">
                                        <v-list-item-title class="medium mb-2"  >{{ room.title }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                        </v-col>
                        <v-col v-show="fav.name == 'Favourite Devices'" v-for="device in devices" :key="device.title"  cols="6" md="6" >
                            <v-card class="favs-card-style" :elevation="21" type="button" @click="dialog = !dialog"> 
                                <v-list-item three-line>
                                    <v-list-item-content class="align-self-start">
                                        <v-list-item-title class="medium mb-2"  >{{ device.title }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-dialog v-model="dialog"  width="400px">  <!-- no me anda el css del width -->
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
        tabs: [
            { index: 0, name: 'HOME', href:'index.html' },
            { index: 1, name: 'ROUTINES', href:'routines.html' },
            { index: 2, name: 'FAVOURITES', href:'favourites.html'},
            { index: 3, name: 'SAFETY', href: 'safety.html'},
        ]
    }),
})