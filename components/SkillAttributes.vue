<template>
    <div class="skill-skills my-4 rounded" :class="`bg${color}100`">
        <h3 class="pr-2 rounded font-bold justify-between uppercase flex items-center" :class="`text${color}400 bg${color}200`">
            <div class="flex items-center">
                <v-btn text :disabled="!canDecrement" @click="changeAttribute(-5)">
                    <v-icon :class="`text${color}400`">
                        mdi-arrow-down-bold
                    </v-icon>
                </v-btn>
                {{ value.attribute }}
                <v-btn text :disabled="!canIncrement" @click="changeAttribute(5)">
                    <v-icon :class="`text${color}400`">
                        mdi-arrow-up-bold
                    </v-icon>
                </v-btn>
                {{ name }}
                <v-tooltip top v-if="bonusMalus">
                    <template v-slot:activator="{ on, attrs }">
                        <div class="ml-4 text-sm font-normal" v-bind="attrs" v-on="on" :class="bonusMalus > 0 ? 'text-green-400' : 'text-red-400'">
                            ( {{ bonusMalusText }} )
                        </div>
                    </template>
                    {{ bonusMalus > 0 ? 'Bonus' : 'Malus' }} für alle Fähigkeiten im Bereich {{ name }}
                </v-tooltip>
            </div>
        </h3>
        <div class="flex" :class="`text${color}400`">
            <div class="w-32 ml-4" />
        </div>
        // eslint-disable-next-line vue/no-use-v-if-with-v-for
        <div v-for="skill in value.skills" v-if="!skill.hidden" :key="skill.name" class="flex items-center py-1">
            <div class="w-32 mx-2 text-xs">
                {{ skill.category }}
            </div>
            <v-text-field hide-details v-if="!skill.custom" class="ml-1 mr-4 w-1/4" dense v-model="skill.name" type="string" disabled />
            <v-combobox hide-details v-else v-model="skill.name" :items="getCategories(skill.category)" dense class="ml-1 mr-4 w-1/4" />
            <v-text-field
                hide-details
                class="mr-4 w-16"
                solo dense v-model="skill.points" type="number"
                min="0" :max="skillUpperbound - (getSkillBasePoints(value.attribute, skill) + bonusMalus)"
                v-if="!skill.categories.length"
            />
            <span class="mt-1 mr-2 text-gray-600" v-if="!skill.categories.length">+</span>
            <v-text-field hide-details class="mr-4 w-16" disabled dense :value="getSkillBasePoints(value.attribute, skill)" />
            <v-tooltip top v-if="bonusMalus && !skill.categories.length">
                <template v-slot:activator="{ on, attrs }">
                    <div class="mt-1 text-sm font-normal" v-bind="attrs" v-on="on" :class="bonusMalus > 0 ? 'text-green-400' : 'text-red-400'">
                        ( {{ bonusMalusText }} )
                    </div>
                </template>
                {{ bonusMalus > 0 ? 'Bonus' : 'Malus' }} für alle Fähigkeiten im Bereich {{ name }}
            </v-tooltip>
            <span class="mt-1 mx-2 text-gray-600" v-if="!skill.categories.length">=</span>
            <v-text-field v-if="!skill.categories.length" hide-details class="mr-4 w-16" disabled dense :value="getBoundsSkillpointValue(skillUpperbound, value.attribute, skill)" />
            <v-btn x-small fab @click="removeSkill(skill)" v-if="skill.custom && skill.deletable">
                <v-icon small class="text-white">
                    mdi-playlist-remove
                </v-icon>
            </v-btn>
            <div :class="`text${color}400`" v-if="skill.categories.length">
                <v-btn x-small @click="addSkill(skill)">
                    <v-icon class="text-white">
                        mdi-playlist-plus
                    </v-icon> Neue Fertigkeit
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import * as R from 'ramda'
import { getAttributeBonusMalus, getSkillpointValue, getBoundsSkillpointValue, getSkillBasePoints } from '~/util'

export default {
    props: {
        value: Object,
        all: Object,
        name: String,
        color: String,
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
    },
    data: () => ({
        getSkillpointValue,
        getBoundsSkillpointValue,
        getSkillBasePoints,
    }),
    computed: {
        bonusMalus() {
            return getAttributeBonusMalus(this.value.attribute)
        },
        bonusMalusText() {
            return this.bonusMalus > 0 ? `+${this.bonusMalus}` : this.bonusMalus
        },
        usedSkillpoints() {
            return R.pipe(
                R.map(R.prop('attribute')),
                R.values,
                R.sum,
            )(this.all)
        },
        canIncrement() {
            return this.usedSkillpoints < this.availableSkillpoints && this.value.attribute < this.skillUpperbound
        },
        canDecrement() {
            return this.usedSkillpoints > 0 && this.value.attribute > 10
        },
    },
    methods: {
        changeAttribute(value) {
            this.value.attribute += value
            this.refreshSkills()
        },
        refreshSkills() {
            this.value.skills = R.map(skill => ({
                points: R.clamp(0, this.skillUpperbound - (getSkillBasePoints(this.value.attribute, skill) + this.bonusMalus), parseInt(skill.points)),
                ...skill
            }), this.value.skills)
        },
        getCategories(category) {
            return R.pipe(
                R.find(R.both(R.propEq('name', category), R.prop('categories'))),
                R.prop('categories'),
                R.filter(category => R.not(R.find(R.propEq('name', category), this.value.skills))),
            )(this.value.skills)
        },
        addSkill(skill) {
            this.value.skills = R.insert(
                R.findIndex(R.propEq('name', skill.name), this.value.skills) + 1,
                {
                    name: '',
                    custom: true,
                    points: 0,
                    basePoints: skill.basePoints,
                    categories: [],
                    category: skill.name,
                    deletable: true,
                },
                this.value.skills
            )
        },
        removeSkill({ name }) {
            this.value.skills = R.filter(R.complement(R.propEq('name', name)), this.value.skills)
        },
        increment() {
            this.value.attribute += 5
        },
        decrement() {
            this.value.attribute -= 5
        },
    }
}
</script>

<style lang="stylus">
.skill-skills
    .v-btn
        color inherit !important
    .v-input
        flex 0 0 auto
    .v-input--is-disabled input
        color rgba(0,0,0,.66) !important
</style>
