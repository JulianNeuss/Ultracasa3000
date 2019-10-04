Vue.component('lastused', {
    template:
        `<div>
               <v-list-item one-line>
                     <v-list-item-content class="align-self-start">
                        <v-list-item-title  class="headline font-weight-bold">Last Used</v-list-item-title>
                    </v-list-item-content>
               </v-list-item>            
               <v-divider></v-divider>
    
               <v-row>
                    <v-col v-for="last in lastusedvec" :key="last.title"  cols="12" md="4" >
                            <v-card class="last-used-style" :elevation="21" type="button">  
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
               <v-list-item one-line>
                    <v-list-item-content class="align-self-start">
                        <v-list-item-title  class="headline font-weight-bold">Devices</v-list-item-title>
                    </v-list-item-content>
               </v-list-item>      
               <v-divider></v-divider>
               <v-row>
                    <v-col v-for="device in devices" :key="device.title" cols="12" md="4" >
                         <v-card class="devices-style" :elevation="21" type="button" > 
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

            <v-list-item one-line>
                    <v-list-item-content class="align-self-start">
                        <v-list-item-title  class="headline font-weight-bold">Room's</v-list-item-title>
                    </v-list-item-content>
                    <v-btn class="mx-2" fab dark color="deep-purple darken-1" @click="addroom = !addroom">
                        <v-icon dark> add </v-icon>
                    </v-btn>
                    
                    <v-dialog v-model="addroom" width="400px">  <!-- no me anda el css de este width-->
                                                 
                          <v-card>
                                <v-card-title light> Add Room  </v-card-title>
                                <v-container grid-list-sm>
                                    <v-layout row wrap>
                                        <v-flex  xs12  align-center  justify-space-between >
                                            <v-layout align-center>
                                                <v-text-field placeholder="Name"></v-text-field>  <!-- chequear que lo que ingresan aca no este repetido-->
                                            </v-layout>
                                        </v-flex>
                                        <v-container grid-list-sm>
                                                <v-layout row wrap>
                                                       <v-col class="d-flex" cols="12" sm="12">
                                                                  <v-select label="Select image" ></v-select>
                                                       </v-col>
                                                </v-layout>
                                        </v-container>
                                     
                                    </v-layout>
                                </v-container>
                                
                                
                                <v-card-actions>
                                     <v-spacer></v-spacer>
                                     <v-btn  text  color="primary" @click="addroom = false" >Cancel</v-btn>
                                     <v-btn text @click="addroom = false">Save</v-btn>
                                </v-card-actions>
                          </v-card>
                                              
                                              
                    </v-dialog>
            </v-list-item>                           
           
            <v-divider></v-divider>
            
            <v-row>
                  <v-col v-for="room in rooms" :key="room.title" cols="12" md="6" >
                         <v-card class="rooms-style" :elevation="21" type="button" @click="dialog = !dialog"> 
                               <v-img height="150"   :src="room.src"> <!-- no me anda el css de este height-->
                                     <v-card-title class="white--text" v-text="room.title" ></v-card-title>
                                     <v-dialog v-model="dialog"  width="400px"> <!-- no me anda el css de este width-->
                                          <v-card>
                                            
                                              <v-list-item-content class="text-center">
                                                    <v-list-item-title  class="title"  v-text="room.title"></v-list-item-title>
                                              </v-list-item-content>
                                                 
                                              <v-row justify="space-around">
                                                    <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="dialog = !dialog">
                                                          <v-icon dark> edit </v-icon> EDIT
                                                    </v-btn>
                                                    <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="addbutton = !addbutton" >
                                                          <v-icon dark> add </v-icon> ADD
                                                    </v-btn>
                                              </v-row>
                                              
                                              <!--  -->
                                              <v-dialog v-model="addbutton" width="400px">  <!-- no me anda el css de este width-->
                                                 
                                                    <v-card>
                                                        <v-card-title class="grey darken-2" light>
                                                            Add Device
                                                        </v-card-title>
                                                        <v-container grid-list-sm>
                                                        
                                                            <v-layout row wrap>
                                                                <v-col class="d-flex" cols="12" sm="12">
                                                                  <v-select
                                                                    :items="items"
                                                                    label="Select Device"
                                                                  ></v-select>
                                                                </v-col>
                                                            </v-layout>
                                                            
                                                        </v-container>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn  text  color="primary" @click="addbutton = false" >Cancel</v-btn>
                                                            <v-btn text @click="addbutton = false">Save</v-btn>
                                                        </v-card-actions>
                                                     </v-card>
                                              
                                              
                                              </v-dialog>
                                              
                                               <!-- -->
                                              
                                                 
                                                
                                              <v-card-actions>
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
            addroom: false,
            dialog: false,
            addbutton: false,
            items: [ 'AC', 'BLIND' ,'DOOR','LIGHT', 'OVEN', 'SPEAKER', 'VACUUM' ],
            rooms: [
                { title: 'Living', src: "../src/living.jpg"},
                { title: 'Garage', src: "../src/garage.jpg"},
                { title: 'Kitchen', src: "../src/kitchen.jpg"},
                { title: 'Playroom', src: "../src/playroom.jpg"},
                { title: 'Dorm Jorge', src: "../src/dormitorio.jpg"},
                { title: 'Dorm Susana', src: "../src/dormitorio.jpg"},
                { title: 'Dorm Betty', src: "../src/dormitorio.jpg"},
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
            { index: 2, name: 'FAVOURITES', href: 'favourites.html' },
            { index: 3, name: 'SAFETY', href: 'safety.html'},
        ]
    }),
})
