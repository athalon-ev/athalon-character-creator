<template>
    <div class="p-4">
        <nuxt-link v-if="character.character" :to="link || `/characters/${character.id}`" class="transition duration-150 h-full w-full flex flex-column bg-white hover:text-white hover:bg-blue-600 shadow rounded">
            <div class="p-4 flex">
                <img v-if="character.character.minecraftName" :src="$withBase(`images/${character.character.activeSkin}-3d.png`)" class="mr-4">
                <div>
                    <p class="text-lg font-bold mb-4">
                        {{ character.character.name }}
                    </p>
                    <NationalityBanner v-if="character.character.nationality" :nation="character.character.nationality" />
                    <slot />
                    <!-- <v-btn color="red" @click.prevent.stop="deleteCharacter(character.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn> -->
                </div>
            </div>
            <div class="self-end w-full flex justify-between text-center">
                <div v-for="attribute in character.character.skillpoints" :key="attribute.name" class="font-bold flex-auto" :class="`bg${attribute.colorCreator}400 text${attribute.colorCreator}800`">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <div v-bind="attrs" v-on="on" class="py-1">
                                {{ attribute.attribute }}
                            </div>
                        </template>
                        <span>{{ attribute.name }}</span>
                    </v-tooltip>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import NationalityBanner from './NationalityBanner'
export default {
    components: {
        NationalityBanner,
    },
    props: {
        link: String,
        character: Object,
    }
}
</script>

<style>

</style>
