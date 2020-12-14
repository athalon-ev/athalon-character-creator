<template>
    <div class="h-full flex justify-center items-center">
        <div class="md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white shadow rounded p-8">
            <h2 class="text-xl font-bold mb-4">
                Login
            </h2>
            <v-alert type="info" :value="true">
                Du kannst dich hier mit deinem Forenaccount anmelden
            </v-alert>
            <v-form @submit.prevent="login">
                <v-text-field v-model="credentials.username" label="Username" name="username" />
                <v-text-field v-model="credentials.password" label="Password" name="password" type="password" />
                <v-btn color="primary" type="submit">
                    Anmelden
                </v-btn>
            </v-form>
            <v-alert type="error" :value="error" class="mt-4">
                Anmeldedaten nicht gültig
            </v-alert>
        </div>
    </div>
</template>

<script>
import * as R from 'ramda'
export default {
    data: () => ({
        error: null,
        credentials: {
            username: '',
            password: '',
        }
    }),
    methods: {
        async login() {
            try {
                const { data: user } = await this.$axios.post('/accounts/login', this.credentials)
                const essentialUserData = R.pick(['token', 'slug', 'avatar', 'username', 'id'], user)
                const userData = { ...essentialUserData, id: user.uid }
                this.$cookies.set('user', userData, {
                    path: '/'
                })
                this.$store.commit('setUser', userData)
                this.$root.$emit('loggedIn', userData)
                this.$router.push('/')
            } catch (error) {
                this.error = error
            }
        }
    }
}
</script>
