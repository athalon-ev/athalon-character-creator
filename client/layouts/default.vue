<template>
    <v-app class="h-full">
        <v-app-bar
            fixed
            color="primary"
            dense
            dark
        >
            <nuxt-link to="/" nuxt class="flex items-center mr-8">
                <div>
                    <v-img width="100" src="https://athalon.net/wp-content/uploads/2020/02/Athalon_Schriftzug2020_HoheAufl%C3%B6sung.png" />
                </div>
                <p class="text-white text-xl leading-none mx-4">
                    Charakter Datenbank
                </p>
            </nuxt-link>
            <v-btn text small class="mx-2" href="https://athalon.de">
                Homepage
            </v-btn>
            <v-btn text small class="mx-2" href="https://athalon.de/verein">
                Verein
            </v-btn>
            <v-btn text small class="mx-2" href="https://board.athalon.de">
                Forum
            </v-btn>
            <v-btn text small class="mx-2" href="https://wiki.athalon.de">
                Wiki
            </v-btn>
            <v-spacer />
            <v-menu v-if="user" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        text
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-avatar class="mr-4" size="32">
                            <v-img :src="`https://board.athalon.de/${user.avatar}`" />
                        </v-avatar>
                        {{ user.username }}
                        <v-icon>{{ attrs['aria-expanded'] != 'true' ? 'mdi-menu-down' : 'mdi-menu-up' }}</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="logout">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Meine Charaktäre</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn v-else color="white" class="black--text" to="/accounts/login" nuxt>
                Login
            </v-btn>
        </v-app-bar>
        <nuxt class="pt-8" />
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    </v-app>
</template>

<script>
export default {
    data: () => ({
        user: null,
    }),
    created() {
        this.setUser()
        this.$root.$on('loggedIn', this.setUser)
    },
    methods: {
        setUser() {
            this.user = this.$cookies.get('user')
        },
        logout() {
            this.$cookies.remove('user', { path: '/' })
            this.setUser()
        }
    },
}

</script>

<style lang="stylus">
.v-toolbar {
    flex: 0 0 auto;
}
html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

#app {
    background-image: url(https://athalon.net/wp-content/uploads/2020/02/Hintergrund_Holz.jpg);
    background-attachment: fixed
}
.v-app-bar
    p
        margin-bottom 0
</style>
