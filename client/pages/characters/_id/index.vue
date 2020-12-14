<template>
    <div class="h-full">
        <div class="container my-8">
            <h2 class="text-2xl my-4 text-white flex justify-between">
                <template v-if="character">
                    Charakterbogen von {{ character.character.name }}
                    <v-btn color="primary" small v-if="canEdit" :href="`/characters/${$route.params.id}/edit`">
                        <v-icon class="mr-2">
                            mdi-account-edit
                        </v-icon>
                        Bearbeiten
                    </v-btn>
                </template>
                <template v-else>
                    Charakter konnte nicht gefunden werden
                </template>
            </h2>
        </div>
        <div class="my-8 w-full">
            <div v-if="character" class="container bg-white shadow rounded">
                <div class="p-4 flex flex-wrap">
                    <div class="text-center text-gray-600 mr-4">
                        <img v-if="character.character.minecraftName" :src="$withBase(`images/${character.id}.png`)" class="mr-4 mb-2">
                        {{ character.character.minecraftName }}
                    </div>
                    <div class="w-full lg:w-auto flex-grow">
                        <div class="text-lg font-bold mb-4 flex">
                            <div class="mr-2">
                                {{ character.character.name }}
                            </div>
                            <v-icon v-if="character.character.gender == 'Weiblich'">
                                mdi-gender-female
                            </v-icon>
                            <v-icon v-if="character.character.gender == 'Männlich'">
                                mdi-gender-male
                            </v-icon>
                            <v-icon v-if="character.character.gender == 'Andere'">
                                mdi-gender-non-binary
                            </v-icon>
                        </div>
                        <div class="text-gray-700 font-bold">
                            Herkunft
                        </div>
                        <div class="flex items-center">
                            <NationalityBanner class="inline-flex" :nation="character.character.nationality" />,
                            <div class="ml-2">
                                {{ character.character.birthcity }}
                            </div>
                        </div>
                        <div class="text-gray-700 font-bold mt-4">
                            Alter
                        </div>
                        {{ character.character.age || '--' }}
                        <div class="text-gray-700 font-bold mt-4">
                            Haarfarbe
                        </div>
                        {{ character.character.haircolor || '--' }}
                        <div class="text-gray-700 font-bold mt-4">
                            Augenfarbe
                        </div>
                        {{ character.character.eyecolor || '--' }}
                    </div>
                    <div class="w-full lg:w-auto flex-grow">
                        <div class="text-gray-700 font-bold">
                            Äußeres Erscheinungsbild
                        </div>
                        {{ character.character.name }} ist {{ character.character.size }}cm groß und wiegt {{ character.character.weight }} Kilo.
                        <div class="text-gray-700 font-bold mt-4">
                            Weitere Merkmale
                        </div>
                        {{ character.character.physical || '--' }}
                    </div>
                    <div class="w-full">
                        <div class="text-center">
                            <img class="my-4 inline" style="height: 7em" :src="require('~/assets/images/divider.png')">
                        </div>
                        <div class="w-1/2">
                            <div class="text-gray-700 font-bold mt-4">
                                Persönlichkeit und Weltanschauung
                            </div>
                            {{ character.character.ideology || '--' }}
                            <div class="text-gray-700 font-bold mt-4">
                                Eigenschaften und Angewohnheiten
                            </div>
                            {{ character.character.habits || '--' }}
                            <div class="text-gray-700 font-bold mt-4">
                                Ängste und Abneigungen
                            </div>
                            {{ character.character.fears || '--' }}
                            <div class="text-gray-700 font-bold mt-4">
                                Profession vor Neu Corethon
                            </div>
                            {{ character.character.job || '--' }}
                            <div class="text-gray-700 font-bold mt-4">
                                Familie und Verwandtschaft
                            </div>
                            {{ character.character.family || '--' }}
                            <div class="text-gray-700 font-bold mt-4">
                                Warum hast du die Heimat verlassen?
                            </div>
                            {{ character.character.whyLeft || '--' }}
                            <div class="text-gray-700 font-bold mt-4">
                                Was hast du zurück gelassen?
                            </div>
                            {{ character.character.leftWhat || '--' }}
                            <div class="text-gray-700 font-bold mt-4">
                                Was möchtest du erreichen?
                            </div>
                            {{ character.character.goals || '--' }}
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="text-center">
                            <img class="my-4 inline" style="height: 7em" :src="require('~/assets/images/divider.png')">
                        </div>
                        <SkillAttributes
                            readonly
                            :all="character.character.skillpoints"
                            v-model="character.character.skillpoints.strength"
                            name="Stärke" color="-red-"
                            v-bind="$props"
                        />
                        <SkillAttributes
                            readonly
                            :all="character.character.skillpoints"
                            v-model="character.character.skillpoints.constitution"
                            name="Konstitution" color="-orange-"
                            v-bind="$props"
                        />
                        <SkillAttributes
                            readonly
                            :all="character.character.skillpoints"
                            v-model="character.character.skillpoints.aptness"
                            name="Geschick" color="-green-"
                            v-bind="$props"
                        />
                        <SkillAttributes
                            readonly
                            :all="character.character.skillpoints"
                            v-model="character.character.skillpoints.intelligence"
                            name="Intelligenz" color="-blue-"
                            v-bind="$props"
                        />
                        <SkillAttributes
                            readonly
                            :all="character.character.skillpoints"
                            v-model="character.character.skillpoints.mind"
                            name="Geist" color="-purple-"
                            v-bind="$props"
                        />
                    </div>
                </div>
            </div>
            <div v-else class="container bg-white rounded shadow p-8 flex flex-column items-center justify-center text-center">
                <div class="w-1/2">
                    <v-img class="my-4" :src="require('~/assets/images/no-character.svg')" />
                </div>
                <p class="text-xl">
                    Stehst Du auch total im Wald?
                </p>
                <p class="text-xl">
                    Den Charakter gibt es noch nicht
                </p>
                <div class="flex items-center justify-around">
                    <v-btn nuxt to="/characters" color="primary" outlined>
                        Gehe Zurück
                    </v-btn>
                    <span class="px-4">oder</span>
                    <v-btn nuxt to="/characters/create" color="primary">
                        Erstelle einen Charakter
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import NationalityBanner from '~/components/NationalityBanner'
import SkillAttributes from '~/components/SkillAttributes'

export default {
    components: {
        NationalityBanner,
        SkillAttributes,
    },
    async asyncData(ctx) {
        const { data: character } = await ctx.$axios.get(`characters/${ctx.route.params.id}`)
        return { character }
    },
    data: () => ({
        character: null
    }),
    computed: {
        ...mapState(['user']),
        canEdit() {
            if (!this.user) return false
            return this.character.accountId == this.user.id
        }
    },
}
</script>

<style>

</style>
