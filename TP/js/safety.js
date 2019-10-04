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
                          <v-btn class="mx-2"  dark color="deep-purple darken-1">
                                  <v-icon dark> add </v-icon> ADD
                          </v-btn>
                </v-row>
            
            </v-card>
               
        </v-container> 
    
    `

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