<template>
    <div class="h-full">
        <div class="container my-8">
            <h2 class="text-2xl m-4 text-white">
                Athalon Charakter Datenbank
            </h2>
        </div>
        <div class="my-8 w-full bg-gray-200 shadow">
            <div class="container flex flex-wrap">
                <div class="p-4 w-1/3">
                    <nuxt-link to="/characters/create" nuxt class="character-create-card hover:text-shadow-lg transition duration-150 bg-white h-full w-full flex flex-column hover:text-white items-center justify-center py-8 shadow rounded text-center">
                        <v-icon class="block">
                            mdi-head-plus-outline
                        </v-icon>
                        <p>
                            Neuen Charakter anlegen
                        </p>
                    </nuxt-link>
                </div>
                <CharacterCard v-for="character in characters" :key="character.id" :character="character" class="w-1/3" />
            </div>
            <div class="container flex justify-center">
                <v-btn color="primary" @click="loadMore">
                    Mehr laden
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import CharacterCard from '~/components/CharacterCard'

export default {
    components: {
        CharacterCard,
    },
    async asyncData(context) {
        const characters = await context.$api.getCharacters({ limit: 10, offset: 0 })
        return { characters, offset: 0 }
    },
    data: () => ({
        characters: [],
        limit: 0,
        offset: 0,
    }),
    computed: {
        ...mapState(['user'])
    },
    methods: {
        async loadMore() {
            this.offset += 2
            this.characters = [...this.characters, ...await this.$api.getCharacters({ limit: 10, offset: this.offset })]
        },
        async deleteCharacter(id) {
            await this.$axios.delete(`characters/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.user.token}`
                }
            })
        }
    },
}
</script>

<style lang="stylus">
.character-create-card
    background-image linear-gradient(to top, transparent, var(--color-white)), url(https://minecraft-statistic.net/img/screen/server/203190/afceda495a25f7c6783ec106dbdb246f.jpg)
    background-color: black
    background-size cover
    background-position 0 12em
    transition-property initial !important
    &:hover
        background-position 0 0
        // border 10px solid black
</style>
