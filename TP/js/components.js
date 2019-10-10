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
}),

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

}),


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
                    
                    <v-dialog v-model="addroom" width="300px">  
                                                
                              <v-card>
                                    <v-form @submit="roomadd" ref="roomform"> 
                                                    <v-card-title light> Add Room  </v-card-title>
                                                    
                                                    <v-container grid-list-sm>
                                                        <v-layout row wrap>  
                                                          
                                                            <v-col cols="12" sm="6" md="12">
                                                                        <v-text-field 
                                                                        ref="nameselector"
                                                                        label="Name"
                                                                        clearable
                                                                        maxlength="60"
                                                                        required
                                                                        ></v-text-field> <!-- chequear que lo que ingresan aca no este repetido-->
                                                            </v-col>
                                                            
                                                            <v-col class="d-flex" cols="12" sm="12"> 
                                                                        <v-select :items="roomtypes" label="Select Type"  ref="imageselector" required></v-select>
                                                            </v-col>
                                                    
                                                         
                                                        </v-layout>
                                                    </v-container>
                                                    
                                                    <v-card-actions>
                                                         <v-spacer></v-spacer>
                                                         <v-btn  text  color="primary" @click="cancelform">Cancel</v-btn>
                                                         <v-btn text @click="addroom = false" type="submit">Save</v-btn>
                                                    </v-card-actions>
                                    </v-form>
                              </v-card>
                                              
                                              
                    </v-dialog>
                    
                    
                    
            </v-list-item>                           
           
            <v-divider></v-divider>
            
            <v-row>
                  <v-col v-for="room in rooms" :key="room.name" cols="12" md="6" >
                         <v-card class="rooms-style" :elevation="21" type="button" @click="dialog = !dialog"> 
                               <v-img height="150"   :src="room.src"> <!-- no me anda el css de este height-->
                                     <v-card-title class="white--text" v-text="room.name" ></v-card-title>
                                     <v-dialog v-model="dialog"  width="400px"> <!-- no me anda el css de este width-->
                                          <v-card>
                                            
                                              <v-list-item-content class="text-center">
                                                    <v-list-item-title  class="title"  v-text="room.name"></v-list-item-title>
                                              </v-list-item-content>
                                              
                                              <v-spacer></v-spacer>
                                                 
                                              <v-row justify="space-around">
                                                    <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="dialog = !dialog">
                                                          <v-icon dark> edit </v-icon> EDIT
                                                    </v-btn>
                                                    <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="addbutton = !addbutton" >
                                                          <v-icon dark> add </v-icon> ADD
                                                    </v-btn>
                                              </v-row>
                                              
                                              <!--  -->
                                              <v-dialog v-model="addbutton" width="400px" >  <!-- no me anda el css de este width-->
                                                 
                                                    <v-card>
                                                        <v-card-title class="grey darken-2" light>
                                                            Add Device
                                                        </v-card-title>
                                                        <v-container grid-list-sm>
                                                        
                                                            <v-layout row wrap>
                                                                <v-col class="d-flex" cols="12" sm="12">
                                                                  <v-select
                                                                    :items="items" item-text="name"
                                                                    required label="Select Device"
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
    data: function() {
        return {
            addroom: false,
            dialog: false,
            addbutton: false,
            items: [ 'AC', 'BLIND' ,'DOOR','LIGHT', 'OVEN', 'SPEAKER', 'VACUUM' ],
            rooms: [],
            /*{ name: 'PedroRoom', src: "../src/Living.jpg", id:lk12j4lk134}*/
            roomtypes: ['Room', 'Living', 'Garage', 'Kitchen','Playroom']

        }
    },
    mounted() {
        api.devicetypes.getAllDeviceTypes().then( ( r ) => {
            for (let i of r.result){
                if(i.name !== "refrigerator" && i.name !== "alarm") //hay que ver cuales dispositivos usamos
                    this.items.push({id: i.id, name: i.name});
            }
        })

        api.room.getAll().then( (r) => {
            for(let i of r.result){
                this.rooms.push({name: i.name});
            }
        })
    },
    methods:{
        roomadd(event) {
            event.preventDefault();
            if(this.$refs.roomform.validate()){
                api.room.add({
                    name: this.$refs.nameselector.internalValue,
                    meta:{
                        img: this.$refs.imageselector.internalValue
                    }
                }).then(r => {
                    this.rooms.push({name: r.result.name, src: "../src/" + r.result.meta.img + ".jpg", id: r.result.id});
                }).catch((err) => {
                    console.error(err);
                });
                console.log(this.rooms);
            }else{
                console.error("Error en el formulario");
            }
            this.$refs.roomform.reset();
        },
        cancelform(){
            this.$refs.roomform.reset();
            this.roomname = '';
            this.addroom = false
        },

    }

}),

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

}),






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
                                                        <v-form @submit="addRoutine" ref="addRoutineForm">
                                                            <v-card-title class="grey darken-2" light>
                                                                Add routine
                                                            </v-card-title>
                                                            <v-container grid-list-sm>
                                                            <v-flex  xs12  align-center  justify-space-between >
                                                                    <v-layout align-center>
                                                                        <v-text-field :rules="deviceRules" required placeholder="Name" counter="60"></v-text-field>
                                                                                                                      
                                                                
                                                                           </v-layout>
                                                                </v-flex>
                                                                <v-layout row wrap>
                                                                    <v-col class="d-flex" cols="12" sm="12">
                                                                      <v-select :items="allDev" item-text="name"  label="Select Device"  name="category"  ></v-select>
                                                                    </v-col>
                                                                </v-layout>
                                                                
                                                                  <v-layout row wrap>
                                                                    <v-col class="d-flex" cols="12" sm="12">
                                                                      <v-select :items="allDev"  label="Device options"  name="category"  ></v-select>
                                                                    </v-col>
                                                                </v-layout>
                                                                
                                                            </v-container>
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn type="submit" left text>Add device</v-btn>
                                                                <v-btn  text  color="primary" @click="cancelAdd" >Cancel</v-btn>
                                                                <v-btn type="submit" text>Save</v-btn>
                                                            </v-card-actions>
                                                            
                                                        </v-form>
                
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

    mounted() {
        api.devicetypes.getAllDeviceTypes().then( ( r ) => {
            for (let i of r.result){
                if(i.name !== "refrigerator" && i.name !== "alarm") //hay que ver cuales dispositivos usamos
                    this.allDev.push({id: i.id, name: i.name});
            }

        })
    },
    data(){
        return{
            dialog: false,
            allDev: [ ],
            currentDevice: [],
            rutines: [
                { title: "HOME TEMPERATURE"},
                { title: "OUT OF HOME"},
                { title: "BACKYARD LIGHT ON"},
                { title: "BACKYARD LIGHT OFF"},
                { title: "ARRIVED HOME"},
            ]
        }
    },
        methods: {
            currentDev(e){
                this.currentDevice.pop();
                this.currentDevice.push(e);
            }
    }

    <!--@submit="currentDev"{text: "lampara", value:100}-->
}),






Vue.component('alarm',{
    template:`
        <v-container>
            
            <v-card :elevation="21"  class="alarm-card-style mx-auto" >
                
                <v-list-item one-line>
                        <v-icon large> notification_important </v-icon>
                        <v-list-item-content class="align-self-start">
                            <v-list-item-title  class="headline font-weight-bold">Alarms</v-list-item-title> <!-- ver si se puede centrar esto-->
                        </v-list-item-content>
                </v-list-item>
                
                
                <v-row justify="space-around">
                          <v-btn class="mx-2"  dark color="deep-purple darken-1">
                                  <v-icon dark> edit </v-icon> EDIT
                          </v-btn>
                          <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="addAlarm">
                                  <v-icon dark> add </v-icon> ADD
                          </v-btn>
                </v-row>
            
            </v-card>
               
        </v-container>`,
    methods: {

    },
    data() {
        return{

        }
    },
    computed: {

    },
    props: {

    }

}),


Vue.component('toolbar', {
    template:
        `<div>
            <v-toolbar color="deep-purple darken-1" dark  flat>
                        <v-btn color="deep-purple darken-1" depressed  href="index.html">
                            <v-toolbar-title class="ml-0 pl-3">
                                        <span class="title ml-3 mr-5">UC<span class="font-italic font-weight-light">3000</span>
                                        </span> <!-- para que UC se vea en negrita y 3000 no -->
                            </v-toolbar-title>
                        </v-btn>
                        <v-spacer></v-spacer> <!-- deja espacio entre el search y boton de  notificaciones y settings -->

                        <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>

                        <v-spacer></v-spacer> <!-- deja espacio entre el search y boton de  notificaciones y settings -->

                        <v-btn icon  @click="drawer = !drawer">
                            <v-icon>settings</v-icon>
                        </v-btn>
                       
            </v-toolbar>
            
            <v-navigation-drawer v-model="drawer" app right clipped  class="white">
                <v-list-item>
                     <v-list-item-content>
                          <v-btn class="mx-2" depressed @click="drawer = !drawer">
                                <v-icon>settings</v-icon> Settings
                          </v-btn>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list dense >
                    <v-list-item v-for="item in items" :key="item.title" link>
                         <v-list-item-icon>
                             <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </div>`,
    data(){
        return {
            drawer:false,

            items: [
                { title: 'Dashboard', icon: 'mdi-view-dashboard' },
                { title: 'Photos', icon: 'mdi-image' },
                { title: 'About', icon: 'mdi-help-box' },
            ],
        }
    }
});



new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        active_tab: 'index.html',
        active_tab2: 'routines.html',
        active_tab3: 'favourites.html',
        active_tab4: 'safety.html',
        tabs: [
            { index: 0, name: 'HOME', href:'index.html' },
            { index: 1, name: 'ROUTINES', href:'routines.html' },
            { index: 2, name: 'FAVOURITES', href: 'favourites.html' },
            { index: 3, name: 'SAFETY', href: 'safety.html'},
        ]
    }),
    /*component:{
      toolbar,

    },

    methods: {
        addAlarm: function () {

        }
    }*/
});
