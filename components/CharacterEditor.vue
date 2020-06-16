<template>
    <v-form class="shadow bg-white rounded relative">
        <v-tabs
            v-model="tab"
            background-color="primary"
            dark
        >
            <v-tab>
                Hauptdaten
            </v-tab>
            <v-tab>
                Persönliches
            </v-tab>
            <v-tab>
                Vergangenheit
            </v-tab>
            <v-tab>
                Attribute
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item class="p-4">
                <v-btn color="primary" outlined @click="randomize" class="top-0 right-0 absolute m-4">
                    <v-icon class="lg:mr-2">
                        mdi-dice-6
                    </v-icon>
                    <span class="hidden lg:block">Lass den Zufall entscheiden</span>
                </v-btn>
                <v-text-field v-model="character.name" name="name" label="Name" class="sm:w-1/2" />
                <v-text-field v-model="character.minecraftName" name="minecraft-name" label="Minecraft Name" class="sm:w-1/2" />
                <p class="text-gray-700">
                    Hiermit kannst du dein Erscheinungsbild verfeinern, wie willst du auf andere wirken?
                </p>
                <div class="sm:flex justify-between">
                    <div class="sm:w-1/2 pr-4">
                        <v-text-field v-model="character.age" name="age" type="number" :min="5" :max="200" label="Alter" suffix="Jahre" />
                        <v-slider
                            v-model="character.size"
                            vertical name="height" label="Größe"
                            :min="120" :max="180"
                            thumb-label="always"
                        >
                            <div slot="thumb-label">
                                {{ character.size }}cm
                            </div>
                        </v-slider>
                    </div>
                    <div class="sm:w-1/2">
                        <v-combobox name="haircolor" label="Haarfarbe" v-model="character.haircolor" :items="characterData.haircolors" />
                        <v-combobox name="eyecolor" label="Augenfarbe" v-model="character.eyecolor" :items="characterData.eyecolors" />
                        <v-text-field v-model="character.weight" name="weight" type="number" :min="40" :max="150" label="Gewicht" suffix="kg" />
                    </div>
                </div>
                <v-textarea label="Äußerliche Erscheinung" placeholder="Narben, Auffälligkeiten" :rows="2" />
                <h2 class="text-xl font-bold my-4">
                    Herkunft
                </h2>
                <p class="text-gray-700">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                href="https://wiki.athalon.net/index.php/Hauptseite"
                                target="_blank"
                                fab small color="primary"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-map</v-icon>
                            </v-btn>
                        </template>
                        <v-img width="50vw" src="http://wiki.athalon.net/images/e/e6/Le%C3%A4ndrien2020.png" />
                    </v-tooltip>
                    Die Herkunft bestimmt deinen Wortschatz und auch deine Religion und Kultur wie Bräuche
                </p>
                <div class="flex justify-between">
                    <div class="sm:w-1/2 pr-4">
                        <v-select name="nationality" label="Nationalität" v-model="character.nationality" item-value="name" :items="nations">
                            <div slot="item" slot-scope="{ item }" class="flex items-center">
                                <v-img :src="item.banner" :width="32" class="mr-2" />
                                {{ item.name }}
                            </div>
                            <div slot="selection" slot-scope="{ item }" class="flex items-center">
                                <v-img :src="item.banner" :width="32" class="mr-2" />
                                {{ item.name }}
                            </div>
                            <v-btn color="primary" icon slot="append" small v-if="character.nationality" :href="getNationUrl(character.nationality)" target="_blank">
                                <v-icon>mdi-map-search</v-icon>
                            </v-btn>
                        </v-select>
                    </div>
                    <div class="sm:w-1/2">
                        <v-combobox name="birthcity" label="Geburtsort" v-model="character.birthcity" :items="cities" />
                    </div>
                </div>
            </v-tab-item>
            <v-tab-item class="p-4">
                <v-textarea label="Angewohnheiten" :rows="2" placeholder="Putzfimmel, Fingernägelkauer, Alkoholproblem, Tagträumer, Raucher, Hutträger..." />
                <v-textarea label="Weltanschauung" :rows="3" placeholder="Patriotisch, Humanistisch, Religiös, Optimistisch, Pessimistisch, Egoistisch, Esoterisch..." />
                <v-textarea label="Ängste und Phobien" :rows="2" placeholder="Höhenangst, Feuer, Tod, Dunkelheit, Einsamkeit, Spinnen, Angst vor dem Versagen" />
            </v-tab-item>
            <v-tab-item class="p-4">
                <v-textarea label="Profession vor Neu Corethon" :rows="2" placeholder="Hintergrund, Schicksale, Berufsstand" />
                <v-textarea label="Familie und Verwandtschaft" :rows="4" placeholder="Name, Beruf und der Verbleib deiner Eltern und anderen Verwandten: Lebendig, Verschollen oder Tot?" />
                <v-textarea label="Warum hast du die Heimat verlassen?" :rows="3" placeholder="Motivation für die Abreise nach Neu Corethon in die Unbekannten Lande" />
                <v-textarea label="Was hast du zurück gelassen?" :rows="1" placeholder="Familienmitglieder, Nahestehende, Persönliche Gegenstände, Arbeitsstätte, Haustiere" />
                <v-textarea label="Was möchtest du erreichen?" :rows="3" placeholder="Gesteckte Ziele, Hoffnungen und Antrieb für weiteren Lebensweg" />
            </v-tab-item>
            <v-tab-item class="p-4">
                <p>Mit den Punkten verteilst du deine Fähigkeiten</p>
                <v-progress-linear
                    class="rounded-full"
                    color="primary"
                    height="25"
                    :value="attributesUsedPercentage"
                >
                    <div class="text-white">
                        {{ value }}/250
                    </div>
                </v-progress-linear>
                <SkillAttributes name="Stärke" color="text-red-400" />
                <SkillAttributes name="Konstitution" color="text-orange-400" />
                <SkillAttributes name="Geschick" color="text-green-400" />
                <SkillAttributes name="Intelligenz" color="text-blue-400" />
                <SkillAttributes name="Geist" color="text-purple-400" />
                Trefferpunkte
                Stabilität
                Staturbonus
            </v-tab-item>
        </v-tabs-items>
        <div class="flex flex-row justify-between p-4">
            <v-btn color="primary" class="self-end" v-if="tab > 0" @click="tab--">Voriger Schritt</v-btn>
            <v-btn color="primary" class="self-end" v-if="tab < 3" @click="tab++">Nächster Schritt</v-btn>
        </div>
    </v-form>
</template>

<script>
import * as R from 'ramda'
import SkillAttributes from './SkillAttributes'
import characterData from '~/character-data'
const randomItem = list => list[Math.random() * list.length | 0]
const getNationByName = name => R.find(R.propEq('name', name), characterData.nations)
const availableCities = character => R.prop('cities', getNationByName(character.nationality))
const randomFromRange = (min, max) => (min + Math.random() * (max - min))
export default {
    components: { SkillAttributes },
    data: () => ({
        section: 'character',
        tab: 'Hauptdaten',
        characterData,
        nations: characterData.nations,
        character: {
            name: '',
            minecraftName: '',
            age: '',
            size: 170,
            weight: '',
            haircolor: '',
            eyecolor: '',
            nationality: '',
            birthcity: '',
            skillpoints: {
                strength: {
                    total: 50,
                    attributes: [
                        {
                            name: 'Handgemenge',
                            points: 10,
                            custom: false,
                        }
                    ],
                },
                constitution: {
                    total: 50,
                    attributes: [],
                },
                aptness: {
                    total: 50,
                    attributes: [],
                },
                intelligence: {
                    total: 50,
                    attributes: [],
                },
                mind: {
                    total: 50,
                    attributes: [],
                },
            },
        },
    }),
    computed: {
        cities() {
            return availableCities(this.character)
        },
        attributesUsedPercentage() {
            return this.character.skillpoints
        }
    },
    methods: {
        randomize() {
            this.character.weight = randomFromRange(50, 120).toFixed(1)
            this.character.size = randomFromRange(120, 180).toFixed(0)
            this.character.age = randomFromRange(14, 50).toFixed(0)
            this.character.haircolor = randomItem(characterData.haircolors)
            this.character.eyecolor = randomItem(characterData.eyecolors)
            this.character.nationality = R.prop('name', randomItem(this.nations))
            this.character.birthcity = randomItem(availableCities(this.character))
        },
        getNationUrl(nation) {
            return R.prop('url', getNationByName(nation))
        }
    }
}
</script>
