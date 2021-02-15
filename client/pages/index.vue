<template>
    <div class="h-full">
        <div class="container mx-auto my-8">
            <h2 class="text-2xl m-4 text-white">
                Athalon Charakter Datenbank
            </h2>
        </div>
        <div class="my-8 w-full bg-gray-200 shadow">
            <div class="container mx-auto flex flex-wrap">
                <div class="p-4 w-1/3">
                    <NewCharacterCard />
                </div>
                <CharacterCard v-for="character in characters" :key="character.id" :character="character" class="w-1/3" />
            </div>
            <!-- <div class="container flex justify-center">
                <v-btn color="primary" @click="loadMore">
                    Mehr laden
                </v-btn>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import CharacterCard from '~/components/CharacterCard'
import NewCharacterCard from '~/components/NewCharacterCard'

export default {
    components: {
        CharacterCard,
        NewCharacterCard,
    },
    async asyncData(context) {
        const characters = await context.$api.getCharacters({ limit: 0, offset: 0 })
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
