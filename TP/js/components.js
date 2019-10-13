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
                                                                        :rules="rules"
                                                                        maxlength="60"
                                                                        counter="60"
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

                                              </v-row>
                                              

                                              <v-col v-for="dev in devices" :key="dev.name" cols="12" sm="6" md="12"  >
                                                     <v-row v-show="dev.room == room.name" justify="center" align="center">
                                                           <v-btn text> {{ dev.name}}</v-btn>
                                                     </v-row>
                                              </v-col>
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
                rules: [
                    v => !!v || 'Required',
                    v => !!v && v.length >= 3 || 'Name must be more than 3 characters',
                    v => !!v && v.length <= 60 || 'Name must be less than 60 characters',
                ],
            }
        },
        mounted() {
            api.devicetypes.getAllDeviceTypes().then( ( r ) => {
                for (let i of r.result){
                    if(i.name !== "vacuum" && i.name !== "lamp" && i.name !== "alarm") //hay que ver cuales dispositivos usamos
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
                    
                  
                    
           
                    <v-btn class="mx-2" fab dark color="deep-purple darken-1" small @click="devicedelete = !devicedelete">
                        <v-icon dark> delete </v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab dark color="deep-purple darken-1" small @click="deviceadd_s = !deviceadd_s">
                        <v-icon dark> add </v-icon>
                    </v-btn>
                    
               
                    
                    
            <!--DIALOG PARA BORRAR UN DEVICE-->
                    <v-dialog v-model="devicedelete" width="300px">
                         <v-card>
                            <v-form @submit="deletedevice" ref="deldeviceform">
                                
                                <v-card-title light> Delete Device  </v-card-title>



                                 <v-container grid-list-sm>
                                     <v-layout row wrap>

                                        <v-col cols="12" sm="6" md="12">
                                             <v-select
                                             :items="devices" item-text="name"
                                             label="Select device"
                                             ref="delnameselector"
                                             required
                                             ></v-select> <!-- chequear que lo que ingresan aca no este repetido-->
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
                            <v-btn class="mx-2" fab dark color="deep-purple darken-1" small @click="registereddevices = !registereddevices; updateState();">
                                  <v-icon dark> info </v-icon>
                            </v-btn>
                            
                         <v-card class="devices-style" :elevation="21" type="button" @click="currentDev = device.device; currentDevID = device.id ; devDialog();"> 
                            <v-img height="150"   :src="device.src">
                            <v-card-title class="white--text" v-text="device.name" ></v-card-title>
                            
                            
                            
                            <!--DIALOG PARA VER ESTADO DE LOS DEVICES-->
                                <v-dialog v-model="registereddevices" width="300px">
                                     <v-card>
                                        <v-card-title light> Device Status </v-card-title>
            
                                             <v-col v-for="state in states"  cols="12" md="6">
                                                <v-container>
                                                    <v-list-item one-line>
                                                            <v-list-item-title>state</v-list-item-title>
                                                    </v-list-item>
                                                </v-container>
                                              </v-col>
                                                
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn  text  color="primary" @click="registereddevices = false">Done</v-btn>
                                            </v-card-actions>
                                            
                                     </v-card>
                                </v-dialog>
                            <!--DIALOG PARA VER ESTADO DE LOS DEVICES-->     
                      
                 <!---DIALOG DE DEVICES-->
                 
                          <!---DIALOG DE BLINDS API WORKING-->
                          <v-dialog v-model="blindsdialog"  width="400px">
                          <v-form @submit="blindsaction">
                                <v-card>
                                                          <!---TITULO DIALOG DE DEVICE-->
                                    <v-list-item-content class="text-center">
                                          <v-list-item-title  class="title"  v-text="device.name"></v-list-item-title>
                                          <v-list-item-subtitle class="subtitle"  v-text="currentDev"></v-list-item-subtitle>
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

                          <!---DIALOG DE OVEN API WORKING-->
                          <v-dialog v-model="ovendialog"  width="400px">
                            <v-form @submit="ovenaction">
                                <v-card>
                                                          <!---TITULO DIALOG DE DEVICE-->
                                    <v-list-item-content class="text-center">
                                          <v-list-item-title  class="title"  v-text="name"></v-list-item-title>
                                          <v-list-item-subtitle class="subtitle"  v-text="currentDev"></v-list-item-subtitle>
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
                                            <v-card flat ml-12>
                                                <v-select :items="heatOptions"   label="Heat"  ref="heatOptionsSelector"  ></v-select>
                                            </v-card>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-card flat ml-12>
                                                <v-select :items="grillOptions"   label="Grill"  ref="grillOptionsSelector"  ></v-select>
                                            </v-card>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-card flat ml-12>
                                                <v-select :items="convectionOptions"   label="Convection" ref="convectionOptionsSelector"   ></v-select>
                                            </v-card>
                                         </v-list-item>                     
                                    
                                    
                                   
                                    <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                  <v-switch v-model="ovenOnOff"  color="success" value="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Off / On</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>                          
                                                                                 
                                    <v-divider></v-divider>
                                    
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  text  color="primary" @click="ovendialog = false" >Cancel</v-btn>
                                        <v-btn text @click="ovendialog = false" type="submit" >Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                               </v-form>   
                             </v-dialog>
                          <!---DIALOG DE OVEN-->
                          
                          <!---DIALOG DE Refrigerator API WORKING-->
                          <v-dialog v-model="refrigeratordialog"  width="400px">
                            <v-form @submit="refrigeratoraction">
                                <v-card>
                                                          <!---TITULO DIALOG DE DEVICE-->
                                    <v-list-item-content class="text-center">
                                          <v-list-item-title  class="title"  v-text="device.name"></v-list-item-title>
                                          <v-list-item-subtitle class="subtitle"  v-text="currentDev"></v-list-item-subtitle>
                                    </v-list-item-content>
                                             <v-divider></v-divider>
                                                                       <!---CONTENIDO DIALOG DE DEVICE-->
                                                                       
                                     <v-list-item>
                                           <v-card-text>
                                             <v-row>
                                               <v-col class="pr-4">
                                                      <v-slider :label="ex4.label" v-model="sliderFreezer" class="align-center" :max="-8" :min="-20" hide-details>
                                                        <template v-slot:append>
                                                             <v-text-field   v-model="sliderFreezer" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px" ></v-text-field>
                                                         </template>
                                                    </v-slider>
                                               </v-col>
                                             </v-row>
                                    </v-card-text><!--OVEN TEMPERATURE-->
                                    </v-list-item>
                                    
                                                                         <v-list-item>
                                           <v-card-text>
                                             <v-row>
                                               <v-col class="pr-4">
                                                      <v-slider :label="ex5.label" v-model="sliderRefri" class="align-center" :max="8" :min="2" hide-details>
                                                        <template v-slot:append>
                                                             <v-text-field   v-model="sliderRefri" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px" ></v-text-field>
                                                         </template>
                                                    </v-slider>
                                               </v-col>
                                             </v-row>
                                    </v-card-text><!--OVEN TEMPERATURE-->
                                    </v-list-item>
                                    
                                    
                                    
                                    
                                    
                                    <v-list-item>
                                        <template >
                                            <v-card flat ml-10>
                                              
                                                    <v-select :items="RefriModes"   label="Mode"  ref="RefriSelectorModes"></v-select>
                                                   
                                            </v-card>
                                        </template>
                                    </v-list-item>
                                    
                                   
                                                
                                                                           
                                    <v-divider></v-divider>
                                   
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  text  color="primary" @click="refrigeratordialog = false" >Cancel</v-btn>
                                        <v-btn text @click="refrigeratordialog = false" type="submit" >Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                               </v-form>   
                             </v-dialog>
                          <!---DIALOG DE Refrigerator-->
                          
                          <!---DIALOG DE AC API WORKING-->      
                          <v-dialog v-model="acdialog"  width="400px">
                            <v-form @submit="acaction">
                                <v-card>
                                                          <!---TITULO DIALOG DE DEVICE-->
                                    <v-list-item-content class="text-center">
                                          <v-list-item-title  class="title"  v-text="device.name"></v-list-item-title>
                                          <v-list-item-subtitle class="subtitle"  v-text="currentDev"></v-list-item-subtitle>
                                    </v-list-item-content>
                                             <v-divider></v-divider>
                                                                       <!---CONTENIDO DIALOG DE DEVICE-->
                                                                       
                          
                                    
                                    <v-list-item>
                                           <v-card-text>
                                             <v-row>
                                               <v-col class="pr-4">
                                                      <v-slider :label="ex6.label" v-model="sliderTemp" class="align-center" :max="38" :min="13" hide-details>
                                                        <template v-slot:append>
                                                             <v-text-field   v-model="sliderTemp" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px" ></v-text-field>
                                                         </template>
                                                    </v-slider>
                                               </v-col>
                                             </v-row>
                                    </v-card-text><!--OVEN TEMPERATURE-->
                                    </v-list-item>
                                     <v-divider></v-divider>
                                     <v-list-item>
                                            <v-card flat ml-12>
                                                <v-select :items="acOptions"   label="Mode"  ref="acOptionsSelector"  ></v-select>
                                            </v-card>
                                        </v-list-item>
                                        

   <v-divider></v-divider>
                                         
                                    <v-list-item>         
                                                
                                         <v-card flat ml-12>
                                                <v-select :items="aspLabels"   label="Vertical Asps"  ref="aspasVSelector"  ></v-select>
                                            </v-card>
                                    </v-list-item> 
                                    
                                                              <v-divider></v-divider>           
                                     
                                    <v-list-item>  
                                         <v-card flat ml-12>
                                                <v-select :items="aspLabelsH"   label="Horizontal Asps"  ref="aspasHSelector"  ></v-select>
                                            </v-card>
                                    </v-list-item> 
                                    
                                     <v-divider></v-divider>
                                     
                                       
                                    <v-list-item>      
                                         <v-card flat ml-12>
                                                <v-select :items="Fanspeed"   label="Fan Speed"  ref="fanSpeedSelector"  ></v-select>
                                            </v-card>
                                    </v-list-item> 
                                   
  <v-divider></v-divider>
                                   
                                    <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                  <v-switch v-model="acOffOn"  color="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Off / On</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>                          
                                   
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  text  color="primary" @click="acdialog = false" >Cancel</v-btn>
                                        <v-btn text @click="acdialog = false" type="submit" >Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                               </v-form>   
                             </v-dialog>
                          <!---DIALOG DE AC-->
                          
                          <!---DIALOG DE Speaker API WORKING-->
                          <v-dialog v-model="speakerdialog"  width="400px">
                            <v-form @submit="speakeraction">
                                <v-card>
                                                          <!---TITULO DIALOG DE DEVICE-->
                                    <v-list-item-content class="text-center">
                                          <v-list-item-title  class="title"  v-text="device.name"></v-list-item-title>
                                          <v-list-item-subtitle class="subtitle"  v-text="currentDev"></v-list-item-subtitle>
                                    </v-list-item-content>
                                             
                                             <v-divider></v-divider>
                                                                       <!---CONTENIDO DIALOG DE DEVICE-->
                                                                       
                          
                                    
                                    <v-list-item>
                                           <v-card-text>
                                             <v-row>
                                               <v-col class="pr-4">
                                                      <v-slider :label="ex7" v-model="sliderSpeaker" class="align-center" max="10" min="0" hide-details>
                                                        <template v-slot:append>
                                                             <v-text-field   v-model="sliderSpeaker" class="mt-0 pt-0" hide-details single-line type="number" style="width: 60px" ></v-text-field>
                                                         </template>
                                                    </v-slider>
                                               </v-col>
                                             </v-row>
                                    </v-card-text>
                                    </v-list-item>
                                    
                                     <v-divider></v-divider>
                                  
                                     <v-list-item>
                                            <v-card flat ml-12>
                                                <v-select :items="speakeroptions"   label="Mode"  ref="SpeakerOptionsSelector"  ></v-select>
                                            </v-card>
                                      </v-list-item>
                                        
                                        <template>
                                          <div class="text-center">
                                            <v-btn  @click="prevSong"  class="mx-2" fab dark small color="primary">
                                              <v-icon dark>mdi-skip-previous</v-icon>
                                            </v-btn>
                                        
                                            <v-btn @click="stopSong" class="mx-2" fab dark small color="pink">
                                              <v-icon dark>mdi-stop</v-icon>
                                            </v-btn>
                                        
                                            <v-btn  @click="playSong" class="mx-2" fab dark small color="indigo">
                                              <v-icon dark>mdi-play</v-icon>
                                            </v-btn>
                                        
                                            <v-btn @click="pauseSong" class="mx-2" fab dark small color="teal">
                                              <v-icon dark>mdi-pause</v-icon>
                                            </v-btn>
                                        
                                            <v-btn @click="nextSong" class="mx-2" fab dark small color="cyan">
                                              <v-icon dark>mdi-skip-next</v-icon>
                                            </v-btn>
                                            
                                            <v-btn @click="resumeSong" class="mx-2" fab dark small color="cyan">
                                              <v-icon dark>mdi-tilde</v-icon>
                                            </v-btn>
                                        
                                          </div>
                                        </template>

<!--                                        <v-list-item>-->
<!--                                        <template v-slot:default="{ active, toggle }">-->
<!--                                            <v-list-item-action>-->
<!--                                                  <v-switch v-model="SpeakerOffOn"  color="success"  hide-details></v-switch>-->
<!--                                            </v-list-item-action>-->
<!--                                            <v-list-item-content>-->
<!--                                                  <v-list-item-subtitle>Off / On</v-list-item-subtitle>-->
<!--                                            </v-list-item-content>-->
<!--                                        </template>-->
<!--                                    </v-list-item>                          -->
                                                                   
                                        <v-divider></v-divider>
                                   
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  text  color="primary" @click="speakerdialog = false" >Cancel</v-btn>
                                        <v-btn text @click="speakerdialog = false" type="submit" >Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                               </v-form>   
                             </v-dialog>
                          <!---DIALOG DE Speaker-->
                          
                          <!---DIALOG DE Door API WORKING--> 
                          <v-dialog v-model="doordialog"  width="400px">
                          <v-form @submit="dooraction">
                                <v-card>
                                                          <!---TITULO DIALOG DE DEVICE-->
                                    <v-list-item-content class="text-center">
                                          <v-list-item-title  class="title"  v-text="name"></v-list-item-title>
                                          <v-list-item-subtitle class="subtitle"  v-text="currentDev"></v-list-item-subtitle>
                                    </v-list-item-content>
                                             <v-divider></v-divider>
                                                                       <!---CONTENIDO DIALOG DE DEVICE-->
                                                                       
                                     <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                                     <v-switch v-model="doorClosedOpen"  color="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Close / Open</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>
                                    
                                    <template v-if="!doorClosedOpen">
                                    <v-list-item>
                                        <template v-slot:default="{ active, toggle }">
                                            <v-list-item-action>
                                            <template if >  
                                                     <v-switch v-model="doorLockedUnlocked"  color="success" hide-details></v-switch>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                  <v-list-item-subtitle>Unlock / Lock</v-list-item-subtitle>
                                            </v-list-item-content>
                                            </template>
                                        </template>
                                    </v-list-item>
                                   </template>
                                   
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  text  color="primary" @click="doordialog = false" >Cancel</v-btn>
                                        <v-btn text @click="doordialog = false" type="submit" >Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                                 </v-form>
                             </v-dialog>
                          <!---DIALOG DE Door-->
                          
                 <!---DIALOG DE DEVICES-->
                                
                            
                            </v-img>
                         </v-card> 
                    </v-col>
               </v-row>
    </div>`,
            data(){
                return {
                    //DEVICE STATES
                    states: {},
                    //SPEAKER
                    ex7: 'Volume',
                    speakeroptions: ["clasica","country","dance","latina","pop","rock"],
                    prev:false,
                    next:false,
                    play: false,
                    stop:false,
                    sliderSpeaker: 0,
                    SpeakerOffOn: false,
                    //
                    //DOOR
                    doordialog: false,
                    doorClosedOpen:false,
                    doorLockedUnlocked:false,
                    //
                    //AC
                    acOffOn: false,
                    fanSpeed: 0,
                    sliderTemp: 20,
                    aspasV: 0,
                    aspasH: 0,
                    acOptions: [
                        'ventilation',
                        'hot',
                        'cold',
                    ],
                    Fanspeed: [
                        'Auto',
                        '25',
                        '50',
                        '75',
                        '100',
                    ],
                    aspLabels: [
                        'Auto',
                        '22',
                        '45',
                        '67',
                        '90',
                    ],
                    aspLabelsH: [
                        'Auto',
                        '-90',
                        '-45',
                        '0',
                        '45',
                        '90',
                    ],
                    ex6: { label: 'Temperature', val: 100, color: 'red' },
                    //
                    //REFRI
                    ex5: { label: 'Refrigerator'},
                    ex4: { label: 'Freezer' },
                    sliderFreezer: -8,
                    sliderRefri: 2,
                    range: [2, 8],
                    ovenOnOff:false,
                    RefriModes: ["default","vacation","party"],
                    //

                    //OVEN
                    ex3: { label: 'Temperature', val: 100, color: 'red' },
                    min: 90,
                    max: 230,
                    ovendialog: false,
                    slider: 100,
                    range: [90, 230],
                    ovenOnOff:false,
                    heatOptions: ["top","bottom","conventional"],
                    grillOptions: ["off","eco","large"],
                    convectionOptions: ["off","eco","normal"],
                    //
                    //
                    //DIALOG DEVICES
                    registereddevices:false,

                    blindsdialog: false,
                    refrigeratordialog: false,
                    acdialog: false,
                    speakerdialog: false,

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
                    deviceID: '',


                    //refrigerator
                    refridialog:false,
                }
            },
            mounted() {
                api.devicetypes.getAllDeviceTypes().then( ( r ) => {
                    for (let i of r.result){
                        if(i.name !== "vacuum" && i.name !== "lamp" && i.name !== "alarm") //hay que ver cuales dispositivos usamos
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

                },
                cancelform(){
                    this.$refs.deviceform.reset();
                    this.deviceadd_s = false
                },

                deviceadd(event) {
                    //event.preventDefault();
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
                    }).then(r => {
                        this.devices.push({name: r.result.name, room: roomSelector, id: r.result.id});
                        console.log(roomID);
                        console.log(r.result.id);
                        api.room.addRoomDevices(roomID, r.result.id);
                    }).catch((err) => {
                        console.error(err);
                    });
                    this.$refs.deviceform.reset();
                },
                cancelform(){
                    this.$refs.deviceform.reset();
                    this.deviceadd_s = false
                },

                devDialog(){
                    switch (this.currentDev){
                        case 'blinds':
                            this.blindsdialog=true;
                            break;
                        case 'refrigerator':
                            this.refrigeratordialog=true;
                            break;
                        case 'speaker':
                            this.speakerdialog=true;
                            break;
                        case 'oven':
                            this.ovendialog=true;
                            break;
                        case 'ac':
                            this.acdialog=true;
                            break;
                        case 'door':
                            this.doordialog=true;
                            break;

                    }


                },
                canceldelform(){
                    this.$refs.deldeviceform.reset();
                    this.devicedelete = false
                },
                deletedevice(event){
                    for(let i of this.devices){
                        if (i.name === this.$refs.delnameselector.internalValue){
                            api.device.delete(i.id);
                            break;
                        }
                    }
                },

                //////// METHODS PARA DEVICES ////////////////
                dooraction(e){
                    e.preventDefault();
                    //is OPEN
                    if(this.doorClosedOpen){
                        api.device.sendAction(this.currentDevID,"open","");
                        this.doorLockedUnlocked=false;
                    }
                    //is CLOSED
                    else{
                        api.device.sendAction(this.currentDevID,"close","");
                        //is LOCKED
                        if(this.doorLockedUnlocked){
                            api.device.sendAction(this.currentDevID,"lock","");
                        }
                        //is UNLOCKED
                        else{
                            api.device.sendAction(this.currentDevID,"unlocked","");
                        }
                    }


                },
                ////////////////////////////////////////////////

                ovenaction(e){
                    e.preventDefault();

                    //is ON
                    if(this.ovenOnOff){
                        api.device.sendAction(this.currentDevID,"turnOn","");
                    }
                    //is OFF
                    else{
                        api.device.sendAction(this.currentDevID,"turnOff","");
                    }
                    api.device.sendAction(this.currentDevID,"setTemperature",[this.slider]);
                    api.device.sendAction(this.currentDevID,"setHeat",[this.$refs.heatOptionsSelector[0].internalValue]);
                    api.device.sendAction(this.currentDevID,"setGrill",[this.$refs.grillOptionsSelector[0].internalValue]);
                    api.device.sendAction(this.currentDevID,"setConvection",[this.$refs.convectionOptionsSelector[0].internalValue]);

                },

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
                speakeraction(){
                    e.preventDefault();
                    //SETEAR VOLUMEN, MODO, ONOFF
                    api.device.sendAction(this.currentDevID,"setVolume",[this.sliderSpeaker]);
                    api.device.sendAction(this.currentDevID,"setGenre",[this.$refs.SpeakerOptionsSelector.internalValue]);

                },
                prevSong(){
                    api.device.sendAction(this.currentDevID,"previousSong","");
                },
                nextSong(){
                    api.device.sendAction(this.currentDevID,"nextSong","");
                },
                playSong(){
                    api.device.sendAction(this.currentDevID,"play","");
                },
                pauseSong(){
                    api.device.sendAction(this.currentDevID,"pause","");
                },
                stopSong(){
                    api.device.sendAction(this.currentDevID,"stop","");
                },
                resumeSong(){
                    api.device.sendAction(this.currentDevID,"resume","");
                },
                refrigeratoraction(e){
                    e.preventDefault();
                    api.device.sendAction(this.currentDevID,"setFreezerTemperature",[this.sliderFreezer]);
                    api.device.sendAction(this.currentDevID,"setTemperature",[this.sliderRefri]);
                    api.device.sendAction(this.currentDevID,"setMode",[this.$refs.RefriSelectorModes[5].internalValue]);


                },
                acaction(e){
                    //is ON
                    e.preventDefault();
                    if(this.acOffOn){
                        api.device.sendAction(this.currentDevID,"turnOn","");
                        api.device.sendAction(this.currentDevID,"setTemperature",[this.sliderTemp]);
                        api.device.sendAction(this.currentDevID,"setMode",[this.$refs.acOptionsSelector[5].internalValue]);
                        api.device.sendAction(this.currentDevID,"setVerticalSwing",[this.$refs.aspasVSelector[5].internalValue]);
                        api.device.sendAction(this.currentDevID,"setHorizontalSwing",[this.$refs.aspasHSelector[5].internalValue]);
                        api.device.sendAction(this.currentDevID,"setFanSpeed",[this.$refs.fanSpeedSelector[5].internalValue]);
                    }
                    //if OFF
                    else{
                        api.device.sendAction(this.currentDevID,"turnOff","");
                    }

                },
                updateState(){
                    this.states = api.device.getState(this.currentDevID).result;
                }


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





/*
Vue.component('routines',{

    template: `
    <v-item-group>

            <v-container>
                <v-list-item one-line>
                    <v-list-item-content class="align-self-start">
                        <v-list-item-title  class="headline font-weight-bold">Routines</v-list-item-title>
                    </v-list-item-content>
                    <v-btn class="mx-2" fab dark color="deep-purple darken-1" @click="dialog = !dialog">
                        <v-icon dark> add </v-icon>
                    </v-btn>

                    <!-- cuadro para agregar rutinas -->

                    <v-dialog v-model="dialog" width="800">

                              <v-card>
                                  <v-form  @submit="addRoutine" ref="addRoutineForm">

                                     <v-container >
                                         <v-card-title class="headline">Add Routine </v-card-title>

                                         <v-container grid-list-sm>
                                                <v-flex  xs12  align-center  justify-space-between >

                                                        <v-layout align-center>

                                                                 <v-text-field :rules="deviceRules" required placeholder="Name" ref="nameselector" counter="60"></v-text-field>

                                                        </v-layout>
                                                </v-flex>
                                                <v-layout row wrap>
                                                         <v-col class="d-flex" cols="12" sm="12">
                                                                <v-select :items="allDev" item-text="name"  label="Select Device" ref="devSelector" name="category"  ></v-select>
                                                         </v-col>
                                                </v-layout>

                                                <v-layout row wrap>
                                                         <v-col class="d-flex" cols="12" sm="12">
                                                                 <v-select :items="devOptions" label="Device options"  name="category" type="submit" ></v-select>
                                                         </v-col>
                                                </v-layout>

                                         </v-container>
                                         <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn type="submit" left text>Add device</v-btn>
                                                <v-btn  text  color="primary" @click="cancelAdd" >Cancel</v-btn>
                                                <v-btn type="submit" text>Save</v-btn>
                                         </v-card-actions>
                                     </v-container>
                                  </v-form>
                              </v-card>
                    </v-dialog>



                    <!-- -->


                   <!--  <v-btn class="mx-2" fab dark color="deep-purple darken-1">
                        <v-icon>edit</v-icon> -->
                    </v-btn>
                </v-list-item>
                <v-divider></v-divider>

                <v-row>
                    <v-col v-for="routine in routines" :key="routine.title"  cols="12" md="4" >
                        <v-card class="routine-card-style" :elevation="21" type="button">
                            <v-list-item three-line>
                                <v-list-item-content class="align-self-start">
                                    <v-list-item-title  class="medium mb-2"  v-text="routine.title"></v-list-item-title>
                                </v-list-item-content>
                                <v-icon centered> {{ routine.icon }}</v-icon>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>




            </v-container>
        </v-item-group>`,

    mounted() {
        api.devicetypes.getAllDeviceTypes().then( ( r ) => {
            for (let i of r.result){
                if(i.name !== "vacuum" && i.name !== "lamp" && i.name !== "alarm") //hay que ver cuales dispositivos usamos
                    this.allDev.push({id: i.id, name: i.name, actions: i.actions}); // mentira que andan estos comments
            }
            console.log(this.allDev);
        })

    },
    data(){
        return{
            deviceRules: [
                v => !!v || 'Required',
                v => !!v && v.length >= 3 || 'Name must be more than 3 characters',
                v => !!v && v.length <= 60 || 'Name must be less than 60 characters',
            ],
            dialog: false,
            allDev: [],
            currentDevice:null ,
            routines: [ ],
            devOptions: [],

        }
    },
        methods: {
            //lo que intente hacer aca es guardarme en un vector devoptions las correspondientes al que seleccionan, pero no anduvo del todo bien
            //si elegis el dispositivo y tocas save recien ahi se guarda
            //pero si tocas el dispositivo, tocas save, despues cambias el dispositivo y volves a tocar save se guardan las opciones de los 2
            //no se resetea el vector
            addRoutine(event){
                console.log(this.$refs.devSelector.internalValue);
                event.preventDefault();

                    for(let i of this.allDev){
                        console.log(i.name);
                        if(this.$refs.devSelector.internalValue === i.name){
                            for(let j of i.actions)
                                this.devOptions.push(j.name);
                            console.log(this.devOptions);
                        }
                    }

            },

            cancelAdd(event){

            },

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

 */

Vue.component('routines',{

            template: ` 
    <v-item-group>

            <v-container>
                <v-list-item one-line>
                    <v-list-item-content class="align-self-start">
                        <v-list-item-title  class="headline font-weight-bold">Routines</v-list-item-title>
                    </v-list-item-content>
                    <v-btn class="mx-2" small fab dark color="deep-purple darken-1" @click="dialog = !dialog">
                        <v-icon  dark>add </v-icon>
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
                                                            <v-select :items="devices" item-text="name"  label="Select Device"  name="category"  ></v-select>
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


                    <v-btn small class="mx-2" fab dark color="deep-purple darken-1">
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-list-item>
                <v-divider></v-divider>

                <v-row>
                    <v-col v-for="routine in routines" :key="routine.title"  cols="12" md="4" >
                        <v-card class="routine-card-style" :elevation="21" type="button"> 
                            <v-list-item three-line>
                                <v-list-item-content class="align-self-start">
                                    <v-list-item-title  class="medium mb-2"  v-text="routine.title"></v-list-item-title>
                                </v-list-item-content>
                                <v-icon centered> {{ routine.icon }}</v-icon>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>




            </v-container>
        </v-item-group>`,

            mounted() {
                api.device.getAll().then( r => {
                    for(let i of r.devices){
                        if(i.name !== "alarm")
                            this.devices.push({id: i.id, name: i.name, src: i.meta.img, device: i.meta.device});
                    }
                    console.log(this.devices);
                })
            },
            data(){
                return{
                    deviceRules: [
                        v => !!v || 'Required',
                        v => !!v && v.length >= 3 || 'Name must have 3',
                        v => !!v && v.length <= 60 || 'Name ',
                    ],
                    dialog: false,
                    devices: [],
                    currentDevice:null ,
                    routines: [ ]
                }
            },
            methods: {

                addRoutine(event){

                },

                cancelAdd(event){

                },

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
                
                
                <v-col cols="12" sm="10">
                          <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="changeSecurityCodeDialog = true">
                                  <v-icon dark> edit </v-icon> CHANGE SECURITY CODE
                          </v-btn>
                          </br>
                          </br>
                          <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="homeModeDialog = true">
                                  <v-icon dark> home </v-icon> HOME MODE
                          </v-btn>
                          </br>
                          </br>
                          <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="awayModeDialog = true">
                                  <v-icon dark> lock </v-icon> REGULAR MODE
                          </v-btn>
                          </br>
                          </br>
                          <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="disarmDialog = true">
                                  <v-icon dark> lock_open </v-icon> DISARM
                          </v-btn>
                          </br>
                          </br>
                          <v-btn class="mx-2"  dark color="deep-purple darken-1" @click="stateDialog = true">
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
                
                <v-dialog v-model="homeModeDialog" max-width="300">

                          <v-card>
                              <v-form @submit="homeModeAct" ref="hm">

                                 <v-container >
                                     <v-card-title class="headline">Home Mode</v-card-title>
                                     <v-text-field 
                                            type="password"
                                            ref="password"
                                            label="Enter Password"
                                            clearable
                                            maxlength="4"
                                            counter="4"
                                            :rules="armRules"
                                            required
                                     ></v-text-field>
                                     
                                     <v-card-actions>
                                         <v-spacer></v-spacer>
                                         <v-btn class="mx-2" color="deep-purple darken-1" dark @click="homeModeDialog = false">Cancel</v-btn>
                                         <v-btn class="mx-2" color="deep-purple darken-1" dark type="submit">Done</v-btn>
                                     </v-card-actions>
                                 </v-container>
                              </v-form>
                          </v-card>
                </v-dialog>
                
                <v-dialog v-model="awayModeDialog" max-width="300">

                          <v-card>
                              <v-form @submit="awayMode" ref="am">

                                 <v-container >
                                     <v-card-title class="headline">Regular Mode</v-card-title>
                                     <v-text-field 
                                            type="password"
                                            ref="password"
                                            label="Enter Password"
                                            clearable
                                            maxlength="4"
                                            counter="4"
                                            :rules="armRules"
                                            required
                                     ></v-text-field>
                                     
                                     <v-card-actions>
                                         <v-spacer></v-spacer>
                                         <v-btn class="mx-2" color="deep-purple darken-1" dark @click="awayModeDialog = false">Cancel</v-btn>
                                         <v-btn class="mx-2" color="deep-purple darken-1" dark type="submit">Done</v-btn>
                                     </v-card-actions>
                                 </v-container>
                              </v-form>
                          </v-card>
                </v-dialog>
                
                <v-dialog v-model="disarmDialog" max-width="300">

                          <v-card>
                              <v-form @submit="disarmMode" ref="dm">

                                 <v-container >
                                     <v-card-title class="headline">Disarm</v-card-title>
                                     <v-text-field 
                                            type="password"
                                            ref="password"
                                            label="Enter Password"
                                            clearable
                                            maxlength="4"
                                            counter="4"
                                            :rules="armRules"
                                            required
                                     ></v-text-field>
                                     
                                     <v-card-actions>
                                         <v-spacer></v-spacer>
                                         <v-btn class="mx-2" color="deep-purple darken-1" dark @click="disarmDialog = false">Cancel</v-btn>
                                         <v-btn class="mx-2" color="deep-purple darken-1" dark type="submit">Done</v-btn>
                                     </v-card-actions>
                                 </v-container>
                              </v-form>
                          </v-card>
                </v-dialog>
                
                <v-dialog v-model="stateDialog" max-width="300">

                          <v-card>
                              <v-form @submit="disarmMode" ref="dm">

                                 <v-container >
                                     <v-card-title class="headline">Alarm State</v-card-title>
                                     
                                     {{ getState() }}
                                     
                                     <v-card-actions>
                                         <v-spacer></v-spacer>
                                         <v-btn class="mx-2" color="deep-purple darken-1" dark @click="stateDialog = false">Done</v-btn>
                                     </v-card-actions>
                                 </v-container>
                              </v-form>
                          </v-card>
                </v-dialog>
                
                
                
            
            </v-card>
               
        </v-container>`,
     mounted(){
        console.log(this.devices);

            //
             var flag = true;
             api.device.getAll().then( r  => {
                 for(let i of r.devices){
                     if(i.name === "alarm"){
                         flag = false;
                         console.log(flag);
                     }
                 }
                 if(flag){
                     api.device.add({
                         type: { id: "mxztsyjzsrq7iaqc" }, //id de la alarma, siempre igual
                         name: "alarm",
                         meta:{
                             fav: false,
                         }
                     }).catch((err) => {
                         console.error(err);
                     });
                 }

                 for(let i of r.devices){
                     this.devices.push({id: i.id, name: i.name, state: i.state.status}); //por ahora solo le guardo name, hay que ver que mas necesitamos
                 }
             })

            //

         console.log(this.devices);
     },

    methods: {
        homeModeAct(event){
            var idCode;
            for(let i of this.devices){
                if (i.name === "alarm"){
                    idCode = i.id;
                }
            }

            api.device.sendAction(idCode, 'armStay', [this.$refs.password.internalValue]);
            this.homeModeDialog = false;
            this.$refs.hm.reset();
        },

        disarmMode(event){
            var idCode;
            for(let i of this.devices){
                if (i.name === "alarm"){
                    idCode = i.id;
                }
            }

            api.device.sendAction(idCode, 'disarm', [this.$refs.password.internalValue]);
            this.disarmDialog = false;
            this.$refs.dm.reset();
        },

        awayMode(event){
            var idCode;
            for(let i of this.devices){
                if (i.name === "alarm"){
                    idCode = i.id;
                }
            }
            /*if(this.$refs.password.internalValue !== old){
                alert(JSON.stringify({error : 'invalid password'}));
                this.$refs.hm.reset();
                return;
            } */
            api.device.sendAction(idCode, 'armAway', [this.$refs.password.internalValue]);
            this.awayModeDialog = false;
            this.$refs.am.reset();
        },

        changeCode(event){
            event.preventDefault();
            var idCode;
            for(let i of this.devices){
                if (i.name === "alarm"){
                    idCode = i.id;
                }
            }
            /*if(this.$refs.oldCode.internalValue !== old){
                alert(JSON.stringify({error : 'invalid password'}));
                this.$refs.changeCodeForm.reset();
                return;
            }*/
            let params = JSON.parse(JSON.stringify([this.$refs.oldCode.internalValue, this.$refs.newCode.internalValue]));
            api.device.sendAction(idCode, 'changeSecurityCode', params);
            this.changeSecurityCodeDialog = false;
            this.$refs.changeCodeForm.reset();

        },

        getState() {
            for(let i of this.devices){
                if(i.name === "alarm"){
                    return i.state;
                }
            }
        }

    },
    data() {
        return{
            devices: [], /* me guardo los id's de los devices ya creados,
                            asi cuando entro a alarmas me fijo,
                            si ya hay creada una alarma muestro una cosa, sino muestro otra*/
            changeSecurityCodeDialog : false,
            homeModeDialog: false,
            awayModeDialog: false,
            disarmDialog: false,
            stateDialog: false,
            armNumbers : '',
            armMode : '',
            armRules : [
                v=> v>="0000" && v<="9999" || 'Invalid Code'
            ],
            newCode : '',
            error : false,
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
            
            <!--<v-navigation-drawer v-model="drawer" app right clipped  class="white">
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
            </v-navigation-drawer> -->
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
