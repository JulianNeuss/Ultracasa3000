Vue.component('rutines',{

    template: ` 
    <v-item-group>

            <v-container>
                <v-list-item one-line>
                    <v-list-item-content class="align-self-start">
                        <v-list-item-title  class="headline font-weight-bold">Rutines</v-list-item-title>
                    </v-list-item-content>
                    <v-btn class="mx-2" fab dark color="deep-purple darken-1" @click="dialog = !dialog">
                        <v-icon dark>add </v-icon>
                    </v-btn>

                    <!-- -->

                    <v-dialog v-model="dialog"  width="800px">  <!-- cambiar width tiene que estar en un CSS -->
                        <v-card>
                            <v-card-title class="grey darken-2">
                                CREATE RUTINE
                            </v-card-title>
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



                    <!-- -->


                    <v-btn class="mx-2" fab dark color="deep-purple darken-1">
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-list-item>
                <v-divider></v-divider>

                <v-row>
                    <v-col v-for="rutine in rutines" :key="rutine.title"  cols="12" md="4" >
                        <v-card class="routine-card-style" :elevation="21" type="button"> 
                            <v-list-item three-line>
                                <v-list-item-content class="align-self-start">
                                    <v-list-item-title  class="medium mb-2"  v-text="rutine.title"></v-list-item-title>
                                </v-list-item-content>
                                <v-icon centered> {{ rutine.icon }}</v-icon>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>




            </v-container>
        </v-item-group>`,
    data(){
        return{
            dialog: false,
            rutines: [
                { title: "HOME TEMPERATURE"},
                { title: "OUT OF HOME"},
                { title: "BACKYARD LIGHT ON"},
                { title: "BACKYARD LIGHT OFF"},
                { title: "ARRIVED HOME"},
            ]
        }
    }
})

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        active_tab: 1,
        tabs: [
            { index: 0, name: 'HOME', href:'index.html' },
            { index: 1, name: 'ROUTINES', href:'routines.html' },
            { index: 2, name: 'FAVOURITES', href: 'favourites.html' },
            { index: 3, name: 'SAFETY', href: 'safety.html'},
        ]
    }),
})
