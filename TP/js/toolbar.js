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
                        <v-btn icon  v-on:click="drawer = !drawer">
                             <v-icon>settings</v-icon>
                        </v-btn>
                       
            </v-toolbar>
            
<<<<<<< HEAD
            <v-navigation-drawer v-model="drawer" app left   class="white">
=======
            <v-navigation-drawer v-model="drawer" app right clipped  class="white">
>>>>>>> 23abbc12b62215831f5936253250cbae5ca5441a
                <v-list-item>
                     <v-list-item-content>
                          <v-btn class="mx-2" depressed @click="drawer = !drawer">
                                <v-icon>settings</v-icon> Settings
                          </v-btn>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list dense >
                    <v-list-item v-for="item in items" :key="item.title"  router: to="items.route">
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
            drawer:true,
            items: [
                { title: 'Cuenta', icon: 'account_circle', route:'/welcome.html' },
                { title: 'Log out', icon: 'rowing', route:'/welcome.html' },
                { title: 'About', icon: 'mdi-help-box', route:'/welcome.html' },
              ],
        }
    }
})





