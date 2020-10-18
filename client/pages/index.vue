<template>
    <div class="h-full">
        <div class="container my-8">
            <h2 class="text-2xl my-4 text-white">
                Athalon Charakter Datenbank
            </h2>
        </div>
        <div class="my-8 w-full bg-white shadow">
            <div class="container flex flex-wrap">
                <div class="p-4 w-1/4">
                    <nuxt-link to="/characters/create" nuxt class="h-full w-full flex flex-column hover:text-white items-center justify-center py-8 hover:bg-blue-600 transition shadow rounded text-center">
                        <v-icon class="block">
                            mdi-head-plus-outline
                        </v-icon>
                        <p>
                            Neuen Charakter anlegen
                        </p>
                    </nuxt-link>
                </div>
                <div v-for="character in characters" :key="character.id" class="p-4 w-1/4">
                    <nuxt-link v-if="character.character" :to="`/characters/${character.id}`" class="h-full w-full flex hover:text-white p-2 hover:bg-blue-600 transition shadow rounded">
                        <MinecraftSkinImage v-if="character.character.minecraftName" :name="character.character.minecraftName" />
                        {{ character.character.name }}
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
import MinecraftSkinImage from '~/components/MinecraftSkinImage'

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
    components: {
        MinecraftSkinImage,
    },
    async asyncData(context) {
        const characters = await loadCharacters(context.$axios)({ limit: 2, offset: 0 })
        return { characters, offset: 0 }
    },
    data: () => ({
        characters: [],
        limit: 0,
        offset: 0,
    }),
    methods: {
        async loadMore() {
            this.offset += 2
            this.characters = [...this.characters, ...await loadCharacters(this.$axios)({ limit: 2, offset: this.offset })]
        },
    },
}
</script>
