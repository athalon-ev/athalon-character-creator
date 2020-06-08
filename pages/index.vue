<template>
    <div class="container">
        <div class="w-2/3">
            <h2 class="subtitle">
                Erstelle deinen Charakter
            </h2>
            <v-form class="shadow bg-white p-4 rounded">
                <v-text-field v-model="character.name" name="name" label="Name" />
                <h2 class="text-xl font-bold">
                    Äußerliche Erscheinung
                </h2>
                <p class="text-gray-700">
                    Mit den Einstellungen kannst du dein Erscheinungsbild verfeinern, wie willst du auf andere wirken?
                </p>
                <div class="flex justify-between">
                    <div class="w-1/2 pr-4">
                        <v-text-field v-model="character.age" name="age" type="number" :min="5" :max="200" label="Alter" suffix="Jahre" />
                        <v-slider
                            v-model="character.size"
                            vertical name="height" label="Größe"
                            :min="20" :max="250"
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
                <h2 class="text-xl font-bold">
                    Herkunft
                </h2>
                <p class="text-gray-700">
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
                <v-textarea
                    label="Äußerliche Erscheinung"
                />
                Äußerliche Erscheinung
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
            <v-btn color="primary" @click="randomize">
                <v-icon class="mr-2">
                    mdi-dice-6
                </v-icon>
                Lass den Zufall entscheiden
            </v-btn>
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
            this.character.age = randomFromRange(14, 100).toFixed(0)
            this.character.haircolor = randomItem(characterData.haircolors)
            this.character.eyecolor = randomItem(characterData.eyecolors)
            this.character.nationality = randomItem(this.nations)
            this.character.birthcity = randomItem(availableCities(this.character))
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
