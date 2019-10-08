Vue.component('houses', {
    template:
        `<div>
               <v-list-item one-line>
                     <v-list-item-content class="align-self-start">
                        <v-list-item-title  class="headline font-weight-bold">Available Houses</v-list-item-title>
                    </v-list-item-content>
               </v-list-item>            
               <v-divider></v-divider>
    
               <v-row>
                    <v-col v-for="last in houses" :key="last.title"  cols="12" md="4" >
                            <v-card class="last-used-style" :elevation="21" type="button">  
                               <v-list-item three-line>
                                      <v-list-item-content class="align-self-start">
                                            <v-list-item-title  class="medium mb-2"  v-text="last.title"></v-list-item-title>
                                            <v-list-item-subtitle v-text="last.room"></v-list-item-subtitle>
                                      </v-list-item-content>
                                    <v-icon mdi-{{last.icon}}></v-icon>
                               </v-list-item>
                 
                            </v-card>
                    </v-col>
               </v-row>
        </div>`,
    data(){
        return {
            houses: [
                { title: 'House', room: 'House' , icon: 'house' },
                { title: 'Apart', room: 'Apart' , icon: 'tv'},
                { title: 'Duplex', room:'Duplex' , icon: 'speaker'},
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
