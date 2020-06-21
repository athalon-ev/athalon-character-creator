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
            <v-tab>
                Export
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
                <div class="sm:flex">
                    <div class="sm:w-1/6 pr-4">
                        <MinecraftSkinImage :name="character.minecraftName" />
                    </div>
                    <div class="sm:w-2/6 pr-4">
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
                    <div class="sm:w-2/6">
                        <v-combobox name="haircolor" label="Haarfarbe" v-model="character.haircolor" :items="characterData.haircolors" />
                        <v-combobox name="eyecolor" label="Augenfarbe" v-model="character.eyecolor" :items="characterData.eyecolors" />
                        <v-text-field v-model="character.weight" name="weight" type="number" :min="40" :max="150" label="Gewicht" suffix="kg" />
                        <p>Geschlecht</p>
                        <v-btn-toggle v-model="character.gender" dense>
                            <v-btn value="Weiblich">
                                <v-icon>mdi-gender-female</v-icon>
                                Weiblich
                            </v-btn>
                            <v-btn value="Männlich">
                                <v-icon>mdi-gender-male</v-icon>
                                Männlich
                            </v-btn>
                            <v-btn value="Divers">
                                <v-icon>mdi-gender-non-binary</v-icon>
                                Andere
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                </div>
                <v-textarea v-model="character.physical" label="Äußerliche Erscheinung" placeholder="Narben, Auffälligkeiten" :rows="2" />
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
                <v-textarea v-model="character.habits" label="Angewohnheiten" :rows="2" placeholder="Putzfimmel, Fingernägelkauer, Alkoholproblem, Tagträumer, Raucher, Hutträger..." />
                <v-textarea v-model="character.ideology" label="Weltanschauung" :rows="3" placeholder="Patriotisch, Humanistisch, Religiös, Optimistisch, Pessimistisch, Egoistisch, Esoterisch..." />
                <v-textarea v-model="character.fears" label="Ängste und Phobien" :rows="2" placeholder="Höhenangst, Feuer, Tod, Dunkelheit, Einsamkeit, Spinnen, Angst vor dem Versagen" />
            </v-tab-item>
            <v-tab-item class="p-4">
                <v-textarea v-model="character.job" label="Profession vor Neu Corethon" :rows="2" placeholder="Hintergrund, Schicksale, Berufsstand" />
                <v-textarea v-model="character.family" label="Familie und Verwandtschaft" :rows="4" placeholder="Name, Beruf und der Verbleib deiner Eltern und anderen Verwandten: Lebendig, Verschollen oder Tot?" />
                <v-textarea v-model="character.whyLeft" label="Warum hast du die Heimat verlassen?" :rows="3" placeholder="Motivation für die Abreise nach Neu Corethon in die Unbekannten Lande" />
                <v-textarea v-model="character.leftWhat" label="Was hast du zurück gelassen?" :rows="1" placeholder="Familienmitglieder, Nahestehende, Persönliche Gegenstände, Arbeitsstätte, Haustiere" />
                <v-textarea v-model="character.goals" label="Was möchtest du erreichen?" :rows="3" placeholder="Gesteckte Ziele, Hoffnungen und Antrieb für weiteren Lebensweg" />
            </v-tab-item>
            <v-tab-item class="p-4">
                <p>
                    <b>Attribute</b> bestimmen deine generelle Kondition.
                    <b>Fertigkeiten</b> befähigen deinen Charakter in bestimmten Situationen sein Wissen und seine Erfahrung einzubringen.
                    Die <b>Attribute</b> wirken sich sich <span class="text-green-400">positiv</span> oder <span class="text-red-400">negativ</span> auf deine <b>Fertigkeiten</b> aus.</p>
                <v-btn color="primary" class="mb-4" href="https://board.athalon.net/showthread.php?tid=50" target="_blank">
                    Mehr Informationen
                </v-btn>
                <v-progress-linear
                    class="rounded-full mb-4"
                    color="primary"
                    height="25"
                    :value="usedAttributepointsPercentage"
                >
                    <div class="text-white">
                        {{ usedAttributepoints }} / 250 Attributspunkte
                    </div>
                </v-progress-linear>
                <v-progress-linear
                    class="rounded-full"
                    color="primary"
                    height="25"
                    :value="usedSkillpointsPercentage"
                >
                    <div class="text-white">
                        {{ usedSkillpoints }} / 250 Fertigkeitspunkte
                    </div>
                </v-progress-linear>
                <SkillAttributes
                    :all="character.skillpoints"
                    v-model="character.skillpoints.strength"
                    name="Stärke" color="-red-"
                />
                <SkillAttributes
                    :all="character.skillpoints"
                    v-model="character.skillpoints.constitution"
                    name="Konstitution" color="-orange-"
                />
                <SkillAttributes
                    :all="character.skillpoints"
                    v-model="character.skillpoints.aptness"
                    name="Geschick" color="-green-"
                />
                <SkillAttributes
                    :all="character.skillpoints"
                    v-model="character.skillpoints.intelligence"
                    name="Intelligenz" color="-blue-"
                />
                <SkillAttributes
                    :all="character.skillpoints"
                    v-model="character.skillpoints.mind"
                    name="Geist" color="-purple-"
                />
                Trefferpunkte
                Stabilität
                Staturbonus
            </v-tab-item>
            <v-tab-item class="p-4 py-16 flex justify-between">
                <div class="text-center w-1/3">
                    <p class="text-4xl font-bold mb-4">
                        1.
                    </p>
                    <p>Wenn du dich noch nicht registriert hast, ist das jetzt der Zeitpunkt</p>
                    <p />
                    <v-btn color="primary" href="https://board.athalon.net/newthread.php?fid=16" target="_blank">
                        Bewerbung einreichen
                    </v-btn>
                </div>
                <div class="text-center w-1/3">
                    <p class="text-4xl font-bold mb-4">
                        2.
                    </p>
                    <p>Der Text für deinen Charakter wird beim Klick automatisch in die Zwischenablage kopiert</p>
                    <v-btn color="primary" @click="exportCharacter">
                        Charakterdaten Kopieren
                    </v-btn>
                </div>
                <div class="text-center w-1/3">
                    <p class="text-4xl font-bold mb-4">
                        3.
                    </p>
                    <p>Text mit <kbd>STRG+V</kbd> oder <kbd>CMD+V</kbd> einfügen und auf Absenden klicken - Fertig</p>
                </div>
            </v-tab-item>
        </v-tabs-items>
        <div class="sm:flex justify-between p-4">
            <v-btn color="primary" text class="self-end" v-if="tab > 0" @click="tab--">
                Voriger Schritt
            </v-btn>
            <div v-else />
            <v-btn color="primary" text class="self-end" v-if="tab < 4" @click="tab++">
                Nächster Schritt
            </v-btn>
        </div>
    </v-form>
</template>

<script>
import * as R from 'ramda'
import SkillAttributes from './SkillAttributes'
import MinecraftSkinImage from './MinecraftSkinImage'
import characterData from '~/character-data'
import { randomItem, getNationByName, availableCities, randomFromRange, exportCharacter } from '~/util'

const copyToClipboard = (str) => {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}

export default {
    components: { SkillAttributes, MinecraftSkinImage },
    data: () => ({
        section: 'character',
        tab: 'Hauptdaten',
        characterData,
        nations: characterData.nations,
        character: {
            name: '',
            minecraftName: '',
            gender: '',
            age: '',
            size: 170,
            weight: '',
            haircolor: '',
            eyecolor: '',
            nationality: '',
            birthcity: '',
            physical: '',
            habits: '',
            ideology: '',
            fears: '',
            job: '',
            family: '',
            whyLeft: '',
            leftWhat: '',
            goals: '',
            skillpoints: characterData.skillpoints
        },
    }),
    computed: {
        cities() {
            return availableCities(this.character)
        },
        usedAttributepointsPercentage() {
            return 100 / 250 * this.usedAttributepoints
        },
        usedAttributepoints() {
            return R.pipe(
                R.map(R.prop('attribute')),
                R.values,
                R.sum,
            )(this.character.skillpoints)
        },
        usedSkillpointsPercentage() {
            return 100 / 250 * this.usedSkillpoints
        },
        usedSkillpoints() {
            return R.pipe(
                R.map(R.prop('skills')),
                R.values,
                R.chain(R.identity),
                R.chain(R.prop('points')),
                R.sum,
            )(this.character.skillpoints)
        },
    },
    methods: {
        exportCharacter() {
            copyToClipboard(exportCharacter(this.character))
        },
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
