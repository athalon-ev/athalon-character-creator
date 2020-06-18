<template>
    <div class="skill-skills my-4 bg-gray-100 rounded">
        <h3 class="bg-gray-200 pr-2 rounded font-bold justify-between uppercase flex items-center" :class="color">
            <div class="flex items-center">
                <v-btn text :disabled="!canDecrement" @click="value.attribute -= 5">
                    <v-icon :class="color">
                        mdi-arrow-down-bold
                    </v-icon>
                </v-btn>
                {{ value.attribute }}
                <v-btn text :disabled="!canIncrement" @click="value.attribute += 5">
                    <v-icon :class="color">
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
            <v-btn x-small @click="addSkill">
                <v-icon class="text-white">mdi-playlist-plus</v-icon> Neue Fertigkeit
            </v-btn>
        </h3>
        <div class="flex" :class="color">
            <div class="w-32 ml-4" />
        </div>
        <div v-for="skill in value.skills" :key="skill.name" class="flex items-center">
            <div class="w-32 ml-4" />
            <v-text-field v-if="!skill.custom" class="ml-1 mr-4 w-1/4" dense v-model="skill.name" type="string" disabled />
            <v-combobox v-else v-model="skill.name" :items="[]" dense class="ml-1 mr-4 w-1/4" />
            <v-text-field class="mr-4 w-16" dense v-model="skill.points" type="number" />
            <span class="mb-3 mr-2 text-gray-600">+</span>
            <v-text-field class="mr-4 w-16" disabled dense :value="parseInt(skill.basePoints)" />
            <v-tooltip top v-if="bonusMalus">
                <template v-slot:activator="{ on, attrs }">
                    <div class="mb-3 text-sm font-normal" v-bind="attrs" v-on="on" :class="bonusMalus > 0 ? 'text-green-400' : 'text-red-400'">
                        ( {{ bonusMalusText }} )
                    </div>
                </template>
                {{ bonusMalus > 0 ? 'Bonus' : 'Malus' }} für alle Fähigkeiten im Bereich {{ name }}
            </v-tooltip>
            <span class="mb-3 mx-2 text-gray-600">=</span>
            <v-text-field class="mr-4 w-16" disabled dense :value="skill.basePoints + parseInt(skill.points || 0) + bonusMalus" />
            <v-btn x-small fab @click="removeSkill(skill)" v-if="skill.custom">
                <v-icon small class="text-white">mdi-playlist-remove</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import * as R from 'ramda'
const between = (min, max) => R.both(R.gte(R.__, min), R.lte(R.__, max))
export default {
    props: {
        value: Object,
        all: Object,
        name: String,
        color: String,
    },
    computed: {
        bonusMalus() {
            return R.cond([
                [between(1, 9), () => -20],
                [between(10, 19), () => -15],
                [between(20, 29), () => -10],
                [between(30, 39), () => -5],
                [between(40, 59), () => 0],
                [between(60, 69), () => 5],
                [between(70, 79), () => 10],
                [between(80, 89), () => 15],
                [between(90, 99), () => 20],
            ])(this.value.attribute)
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
            return this.usedSkillpoints < 250 && this.value.attribute < 65
        },
        canDecrement() {
            return this.usedSkillpoints > 0 && this.value.attribute > 10
        },
    },
    methods: {
        addSkill() {
            this.value.skills.push({
                name: '',
                custom: true,
                points: 0,
                basePoints: 0,
            })
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

<style lang="stylus" scoped>
.skill-skills
    .v-btn
        color inherit !important
    .v-input
        flex 0 0 auto
</style>
