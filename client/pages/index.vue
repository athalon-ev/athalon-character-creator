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
                    <nuxt-link to="/characters/create" nuxt class="transition duration-150 bg-white h-full w-full flex flex-column hover:text-white items-center justify-center py-8 hover:bg-blue-600 shadow rounded text-center">
                        <v-icon class="block">
                            mdi-head-plus-outline
                        </v-icon>
                        <p>
                            Neuen Charakter anlegen
                        </p>
                    </nuxt-link>
                </div>
                <div v-for="character in characters" :key="character.id" class="p-4 w-1/3">
                    <nuxt-link v-if="character.character" :to="`/characters/${character.id}`" class="transition duration-150 h-full w-full flex flex-column bg-white hover:text-white hover:bg-blue-600 shadow rounded">
                        <div class="p-4 flex">
                            <img v-if="character.character.minecraftName" :src="`http://localhost:8080/images/${character.id}.png`" class="mr-4">
                            <div>
                                <p class="text-lg font-bold mb-4">{{ character.character.name }}</p>
                                <v-btn color="delete" icon @click.prevent.stop="deleteCharacter(character.id)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </div>
                        </div>
                        <div class="self-end w-full flex justify-between text-center">
                            <div v-for="attribute in character.character.skillpoints" :key="attribute.name" class="font-bold flex-auto" :class="`bg${attribute.colorCreator}400 text${attribute.colorCreator}800`">
                                {{ attribute.attribute }}
                            </div>
                        </div>
                    </nuxt-link>
                </div>
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

const loadCharacters = axios => async ({ limit = 10, offset = 0 }) => {
    const { data: characters } = await axios.get('/characters', {
        params: {
            _limit: limit,
            _offset: offset,
        }
    })
    return characters
}

export default {
    // components: {
    // },
    async asyncData(context) {
        const characters = await loadCharacters(context.$axios)({ limit: 10, offset: 0 })
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
            this.characters = [...this.characters, ...await loadCharacters(this.$axios)({ limit: 2, offset: this.offset })]
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
