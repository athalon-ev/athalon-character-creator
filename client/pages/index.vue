<template>
    <div class="h-full">
        <div class="container my-8">
            <h2 class="text-2xl my-4 text-white">
                Athalon Charakter Datenbank
            </h2>
        </div>
        <div class="my-8 w-full bg-white shadow">
            <div class="container flex">
                <div class="p-4 w-1/5">
                    <nuxt-link to="/characters/create" nuxt class="h-full w-full flex flex-column hover:text-white items-center justify-center py-8 hover:bg-blue-600 transition shadow rounded text-center">
                        <v-icon class="block">mdi-head-plus-outline</v-icon>
                        <p>
                            Neuen Charakter anlegen
                        </p>
                    </nuxt-link>
                </div>
                {{ characters }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        characters: []
    }),
    async asyncData(context) {
        const { data: characters } = await context.$axios.get('/characters')
        return { characters }
    }
}
</script>
