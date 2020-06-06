<template>
    <div class="container">
        <div class="w-1/2">
            <h2 class="subtitle">
                Erstelle deinen Charakter
            </h2>
            <v-form>
                <v-text-field v-model="character.name" name="name" label="Name" />
                <v-text-field v-model="character.age" name="age" type="number" :min="5" :max="200" label="Alter" />
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
                <v-text-field v-model="character.weight" name="weight" type="number" :min="40" :max="150" label="Gewicht" />
                <v-combobox name="haircolor" label="Haarfarbe" v-model="character.haircolor" :items="characterData.haircolors" />
                <v-combobox name="eyecolor" label="Augenfarbe" v-model="character.eyecolor" :items="characterData.eyecolors" />
                <v-combobox name="nationality" label="Nationalität" v-model="character.nationality" :items="nations" />
                <v-select name="birthcity" label="Geburtsort" v-model="character.birthcity" :items="cities" />
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
