<template>
    <div class="flex h-full">
        <div class="flex flex-column h-full w-16 ">
            <div class="p-2 bg-blue-400 flex-grow">Mau</div>
            <div class="p-2 bg-blue-400 flex-grow">Mau</div>
            <div class="p-2 bg-blue-400 flex-grow">Mau</div>
            <div class="p-2 bg-blue-400 flex-grow">Mau</div>
        </div>
        <div class="container mx-auto">
            <div class="w-2/3 mx-auto">
                <h2 class="text-xl my-4 text-white">
                    Erstelle deinen Charakter
                </h2>
                <v-form class="shadow bg-white rounded relative p-4">
                    <v-btn color="primary" outlined @click="randomize" class="top-0 right-0 absolute m-4">
                        <v-icon class="lg:mr-2">
                            mdi-dice-6
                        </v-icon>
                        <span class="hidden lg:block">Lass den Zufall entscheiden</span>
                    </v-btn>
                    <v-text-field v-model="character.name" name="name" label="Name" class="sm:w-1/2" />
                    <v-text-field v-model="character.minecraftName" name="minecraft-name" label="Minecraft Name" class="sm:w-1/2" />
                    <h2 class="text-xl font-bold">
                        Äußerliche Erscheinung
                    </h2>
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
                    <h2 class="text-xl font-bold">
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
                    <h2 class="text-xl font-bold">
                        Persönliches
                    </h2>
                    <v-textarea label="Angewohnheiten" :rows="2" />
                    <v-textarea label="Weltanschauung" :rows="2" />
                    <v-textarea label="Ängste und Phobien" :rows="2" />
                    <v-textarea label="Weltanschauung" :rows="2" />
                    <h2 class="text-xl font-bold">
                        Vergangenheit
                    </h2>
                    <v-textarea label="Profession vor Neu Corethon" :rows="2" />
                    <v-textarea label="Familie und Verwandtschaft" :rows="2" />
                    <v-textarea label="Warum hast du die Heimat verlassen?" :rows="2" />
                    <v-textarea label="Was hast du zurück gelassen?" :rows="2" />
                    <v-textarea label="Was möchtest du erreichen?" :rows="2" />
                    <h2 class="text-xl font-bold">
                        Charakter
                    </h2>
                    Stärke
                    Konstitution
                    Geschick
                    Intelligenz
                    Geist
                    Trefferpunkte
                    Stabilität
                    Staturbonus
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
import * as R from 'ramda'
import characterData from '~/character-data'
const randomItem = list => list[Math.random() * list.length | 0]
const getNationByName = name => R.find(R.propEq('name', name), characterData.nations)
const availableCities = character => R.prop('cities', getNationByName(character.nationality))
const randomFromRange = (min, max) => (min + Math.random() * (max - min))
export default {
    components: {
        // Logo
    },
    data: () => ({
        section: 'character',
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
        },
    }),
    computed: {
        cities() {
            return availableCities(this.character)
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

<style>
    #app {
        background-image: url(https://board.athalon.net/images/revolution/bg.jpeg);
        background-attachment: fixed
    }
</style>
