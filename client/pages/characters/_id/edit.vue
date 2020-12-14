<template>
    <div class="h-full">
        <div class="container my-8">
            <h2 class="text-2xl my-4 text-white">
                <template v-if="character">
                    Charakterbogen von {{ character.character.name }}
                </template>
                <template v-else>
                    Charakter konnte nicht gefunden werden
                </template>
            </h2>
        </div>
        <div class="my-8 w-full">
            <div v-if="character" class="container">
                <CharacterEditor class="w-full" :id="$route.params.id" :is-new="false" :character="character.character" />
            </div>
            <div v-else class="container bg-white rounded shadow p-8 flex flex-column items-center justify-center text-center">
                <div class="w-1/2">
                    <v-img class="my-4" :src="require('~/assets/images/no-character.svg')" />
                </div>
                <p class="text-xl">Stehst Du auch total im Wald?</p>
                <p class="text-xl">Den Charakter gibt es noch nicht</p>
                <div class="flex items-center justify-around">
                    <v-btn nuxt to="/characters" color="primary" outlined>Gehe Zurück</v-btn>
                    <span class="px-4">oder</span>
                    <v-btn nuxt to="/characters/create" color="primary">Erstelle einen Charakter</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CharacterEditor from '~/components/CharacterEditor'
export default {
    components: { CharacterEditor },
    data: () => ({
        character: null
    }),
    async asyncData(ctx) {
        const { data: character } = await ctx.$axios.get(`characters/${ctx.route.params.id}`)
        return { character }
    },
}
</script>

<style>

</style>
