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
                       
            </v-toolbar>`

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




