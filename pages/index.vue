<template>
    <div class="container">
        <div class="w-2/3">
            <h2 class="text-xl my-4 text-white">
                Erstelle deinen Charakter
            </h2>
            <v-form class="shadow bg-white p-4 rounded relative">
                <v-btn color="primary" outlined @click="randomize" class="top-0 right-0 absolute m-4">
                    <v-icon class="mr-2">
                        mdi-dice-6
                    </v-icon>
                    Lass den Zufall entscheiden
                </v-btn>
                <v-text-field v-model="character.name" name="name" label="Name" class="w-1/2" />
                <h2 class="text-xl font-bold">
                    Äußerliche Erscheinung
                </h2>
                <p class="text-gray-700">
                    Hiermit kannst du dein Erscheinungsbild verfeinern, wie willst du auf andere wirken?
                </p>
                <div class="flex justify-between">
                    <div class="w-1/2 pr-4">
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
                    <div class="w-1/2">
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
                                @click="showWiki"
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
                    <div class="w-1/2 pr-4">
                        <v-select name="nationality" label="Nationalität" v-model="character.nationality" :items="nations" />
                    </div>
                    <div class="w-1/2">
                        <v-combobox name="birthcity" label="Geburtsort" v-model="character.birthcity" :items="cities" />
                    </div>
                </div>
                Angewohnheiten
                Weltanschauung
                Ängste und Phobien
                Profession vor Neu Corethon
                Eltern
                Andere Verwandte
                Warum hast du die Heimat verlassen?
                Was hast du zurück gelassen?
                Was möchtest du erreichen?

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
</template>

<script>
import * as R from 'ramda'
import characterData from '~/character-data'
const randomItem = list => list[Math.random() * list.length | 0]
const availableCities = character => R.prop(character.nationality, characterData.cities)
const randomFromRange = (min, max) => (min + Math.random() * (max - min))
export default {
    components: {
        // Logo
    },
    data: () => ({
        characterData,
        nations: R.keys(characterData.cities),
        character: {
            name: '',
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
            this.character.nationality = randomItem(this.nations)
            this.character.birthcity = randomItem(availableCities(this.character))
        },
        showWiki() {
            window.open('http://wiki.athalon.net/index.php/Hauptseite')
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
