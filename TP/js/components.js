




// Vue.component('lastused', {
//     template:
//         `<div>
//                <v-list-item one-line>
//                      <v-list-item-content class="align-self-start">
//                         <v-list-item-title  class="headline font-weight-bold">Last Used</v-list-item-title>
//                     </v-list-item-content>
//                </v-list-item>
//                <v-divider></v-divider>
//
//                <v-row>
//                     <v-col v-for="last in lastusedvec" :key="last.title"  cols="12" md="4" >
//                             <v-card class="last-used-style" :elevation="21" type="button">
//                                <v-list-item three-line>
//                                       <v-list-item-content class="align-self-start">
//                                             <v-list-item-title  class="medium mb-2"  v-text="last.title"></v-list-item-title>
//                                             <v-list-item-subtitle v-text="last.room"></v-list-item-subtitle>
//                                       </v-list-item-content>
//                                     <v-icon> {{ last.icon }}</v-icon>
//                                </v-list-item>
//
//                             </v-card>
//                     </v-col>
//                </v-row>
//         </div>`,
//     data(){
//         return {
//             lastusedvec: [
//                 { title: 'Living', icon: 'tv' },
//                 { title: 'Smart Tv', room: 'Living' , icon: 'tv'},
//                 { title: 'Apple Homepods', room:'Dorm Jorge' , icon: 'speaker'},
//             ]
//         }
//     }
// }),
//


    Vue.component('rooms',{
        template:
            `<div>

            <v-list-item one-line>
                    <v-list-item-content class="align-self-start">
                        <v-list-item-title  class="headline font-weight-bold">Room's</v-list-item-title>
                    </v-list-item-content>
                    <v-btn class="mx-2" fab dark color="deep-purple darken-1" small @click="addroom = !addroom">
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


                                              <v-list-item three-line>
                                                      <v-list-item-content class="text-center">
                                                            <v-list-item-title  class="title"  v-text="room.name"></v-list-item-title>
                                                      </v-list-item-content>
                                                    
                                                      <v-btn icon @click="room.fav = !room.fav">
                                                            <v-icon large> {{ room.fav ? 'favorite' : 'favorite_border' }} </v-icon>
                                                      </v-btn>
                                               </v-list-item>
                                              <v-spacer></v-spacer>

                                              <v-row>
                                                      <v-list-item-content class="text-center">
                                                            <v-list-item-title class="medium mb-2"  >Room Devices:</v-list-item-title>
                                                      </v-list-item-content>

<!--                                                    <v-btn class="mx-2"  outlined dark color="deep-purple darken-1" @click="dialog = !dialog">-->
<!--                                                          <v-icon dark> edit </v-icon> EDIT-->
<!--                                                    </v-btn>-->
<!--                                                    <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="addbutton = !addbutton" >-->
<!--                                                          <v-icon dark> add </v-icon> ADD-->
<!--                                                    </v-btn>-->
                                              </v-row>
                                              

                                              <v-col v-for="dev in devices" :key="dev.name" cols="12" sm="6" md="12"  >
                                                     <v-row v-if="dev.room == room.name" justify="center" align="center">
                                                           <v-btn text> {{ dev.name}}</v-btn>
                                                     </v-row>
                                              </v-col>

                                              <!--  -->
<!--                                              <v-dialog v-model="addbutton" width="400px" >  &lt;!&ndash; no me anda el css de este width&ndash;&gt;-->

<!--                                                    <v-card>-->
<!--                                                        <v-form>-->

<!--                                                                <v-card-title class="grey darken-2" light>-->
<!--                                                                    Add Device-->
<!--                                                                </v-card-title>-->
<!--                                                                <v-container grid-list-sm>-->

<!--                                                                    <v-layout row wrap>-->
<!--                                                                        <v-col class="d-flex" cols="12" sm="12">-->
<!--                                                                          <v-select-->
<!--                                                                            :items="items" item-text="name"-->
<!--                                                                            label="Select Device"-->
<!--                                                                            required-->
<!--                                                                          ></v-select>-->
<!--                                                                        </v-col>-->
<!--                                                                    </v-layout>-->

<!--                                                                </v-container>-->
<!--                                                                <v-card-actions>-->
<!--                                                                    <v-spacer></v-spacer>-->
<!--                                                                    <v-btn  text  color="primary" @click="addbutton = false" >Cancel</v-btn>-->
<!--                                                                    <v-btn text @click="addbutton = false">Save</v-btn>-->
<!--                                                                </v-card-actions>-->

<!--                                                        </v-form>-->

<!--                                                     </v-card>-->


<!--                                              </v-dialog>-->

                                               <!-- -->

                                              <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn  text  color="primary" @click="dialog = false" >Cancel</v-btn>
                                                    <v-btn text @click="dialog = false" type="submit" >Save</v-btn>
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
                items: [ ],
                rooms: [ ], //aca me guardo el id, el name, la imagen y fav= false por default
                /*{ name: 'PedroRoom', src: "../src/Living.jpg", id:lk12j4lk134}*/
                roomtypes: ['Room', 'Living', 'Garage', 'Kitchen','Playroom'],
                devices: [],
            }
        },
        mounted() {
            api.devicetypes.getAllDeviceTypes().then( ( r ) => {
                for (let i of r.result){
                    if(i.name !== "refrigerator" && i.name !== "alarm") //hay que ver cuales dispositivos usamos
                        this.items.push({id: i.id, name: i.name});
                }
            });

            api.room.getAll().then( (r) => {
                for(let i of r.result){
                    this.rooms.push({id: i.id, name: i.name, src: "../src/" + i.meta.img + ".jpg", fav: i.meta.fav});
                }
                console.log(this.rooms);
            });

            api.device.getAll().then( r => {
                for(let i of r.devices){
                    this.devices.push({id: i.id, name: i.name, fav: i.meta.fav, room:i.meta.deviceroom});
                }
                console.log(this.devices);
            })

        },
        methods:{
            roomadd(event) {
                if(this.$refs.roomform.validate()){
                    api.room.add({
                        name: this.$refs.nameselector.internalValue,
                        meta:{
                            fav: false,
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

    Vue.component('devices',{
        template:
            `<div>
               <v-list-item one-line>
               
               
                    <v-list-item-content class="align-self-start">
                        <v-list-item-title  class="headline font-weight-bold">Devices</v-list-item-title>
                    </v-list-item-content>
                    
                    <v-btn class="mx-2" fab dark color="deep-purple darken-1" small @click="registereddevices = !registereddevices">
                        <v-icon dark> info </v-icon>
                    </v-btn>
                    
           
                    <v-btn class="mx-2" fab dark color="deep-purple darken-1" small @click="devicedelete = !devicedelete">
                        <v-icon dark> delete </v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab dark color="deep-purple darken-1" small @click="deviceadd_s = !deviceadd_s">
                        <v-icon dark> add </v-icon>
                    </v-btn>
                    
             <!--DIALOG PARA VER ESTADO DE LOS DEVICES-->
                    <v-dialog v-model="devicedelete" width="300px">
                         <v-card>
                            <v-form @submit="deletedevice" ref="deldeviceform">
                                
                                <v-card-title light> Device Status </v-card-title>



                              


                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  text  color="primary" @click="canceldelform">Done</v-btn>
                                </v-card-actions>
                                
                                
                                
                            </v-form>
                         </v-card>
                    </v-dialog>
            <!--DIALOG PARA VER ESTADO DE LOS DEVICES-->       
                    
                    
            <!--DIALOG PARA BORRAR UN DEVICE-->
                    <v-dialog v-model="devicedelete" width="300px">
                         <v-card>
                            <v-form @submit="deletedevice" ref="deldeviceform">
                                
                                <v-card-title light> Delete Device  </v-card-title>



                                 <v-container grid-list-sm>
                                     <v-layout row wrap>

                                        <v-col cols="12" sm="6" md="12">
                                             <v-text-field
                                             ref="delnameselector"
                                             label="Name"
                                             clearable
                                             maxlength="60"
                                             required
                                             ></v-text-field> <!-- chequear que lo que ingresan aca no este repetido-->
                                        </v-col>
                                        
                                     </v-layout>
                                 </v-container>


                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  text  color="primary" @click="canceldelform">Cancel</v-btn>
                                    <v-btn text @click="devicedelete = false" type="submit">Save</v-btn>
                                </v-card-actions>
                                
                                
                                
                            </v-form>
                         </v-card>
                    </v-dialog>
            <!--DIALOG PARA BORRAR UN DEVICE-->
                    
                    
                    
                    
                    
            <!--DIALOG PARA AGREGAR UN DEVICE-->
                    <v-dialog v-model="deviceadd_s" width="300px">
                         <v-card>
                            <v-form @submit="deviceadd" ref="deviceform">
                                
                                <v-card-title light> Add Device  </v-card-title>



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
                                             <v-select :items="devicelist" item-text="name" label="Select Device"  ref="deviceselector" required></v-select>
                                        </v-col>
                                        

                                        <v-col class="d-flex" cols="12" sm="12">
                                            <v-select :items="rooms" item-text="name" label="Select Room"  ref="deviceroomselector" required></v-select>
                                        </v-col>

                                     </v-layout>
                                 </v-container>


                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  text  color="primary" @click="cancelform">Cancel</v-btn>
                                    <v-btn text @click="deviceadd_s = false" type="submit">Save</v-btn>
                                </v-card-actions>
                                
                                
                                
                            </v-form>
                         </v-card>
                    </v-dialog>
            <!--DIALOG PARA AGREGAR UN DEVICE-->   
               
               </v-list-item>




               <v-divider></v-divider>




               <v-row>
                    <v-col v-for="device in devices" :key="device.name" cols="12" md="4" >
                         <v-card class="devices-style" :elevation="21" type="button" @click="currentDev = device.device; currentDevID = device.id ; devDialog();"> 
                            <v-img height="150"   :src="device.src">
                            <v-card-title class="white--text" v-text="device.name" ></v-card-title>
                      
                 <!---DIALOG DE DEVICES-->
                 
                          <!---DIALOG DE BLINDS-->
                          <v-dialog v-model="blindsdialog"  width="400px">
                          <v-form @submit="blindsaction">
                                <v-card>
                                                          <!---TITULO DIALOG DE DEVICE-->
                                    <v-list-item-content class="text-center">
                                          <v-list-item-title  class="title"  v-text="device.name"></v-list-item-title>
                                          <v-list-item-subtitle class="subtitle"  v-text="currentDev"><v-list-item-subtitle>
                                    </v-list-item-content>
                                             <v-divider></v-divider>
                                                          <!---CONTENIDO DIALOG DE DEVICE-->
                                                                       
                                     <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                     <v-switch v-model="blindsOnOff" color="success" value="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Closed / Open</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>
                                                    
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  text  color="primary" @click="blindsdialog = false" >Cancel</v-btn>
                                        <v-btn text @click="blindsdialog = false" type="submit" >Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                             </v-form>   
                             </v-dialog>
                          <!---DIALOG DE BLINDS-->
                         
                          <!---DIALOG DE OVEN-->
                           <v-dialog v-model="ovendialog"  width="400px">
                          
                                <v-card>
                                                          <!---TITULO DIALOG DE DEVICE-->
                                    <v-list-item-content class="text-center">
                                          <v-list-item-title  class="title"  v-text="device.name"></v-list-item-title>
                                          <v-list-item-subtitle class="subtitle"  v-text="currentDev"><v-list-item-subtitle>
                                    </v-list-item-content>
                                             <v-divider></v-divider>
                                                                       <!---CONTENIDO DIALOG DE DEVICE-->
                                                                       
                                     <v-list-item>
                                           <v-card-text>
      <v-row>
        <v-col class="pr-4">
          <v-slider
          :label="ex3.label"
            v-model="slider"
            class="align-center"
            :max="max"
            :min="min"
            hide-details
          >
            <template v-slot:append>
              <v-text-field
                v-model="slider"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
              ></v-text-field>
            </template>
          </v-slider>
        </v-col>
      </v-row>
    </v-card-text> <!--OVEN TEMPERATURE-->
                                    </v-list-item>
                                    
                                    
                                    
                                    
                                    
                                    <v-list-item>
                                        <template >
                                            <v-card flat ml-10>
                                                <v-card-subtitle>Heat</v-card-subtitle>
                                                <v-radio-group v-model="heatselect" row >
                                                    <v-radio label="Up" value="radio-1"></v-radio>
                                                    <v-radio label="Conventional" value="radio-2"></v-radio>
                                                    <v-radio label="Down" value="radio-3"></v-radio>
                                                </v-radio-group>
                                            </v-card>
                                        </template>
                                    </v-list-item>
                                   
                                    
                                    <v-list-item>
                                     <template >
                                            <v-card flat ml-10>
                                                <v-card-subtitle>Grill</v-card-subtitle>
                                                <v-radio-group v-model="row" row >
                                                      <v-radio label="off" value="radio-1"></v-radio>
                                                      <v-radio label="economic" value="radio-2"></v-radio>
                                                      <v-radio label="full" value="radio-3"></v-radio>
                                                </v-radio-group>
                                            </v-card>
                                    </template>
                                    </v-list-item>   

                                    <v-list-item>
                                     <template >
                                            <v-card flat ml-10>
                                                <v-card-subtitle>Convection</v-card-subtitle>
                                                <v-radio-group v-model="row" row >
                                                      <v-radio label="off" value="radio-1"></v-radio>
                                                      <v-radio label="economic" value="radio-2"></v-radio>
                                                      <v-radio label="convection" value="radio-3"></v-radio>
                                                </v-radio-group>
                                            </v-card>
                                    </template>
                                    </v-list-item>                                      
                                    
                                    
                                   
                                    <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                  <v-switch v-model="ex11"  color="success" value="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Off / On</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>                          
                                                                                 
                                             <v-divider></v-divider>
                                    <v-row justify="space-around">
                                      <v-btn class="mx-2" right small dark color="deep-purple darken-1" @click="deletedevice" ref="deletedevicebutton">
                                            <v-icon small dark> delete </v-icon> 
                                        </v-btn>                                   
                                    </v-row>
                                    
                                    
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  text  color="primary" @click="dialog = false" >Cancel</v-btn>
                                        <v-btn text @click="dialog = false" type="submit" >Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                             </v-dialog>
                          <!---DIALOG DE OVEN-->
                          
                          <!---DIALOG DE Refrigerator-->
                          <v-dialog v-model="refridialog"  width="400px">
                          
                                <v-card>
                                                          <!---TITULO DIALOG DE DEVICE-->
                                    <v-list-item-content class="text-center">
                                          <v-list-item-title  class="title"  v-text="device.name"></v-list-item-title>
                                          <v-list-item-subtitle class="subtitle"  v-text="currentDev"><v-list-item-subtitle>
                                    </v-list-item-content>
                                             <v-divider></v-divider>
                                                                       <!---CONTENIDO DIALOG DE DEVICE-->
                                                                       
                                     <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                     <v-switch v-model="ex11"  color="success" value="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Off / On</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>
                                    <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                     <v-switch v-model="ex11"  color="success" value="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Stop / Play</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>
                                    <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                     <v-switch v-model="ex11"  color="success" value="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Aspirar / Trapear</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>                                    
                                    <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                     <v-switch v-model="ex11"  color="success" value="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Back to charger</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>                
                                    <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                  <v-switch v-model="ex11"  color="success" value="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Off / On</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>                          
                                                                                 
                                             <v-divider></v-divider>
                                    <v-row justify="space-around">
                                      <v-btn class="mx-2" right small dark color="deep-purple darken-1" @click="deletedevice" ref="deletedevicebutton">
                                            <v-icon small dark> delete </v-icon> 
                                        </v-btn>                                   
                                    </v-row>
                                    
                                    
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  text  color="primary" @click="dialog = false" >Cancel</v-btn>
                                        <v-btn text @click="dialog = false" type="submit" >Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                             </v-dialog>
                          <!---DIALOG DE Refrigerator-->
                          
                          <!---DIALOG DE AC-->
                          
                          <!---DIALOG DE AC-->
                          
                          <!---DIALOG DE Speaker-->
                          
                          <!---DIALOG DE Speaker-->
                          
                          <!---DIALOG DE Door-->
                          
                          <!---DIALOG DE Door-->
                          
                 <!---DIALOG DE DEVICES-->
                                
                            
                            </v-img>
                         </v-card> 
                    </v-col>
               </v-row>
    </div>`,
        data(){
            return {
                //OVENSHITT
                ex3: { label: 'Temperature', val: 100, color: 'red' },
                min: 90,
                max: 230,
                slider: 100,
                range: [90, 230],
                //
                //DIALOG DEVICES
                blindsdialog: false,
                ovendialog: false,
                refrigeratordialog: false,
                acdialog: false,
                speakerdialog: false,
                doordialog: false,
                //////////////////////

                //Blinds Variables
                blindsOnOff: false,
                //////////////////////
                devicedelete: false,
                deviceadd_s: false,
                rooms: [],
                devices: [], //id,name,src,device --> el device tiene el lo que es, Ej: 'blinds'
                devicelist: [],
                currentDevID:'',
                currentDev:'',
                deviceID: ''
            }
        },
        mounted() {
            api.devicetypes.getAllDeviceTypes().then( ( r ) => {
                for (let i of r.result){
                    if(i.name !== "vacuum" && i.name !== "lamp") //hay que ver cuales dispositivos usamos
                        this.devicelist.push({id: i.id, name: i.name});
                }
            });

            api.room.getAll().then( r => {
                for(let i of r.result){
                    this.rooms.push({id: i.id, name: i.name, src: "../src/" + i.meta.img + ".jpg", fav: i.meta.fav});
                }
            });

            api.device.getAll().then( r => {
                for(let i of r.devices){
                    if(i.name !== "alarm")
                        this.devices.push({id: i.id, name: i.name, src: i.meta.img, device: i.meta.device});
                }
                console.log(this.devices);
            })
        },
        methods:{
            deviceadd(event) {
                // event.preventDefault();
                    var tempID;
                    var roomID;
                    var roomSelector;
                    for(let i of this.devicelist){
                        if (i.name === this.$refs.deviceselector.internalValue){
                            tempID = i.id;
                        }
                    }
                    for(let i of this.rooms){
                        if (i.name === this.$refs.deviceroomselector.internalValue){
                            roomID = i.id;
                        }
                    }
                    roomSelector = this.$refs.deviceroomselector.internalValue;
                api.device.add({
                        type: {id:tempID},
                        name: this.$refs.nameselector.internalValue,
                        meta:{
                            fav: false,
                            roomID: roomID,
                            deviceroom: this.$refs.deviceroomselector.internalValue,
                            img: "../src/" + this.$refs.deviceselector.internalValue + ".jpg",
                            device: this.$refs.deviceselector.internalValue
                        }
                    }).catch((err) => {
                        console.error(err);
                    });
                this.$refs.deviceform.reset();

            // .then(r => {
            //         this.devices.push({
            //             name: r.result.name,
            //             room: roomSelector,
            //             id: r.result.id,
            //             src: "../src/" + this.$refs.deviceselector.internalValue + ".jpg",
            //         });
            //         api.room.addRoomDevices(roomID, r.result.id);
            //     })

            },
            cancelform(){
                this.$refs.deviceform.reset();
                this.deviceadd_s = false
            },
            // namer(id,name,room,device){
            //
            //     // console.log('hi im namer');
            //     // console.log(id);
            //     // console.log(name);
            //     // console.log(room);
            //     // console.log(device);
            //    //this.currentDev = device;
            // },

            devDialog(){
                switch (this.currentDev){
                    case 'blinds':
                        console.log('hi im the case of BLINDS');
                        this.blindsdialog=true;
                        break;
                    case 'speaker':
                        this.speakerdialog=true;
                        break;
                    case 'oven':
                        this.ovendialog=true;
                        break;

                }


            },
            canceldelform(){
                this.$refs.deldeviceform.reset();
                this.devicedelete = false
            },
            deletedevice(event){
                // event.preventDefault();
                console.log('hola1')
                for(let i of this.devices){
                    console.log(i.name);
                    if (i.name === this.$refs.delnameselector.internalValue){
                        api.device.delete(i.id);
                        break;
                    }
                }
            },

            //////// METHODS PARA DEVICES ////////////////
            blindsaction(e){
                e.preventDefault();
                //is ON
                if(this.blindsOnOff){
                    api.device.sendAction(this.currentDevID,"open","");
                }
                //is OFF
                else{
                    api.device.sendAction(this.currentDevID,"close","");
                }
            },
            ////////////////////////////////////////////////
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
                            <v-img height="150"   :src="room.src"> <!-- no me anda el css de este height-->
                                <v-list-item three-line>
                                    <v-list-item-content class="align-self-start">
                                        <v-list-item-title class="medium mb-2"  >{{ room.name }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                </v-img>
                            </v-card>
                        </v-col>
                        <v-col v-show="fav.name == 'Favourite Devices'" v-for="device in devices" :key="device.name"  cols="6" md="6" >
                            <v-card class="favs-card-style" :elevation="21" type="button" @click="dialog = !dialog"> 
                                <v-list-item three-line>
                                    <v-list-item-content class="align-self-start">
                                        <v-list-item-title class="medium mb-2"  >{{ device.name }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-dialog v-model="dialog"  width="400px">  <!-- no me anda el css del width -->
                                            <v-card>
                                                <v-card-title class="grey darken-1"> {{ device.name }}</v-card-title>
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
            rooms: [ ],
            devices: [ ]
        }
    },
    mounted() {
        api.room.getAll().then( r => {
            for(let i of r.result){
                if(i.meta.fav === true)
                     this.rooms.push({id: i.id, name: i.name, src: "../src/" + i.meta.img + ".jpg"});
            }
        })

        api.device.getAll().then( r  => {
            for(let i of r.devices){
                if(i.meta.fav === true){
                    this.devices.push({name: i.name}); //por ahora solo le guardo name, hay que ver que mas necesitamos
                }
            }
        })
    },


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
                                                                        
                                                             <v-text-field :rules="deviceRules" required placeholder="Name"   ref="nameselector" counter="60"></v-text-field>
                                                                                                                      
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
                    this.allDev.push({id: i.id, name: i.name}); // mentira que andan estos comments
            }

        })
    },
    data(){
        return{
            dialog: false,
            allDev: [],
            currentDevice:null ,
            routineDevices,
            routines: [
                { title: "HOME TEMPERATURE"},
                { title: "OUT OF HOME"},
                { title: "BACKYARD LIGHT ON"},
                { title: "BACKYARD LIGHT OFF"},
                { title: "ARRIVED HOME"},
            ]
        }
    },
        methods: {
            routineadd(event) {
                event.preventDefault();
              //if(this.$refs.roomform.validate()){
                    api.routine.add({

                            name: this.$refs.nameselector.internalValue ,
                            "actions": [
                              {
                                "device": {
                                  "id": "c39181d52abe5555"
                                },
                                "actionName": "turnOff",
                                "params": [],
                                "meta": {}
                              },
                              {
                                "device": {
                                  "id": "f597c13717008fb1"
                                },
                                "actionName": "armStay",
                                "params": [
                                  "1234"
                                ],
                                "meta": {}
                              }
                            ],
                            "meta": {}
                        }
                    ).then(r => {
                        this.routines.push({title: r.result.name, id: r.result.id});
                    }).catch((err) => {
                        console.error(err);
                    });
              //  }else{
                //    console.error("Error en el formulario");
                //}
                this.$refs.roomform.reset();
            },
            cancelform(){
                this.$refs.roomform.reset();
                this.roomname = '';
                this.addroom = false
            },
            review(){
                console.log(api.room.getAll());
            },
            currentDev(e){
                this.currentDevice.pop();
                this.currentDevice.push(e);
            }
    }

}),


























































Vue.component('alarm',{
    template:`
        <v-container>
            
            <v-card :elevation="21"  class="alarm-card-style mx-auto" >
                
                <v-list-item one-line>
                        <v-icon large> notification_important </v-icon>
                        <v-list-item-content class="align-self-start">
                            <v-list-item-title  class="headline font-weight-bold">Alarms</v-list-item-title> 
                        </v-list-item-content>
                </v-list-item>
                
                
                <v-col v-show="havealarm == true" cols="6" md="6" >
                            <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="addalarm = true">
                                  <v-icon dark> add </v-icon> ADD ALARM
                            </v-btn>
                            <v-dialog v-model="addalarm" width="250">
                                <v-card>
                                    <v-form @submit="addNewAlarm" ref="alarmform">
                                        <v-container grid-list-sm>
                                                        <v-layout row wrap>

                                                            <v-col cols="12" sm="6" md="12">
                                                                        <v-text-field
                                                                        type="password"
                                                                        ref="alarmCode"
                                                                        label="Enter Alarm Code"
                                                                        clearable
                                                                        maxlength="4"
                                                                        counter="4"
                                                                        :rules="armRules"
                                                                        required
                                                                        ></v-text-field> <!-- chequear que lo que ingresan aca no este repetido-->
                                                            </v-col>

                                                        </v-layout>
                                        </v-container>
                                        <v-card-actions>
                                                 <v-spacer></v-spacer>
                                                 <v-btn class="mx-2" color="deep-purple darken-1" dark @click="addalarm = false">Cancel</v-btn>
                                                 <v-btn class="mx-2" color="deep-purple darken-1" dark type="submit">Done</v-btn>
                                        </v-card-actions>
                                    </v-form>
                                </v-card>
                            </v-dialog>
                </v-col>
                
                
                
                <v-col v-show="havealarm == false" cols="12" sm="10">
                          <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="changeSecurityCodeDialog = true">
                                  <v-icon dark> edit </v-icon> CHANGE SECURITY CODE
                          </v-btn>
                          </br>
                          </br>
                          <v-btn class="mx-2"  dark color="deep-purple darken-1">
                                  <v-icon dark> home </v-icon> HOME MODE
                          </v-btn>
                          </br>
                          </br>
                          <v-btn class="mx-2"  dark color="deep-purple darken-1">
                                  <v-icon dark> lock </v-icon> REGULAR MODE
                          </v-btn>
                          </br>
                          </br>
                          <v-btn class="mx-2"  dark color="deep-purple darken-1">
                                  <v-icon dark> lock_open </v-icon> DISARM
                          </v-btn>
                          </br>
                          </br>
                          <v-btn class="mx-2"  dark color="deep-purple darken-1">
                                  <v-icon dark> assignment </v-icon> GET STATE
                          </v-btn>
                          </br>
                          </br>
                </v-col>
                
                <v-dialog v-model="changeSecurityCodeDialog" max-width="300">

                          <v-card>
                              <v-form @submit="changeCode" ref="changeCodeForm">

                                 <v-container >
                                     <v-card-title class="headline">Change Security Code</v-card-title>
                                     <v-text-field 
                                            type="password"
                                            ref="oldCode"
                                            label="Enter Old Code"
                                            clearable
                                            maxlength="4"
                                            counter="4"
                                            :rules="armRules"
                                            required
                                     ></v-text-field>
                                     <v-text-field
                                            type="password"
                                            ref="newCode"
                                            label="Enter New Code"
                                            clearable
                                            maxlength="4"
                                            counter="4"
                                            :rules="armRules"
                                            required
                                     ></v-text-field>
                                     <v-card-actions>
                                         <v-spacer></v-spacer>
                                         <v-btn class="mx-2" color="deep-purple darken-1" dark @click="changeSecurityCodeDialog = false">Cancel</v-btn>
                                         <v-btn class="mx-2" color="deep-purple darken-1" dark type="submit">Done</v-btn>
                                     </v-card-actions>
                                 </v-container>
                              </v-form>
                          </v-card>
                </v-dialog>
                
            
            </v-card>
               
        </v-container>`,
     mounted(){
        console.log(this.devices);
         api.device.getAll().then( r  => {
            for(let i of r.devices){
                this.devices.push({id: i.id, name: i.name, code: i.meta.code}); //por ahora solo le guardo name, hay que ver que mas necesitamos
            }
        })
         console.log(this.devices);
     },

    methods: {
        changeCode(event){
            event.preventDefault();
            var old;
            var idCode;
            for(let i of this.devices){
                if (i.name === "alarm"){
                    old = i.code;
                    idCode = i.id;
                }
            }
            //console.log(this.$refs.oldCode.internalValue);
            if(this.$refs.oldCode.internalValue !== old){
                alert(JSON.stringify({error : 'invalid password'}));
                this.$refs.changeCodeForm.reset();
                return;
            }
            //console.log(idCode);
            //console.log(this.$refs.oldCode.internalValue);
            //console.log(this.$refs.newCode.internalValue);
            api.device.sendAction(idCode, 'changeSecurityCode', [this.$refs.oldCode.internalValue,this.$refs.newCode.internalValue]);
            alert(JSON.stringify({error : 'password changed'}));


            this.changeSecurityCodeDialog = false;
            this.$refs.changeCodeForm.reset();

        },


        addNewAlarm(event) {
            console.log(this.havealarm);
            event.preventDefault();
            if(this.$refs.alarmform.validate()){
                api.device.add({
                    type: { id: "mxztsyjzsrq7iaqc" }, //id de la alarma, siempre igual
                    name: "alarm",
                    meta:{
                        code: this.$refs.alarmCode.internalValue,
                        fav: false,
                    }
                }).then(r => {
                    this.myAlarmID = r.result.id;
                    console.log(r.result.meta.code);
                }).catch((err) => {
                    console.error(err);
                });
            }else{
                console.error("Error en el formulario");
            }
            this.$refs.alarmform.reset();
            this.addalarm = false;
            this.havealarm = true;
            console.log(this.havealarm);
        },

        activateAlarm(){
            api.device.sendAction(this.myAlarmID, 'arm' + this.armMode, [this.armNumbers]).then((response)=>{
                if(response){
                    this.armDialog = false;
                }
                else{
                    this.armDialog = true;
                    this.armNumbers = '';
                }
            })
        },
        deactivateAlarm(){
            api.device.sendAction(this.myAlarmID, 'disarm', [this.armNumbers]).then((response)=>{
                if(response){
                    this.disarmDialog = false;
                }
                else{
                    this.armNumber='Wrong Code'
                }
            })
        },
        changeSecurityCode() {
            console.log(this.$refs.oldCode.internalvalue);
            if(this.$refs.oldCode.internalvalue !== this.myAlarmID){
                alert(JSON.stringify({error : 'invalid password'}));
                return;
            }
            let params = JSON.parse(JSON.stringify([this.armNumbers, this.newCode]));
            this.armNumbers = this.newCode = '';
            alert(JSON.stringify({id : this.myAlarmID, name : 'changeSecurityCode', body : params}));
            api.device.sendAction(this.myAlarmID, 'changeSecurityCode', params);
        }

    },
    data() {
        return{
            devices: [], /* me guardo los id's de los devices ya creados,
                            asi cuando entro a alarmas me fijo,
                            si ya hay creada una alarma muestro una cosa, sino muestro otra*/
            havealarm: false,
            changeSecurityCodeDialog : false,
            armNumbers : '',
            armMode : '',
            armRules : [
                v=> v>="0000" && v<="9999" || 'Invalid Code'
            ],
            newCode : '',
            error : false,
            errorCode : '',
            myAlarmID: '',
            addalarm: false,

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
