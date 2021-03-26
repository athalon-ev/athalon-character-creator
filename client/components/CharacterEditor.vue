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
            <v-tab v-if="!isNew">
                Kleiderschrank
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
                Speichern
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item class="p-4">
                <v-alert v-if="!user && isNew" type="warning" :value="true">
                    <b>Achtung!</b> Aktuell benötigst du einen <a class="font-bold" href="https://board.athalon.de/member.php?action=register">Athalon Forenaccount</a> um den Charakter abspeichern zu können.<br>
                    Registriere dich oder logge dich zuerst ein.
                </v-alert>
                <div class="flex justify-end w-full">
                    <v-btn v-if="isNew" class="self-end" color="primary" outlined @click="randomize">
                        <v-icon class="lg:mr-2">
                            mdi-dice-6
                        </v-icon>
                        <span class="hidden lg:block">Lass den Zufall entscheiden</span>
                    </v-btn>
                </div>
                <v-text-field v-model="character.name" name="name" label="Name" class="sm:w-1/2" />
                <v-text-field v-model="character.minecraftName" name="minecraft-name" label="Minecraft Name" class="sm:w-1/2" />
                <p class="text-gray-700">
                    Hiermit kannst du dein Erscheinungsbild verfeinern, wie willst du auf andere wirken?
                </p>
                <div class="sm:flex my-8">
                    <div class="sm:w-1/6 pr-4">
                        <MinecraftSkinImage :name="character.minecraftName" />
                        <div class="text-sm mt-2">
                            <v-icon v-if="isNew" class="text-blue-400">mdi-information</v-icon>
                            <span v-if="isNew">
                                Den Skin kannst du nach der Erstellung ändern
                            </span>
                            <span v-else>
                                <v-btn color="primary" small @click="tab++">Skin bearbeiten</v-btn>
                            </span>
                        </div>
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
                <v-textarea v-model="character.physical" label="Äußerliche Erscheinung" placeholder="Alltagskleidung, Hautton, Narben, Auffälligkeiten" :rows="3" />
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
                        <v-img width="40vw" src="http://wiki.athalon.net/images/e/e7/Le%C3%A4ndrien_Politisch_Wiki_2020_2.png" />
                    </v-tooltip>
                    Die Herkunft bestimmt deinen Wortschatz und auch deine Religion und Kultur wie Bräuche
                </p>
                <div class="flex justify-between">
                    <div class="sm:w-1/2 pr-4">
                        <v-select name="nationality" label="Nationalität" v-model="character.nationality" item-value="name" :items="nations">
                            <NationalityBanner slot="item" slot-scope="{ item }" :nation="item.name" />
                            <NationalityBanner slot="selection" slot-scope="{ item }" :nation="item.name" />
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
            <v-tab-item v-if="!isNew" class="p-4 bg-gray-200">
                <h3 class="text-xl font-bold mb-4">Aktueller Kleiderschrank</h3>
                <div class="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div class="flex items-center flex-column bg-white shadow rounded p-4 text-center">
                        <MinecraftSkinImage class="h-64 w-32" :name="character.minecraftName" />
                        <div>Aktueller Minecraft Skin</div>
                    </div>
                    <div
                        v-for="skin in skins"
                        :class="{
                            'bg-blue-600 text-white': editSkin && skin.id == editSkin.id,
                            'bg-green-600 text-white skin-active': skin.id == character.activeSkin,
                        }"
                        class="cursor-pointer transition duration-150 flex items-center justify-between flex-column bg-white hover:text-white hover:bg-blue-600 shadow rounded text-center break-all overflow-hidden"
                    >
                        <div class="p-4 flex flex-column justify-between" @click="editSkin = { ...skin, base64: '', file: null }">
                            <img :src="$withBase(`images/${skin.renderedSkinPath}`)" class="h-64 w-32" alt="">
                            <div>{{ skin.name.slice(0, 35) }}</div>
                        </div>
                        <div class="flex w-full">
                            <v-tooltip bottom v-if="!(editSkin && editSkin.id == skin.id)">
                                <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on" @click="editSkin = skin" v-ripple class="w-full cursor-pointer bg-white text-black py-2 hover:bg-blue-700 text-blue-600 hover:text-white">
                                        <v-icon>mdi-human-edit</v-icon>
                                    </div>
                                </template>
                                Skin bearbeiten
                            </v-tooltip>
                            <v-tooltip bottom v-if="skin.id != character.activeSkin">
                                <template v-slot:activator="{ on, attrs }">
                                    <div @click="activateSkin(skin)" v-bind="attrs" v-on="on" v-ripple class="w-full cursor-pointer bg-white text-black py-2 hover:bg-green-600 text-blue-600 hover:text-white">
                                        <v-icon>mdi-human-greeting</v-icon>
                                    </div>
                                </template>
                                Für Athalon Auswählen
                            </v-tooltip>
                            <v-tooltip bottom v-if="false">
                                <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on" v-ripple class="w-full cursor-pointer bg-white text-black py-2 hover:bg-green-600 text-blue-600 hover:text-white">
                                        <v-icon>mdi-cube-send</v-icon>
                                    </div>
                                </template>
                                Auf Minecraft hochladen
                            </v-tooltip>
                            <v-tooltip bottom v-if="skin.id != character.activeSkin">
                                <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on" v-ripple class="w-full cursor-pointer bg-white text-black py-2 hover:bg-red-600 text-blue-600 hover:text-white">
                                        <v-icon>mdi-account-remove</v-icon>
                                    </div>
                                </template>
                                Löschen
                            </v-tooltip>
                        </div>
                    </div>
                </div>
                <v-form v-if="editSkin" class="my-4 bg-white shadow rounded p-4 text-center">
                    <h3 class="text-xl font-bold text-left mb-4">Skin <span class="text-blue-600">{{ editSkin.name }}</span> bearbeiten</h3>
                    <v-file-input
                        v-model="editSkin.file"
                        @change="updateSkin(editSkin)"
                        accept="image/png"
                        label="Minecraft kompatiblen Skin im png Format auswählen"
                        outlined
                        color="primary"
                        prepend-icon="mdi-account-plus-outline"
                    >
                        <template v-slot:selection="{ text }">
                            <v-chip
                                color="primary"
                                dark
                                label
                                small
                            >
                                {{ text }}
                            </v-chip>
                        </template>
                    </v-file-input>
                    <v-text-field v-model="editSkin.name" name="name" label="Skin Name" :counter="35" :rules="[v => v.length <= 35 || 'Maximum 35 Zeichen']" />
                    <div class="text-left font-bold">
                        Skin Vorschau
                        <div class="flex">
                            <div class="p-2 checkerboard-bg shadow rounded">
                                <img :src="editSkin.base64 || $withBase(`images/${editSkin.originalSkinPath}`)" class="w-48" alt="">
                            </div>
                        </div>
                    </div>
                    <v-btn color="primary" :disabled="editSkin.name.length > 35" @click="uploadSkin(editSkin)">
                        <v-icon class="block mr-2">
                            mdi-account-edit-outline
                        </v-icon>
                        <div>Skin abspeichern</div>
                    </v-btn>
                </v-form>
                <v-form class="my-4 bg-white shadow rounded p-4 text-center">
                    <h3 class="text-xl font-bold text-left mb-4">Neuen Skin hochladen</h3>
                    <v-file-input
                        v-model="newSkin.file"
                        @change="updateSkin(newSkin)"
                        accept="image/png"
                        label="Minecraft kompatiblen Skin im png Format auswählen"
                        outlined
                        color="primary"
                        prepend-icon="mdi-account-plus-outline"
                    >
                        <template v-slot:selection="{ text }">
                            <v-chip
                                color="primary"
                                dark
                                label
                                small
                            >
                                {{ text }}
                            </v-chip>
                        </template>
                    </v-file-input>
                    <v-text-field v-model="newSkin.name" name="name" label="Skin Name" :counter="35" :rules="[v => v.length <= 35 || 'Maximum 35 Zeichen']" />
                    <div v-if="newSkin.base64" class="text-left font-bold">
                        Skin Vorschau
                        <div class="flex">
                            <div class="p-2 checkerboard-bg shadow rounded">
                                <img :src="newSkin.base64" class="w-48" alt="">
                            </div>
                        </div>
                    </div>
                    <v-btn color="primary" :disabled="!(newSkin.file && newSkin.name) || newSkin.name.length > 35" @click="uploadSkin(newSkin)">
                        <v-icon class="block mr-2">
                            mdi-account-plus-outline
                        </v-icon>
                        <div>Neuen Skin hochladen</div>
                    </v-btn>
                </v-form>
            </v-tab-item>
            <v-tab-item class="p-4">
                <v-textarea v-model="character.ideology" label="Persönlichkeit und Weltanschauung" :rows="5" />
                <p class="text-gray-600">
                    Beispiele: Patriotisch, Religiös, Humanistisch, Optimistisch, Nihilistisch, Esoterisch, Cholerisch, Sanguinisch, Phlegmatisch, Melancholisch
                </p>
                <v-textarea v-model="character.habits" label="Eigenschaften und Angewohnheiten" :rows="5" />
                <p class="text-gray-600">
                    Beispiele: Überpünktlich, Penibel, Vergesslich, Dramatisch, Geizig, Chaotisch, Putzfimmel, Alkoholiker, Tagträumer, Raucher, Hutträger
                </p>
                <v-textarea v-model="character.fears" label="Ängste und Abneigungen" :rows="5" />
                <p class="text-gray-600">
                    Beispiele: Höhenangst, Feuer, Dunkelheit, Einsamkeit, Spinnen, Wasser, Karotten, Hunde, Platzangst, Armut, Frauen, Magie, Hexen
                </p>
            </v-tab-item>
            <v-tab-item class="p-4">
                <v-textarea v-model="character.job" label="Profession vor Neu Corethon" :rows="3" placeholder="Hintergrund, Schicksale, Berufsstand" />
                <v-textarea v-model="character.family" label="Familie und Verwandtschaft" :rows="4" placeholder="Name, Beruf und der Verbleib deiner Eltern und anderen Verwandten: Lebendig, Verschollen oder Tot?" />
                <v-textarea v-model="character.whyLeft" label="Warum hast du die Heimat verlassen?" :rows="4" placeholder="Motivation für die Abreise nach Neu Corethon in die Unbekannten Lande" />
                <v-textarea v-model="character.leftWhat" label="Was hast du zurück gelassen?" :rows="2" placeholder="Familienmitglieder, Nahestehende, Persönliche Gegenstände, Arbeitsstätte, Haustiere" />
                <v-textarea v-model="character.goals" label="Was möchtest du erreichen?" :rows="5" placeholder="Gesteckte Ziele, Hoffnungen und Antrieb für weiteren Lebensweg" />
            </v-tab-item>
            <v-tab-item class="p-4">
                <p>
                    <b>Attribute</b> bestimmen deine generelle Kondition.
                    <b>Fertigkeiten</b> befähigen deinen Charakter in bestimmten Situationen sein Wissen und seine Erfahrung einzubringen.
                    Die <b>Attribute</b> wirken sich sich <span class="text-green-400">positiv</span> oder <span class="text-red-400">negativ</span> auf deine <b>Fertigkeiten</b> aus.
                </p>
                <v-btn color="primary" class="mb-4" href="https://board.athalon.net/showthread.php?tid=50" target="_blank">
                    Mehr Informationen
                    <v-icon class="ml-2" small>
                        mdi-open-in-new
                    </v-icon>
                </v-btn>
                <h4 class="font-bold text-xl">
                    Errechnete Werte
                </h4>
                <div class="flex">
                    <div class="w-32">
                        Trefferpunkte
                    </div>
                    {{ healthpoints }}
                </div>
                <div class="flex">
                    <div class="w-32">
                        Stabilitätspunkte
                    </div>
                    {{ character.skillpoints.mind.attribute }}
                </div>
                <div class="flex">
                    <div class="w-32">
                        Staturbonus
                    </div>
                    <div :class="weaponBonusMalus >= 0 ? 'text-green-400' : 'text-red-400'">
                        {{ weaponBonusMalus }}
                    </div>
                </div>
                <div v-sticky sticky-offset="{top: 50}" class="bg-white py-2">
                    <v-progress-linear
                        class="rounded-full mb-4"
                        color="primary"
                        height="25"
                        :value="usedAttributepointsPercentage"
                    >
                        <div class="text-white">
                            {{ usedAttributepoints }} / {{ availableAttributepoints }} Attributspunkte
                        </div>
                    </v-progress-linear>
                    <v-progress-linear
                        class="rounded-full"
                        color="primary"
                        height="25"
                        :value="usedSkillpointsPercentage"
                    >
                        <div class="text-white">
                            {{ usedSkillpoints }} / {{ availableSkillpoints }} Fertigkeitspunkte
                        </div>
                    </v-progress-linear>
                </div>
                <SkillAttributes
                    :all="character.skillpoints"
                    :used-skillpoints="usedSkillpoints"
                    :used-attributepoints="usedAttributepoints"
                    v-model="character.skillpoints.strength"
                    name="Stärke" color="-red-"
                    v-bind="$props"
                />
                <SkillAttributes
                    :all="character.skillpoints"
                    :used-skillpoints="usedSkillpoints"
                    :used-attributepoints="usedAttributepoints"
                    v-model="character.skillpoints.constitution"
                    name="Konstitution" color="-orange-"
                    v-bind="$props"
                />
                <SkillAttributes
                    :all="character.skillpoints"
                    :used-skillpoints="usedSkillpoints"
                    :used-attributepoints="usedAttributepoints"
                    v-model="character.skillpoints.aptness"
                    name="Geschick" color="-green-"
                    v-bind="$props"
                />
                <SkillAttributes
                    :all="character.skillpoints"
                    :used-skillpoints="usedSkillpoints"
                    :used-attributepoints="usedAttributepoints"
                    v-model="character.skillpoints.intelligence"
                    name="Intelligenz" color="-blue-"
                    v-bind="$props"
                />
                <SkillAttributes
                    :all="character.skillpoints"
                    :used-skillpoints="usedSkillpoints"
                    :used-attributepoints="usedAttributepoints"
                    v-model="character.skillpoints.mind"
                    name="Geist" color="-purple-"
                    v-bind="$props"
                />
            </v-tab-item>
            <v-tab-item class="p-4 py-16 flex flex-wrap justify-center">
                <div class="lg:w-1/2">
                    <p class="p-4 shadow rounded bg-gray-200">
                        Ihr wollt also mit dem Schiff nach <b>Neu Corethon</b> reisen, Hmmm?<br>
                        Wie war der Name nochmal? <b class="text-blue-600">{{ character.name }}</b>? Na dann wollen wir mal sehen.<br>
                        <em class="my-1 block text-gray-600">*Der Aufseher des Hafens fährt mit seinen rauen Fingern in einem großen ledergebundenen Buch die Seiten entlang*</em><br>
                        Ah! Hier haben wir {{ character.gender == 'Männlich' ? 'ihn' : 'sie' }}.<br>
                        <em class="my-1 block text-gray-600">*Gemächlich nimmt der Grauhaarige den mächtigen Stempel zur Hand und presst damit einmal im Buch und dann auf dem Reisedokument sein Symbol auf*</em><br>
                        Es ist alles für euch vorbereitet. Dann wünsche ich gute Fahrt!<br>
                        <em class="my-1 block text-gray-600">*Er reicht dir die Papiere und winkt dir nach*</em><br>
                    </p>
                </div>
                <div class="w-full flex flex-wrap justify-center">
                    <p class="text-4xl w-full font-bold my-8 text-center">
                        Bereit für das Abenteuer?
                    </p>
                    <v-btn class="mx-2" v-if="!isNew" color="primary" @click="exportCharacter">
                        Charakterdaten Kopieren
                    </v-btn>
                    <v-btn class="mx-2" color="primary" @click="saveCharacter">
                        Charakter {{ isNew ? 'erstellen' : 'speichern' }}
                    </v-btn>
                    <v-btn class="mx-2" v-if="id && !isNew" color="error" @click="deleteCharacter">
                        Charakter löschen
                    </v-btn>
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
import NationalityBanner from './NationalityBanner'
import characterData from '~/character-data'
import { randomItem, getNationByName, availableCities, randomFromRange, exportCharacter, getWeaponBonusMalus, getHealthpoints, emptyCharacter } from '~/util'

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

const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

export default {
    components: { SkillAttributes, MinecraftSkinImage, NationalityBanner },
    props: {
        isNew: {
            type: Boolean,
            default: true,
        },
        id: {
            type: [String, Boolean],
            default: null,
        },
        availableSkillpoints: {
            type: Number,
            default: 250,
        },
        availableAttributepoints: {
            type: Number,
            default: 250,
        },
        attributeUpperbound: {
            type: Number,
            default: 65,
        },
        skillUpperbound: {
            type: Number,
            default: 65,
        },
        character: {
            type: Object,
            default: emptyCharacter
        },
    },
    data: () => ({
        skins: [],
        editSkin: null,
        newSkin: {
            file: null,
            name: '',
            base64: null,
        },
        section: 'character',
        tab: 'Hauptdaten',
        characterData,
        nations: characterData.nations,
        getWeaponBonusMalus,
    }),
    computed: {
        cities() {
            return availableCities(this.character)
        },
        usedAttributepointsPercentage() {
            return 100 / this.availableAttributepoints * this.usedAttributepoints
        },
        usedAttributepoints() {
            return R.pipe(
                R.map(R.prop('attribute')),
                R.values,
                R.sum,
            )(this.character.skillpoints)
        },
        usedSkillpointsPercentage() {
            return 100 / this.availableSkillpoints * this.usedSkillpoints
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
        weaponBonusMalus() {
            return getWeaponBonusMalus(this.character.skillpoints.strength.attribute)
        },
        healthpoints() {
            return getHealthpoints(this.character.skillpoints.constitution.attribute)
        },
        user() {
            return this.$cookies.get('user')
        }
    },
    async created() {
        this.skins = (await this.$axios.get(`/characters/${this.id}/skins`)).data
    },
    methods: {
        async updateSkin(newSkin) {
            if (newSkin.file && !newSkin.id) newSkin.name = newSkin.file.name.replace(/\.png/i, '').replace(/-/g, ' ')
            if (newSkin.file) this.$set(newSkin, 'base64', await fileToBase64(newSkin.file))
            else newSkin.base64 = ''
        },
        async activateSkin(skin) {
            this.character.activeSkin = skin.id
            await this.$axios.put(`/characters/${this.id}`, { activeSkin: skin.id }, this.getAuthHeaders())
        },
        async uploadSkin(skin) {
            const formData = new FormData()
            formData.append('name', skin.name)
            skin.file && formData.append('skin', skin.file)
            const uploadedSkin = skin.id
                ? (await this.$axios.put(`/characters/${this.id}/skins/${skin.id}`, formData, this.getAuthHeaders())).data
                : (await this.$axios.post(`/characters/${this.id}/skins`, formData, this.getAuthHeaders())).data
            this.newSkin = {
                name: '',
                file: null,
                base64: null,
            }
            this.skins = skin.id ? this.skins : [...this.skins, uploadedSkin]
        },
        exportCharacter() {
            copyToClipboard(exportCharacter(this.character, this.skillUpperbound))
        },
        getAuthHeaders() {
            const user = this.$cookies.get('user')
            if (!user) return
            return {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        },
        async saveCharacter() {
            this.loading = true
            try {
                const { data: id } = this.id
                    ? await this.$axios.put(`/characters/${this.id}`, this.character, this.getAuthHeaders())
                    : await this.$axios.post('/characters', this.character, this.getAuthHeaders())
                this.$router.push(`/characters/${id}`)
            } catch (error) {

            }
            this.loading = false
        },
        async deleteCharacter() {
            if (!this.id) return
            this.loading = true
            try {
                await this.$axios.delete(`/characters/${this.id}`, this.getAuthHeaders())
                this.$router.push('/')
            } catch (error) {

            }
            this.loading = false
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

<style lang="stylus">
// .skin-active
//     transform scale(1.05)
</style>
