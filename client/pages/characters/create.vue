<template>
    <div class="flex h-full">
        <div class="container mx-auto">
            <div class="w-4/5 mx-auto">
                <h2 class="text-xl my-4 text-white flex justify-between items-center">
                    Erstelle deinen Charakter
                    <div class="bg-white rounded px-4">
                        <v-switch label="Sandbox Modus" v-model="masterMode" />
                    </div>
                </h2>
                <CharacterEditor v-bind="settings" />
            </div>
        </div>
    </div>
</template>

<script>
import CharacterEditor from '~/components/CharacterEditor'
export default {
    components: {
        CharacterEditor
    },
    head() {
        return {
            title: 'Erstelle einen neuen Charakter'
        }
    },
    data: () => ({
        masterMode: false,
    }),
    computed: {
        settings() {
            return this.masterMode ? {
                availableSkillpoints: 2000,
                availableAttributepoints: 500,
                attributeUpperbound: 100,
                skillUpperbound: 100,
            } : {
                availableSkillpoints: 250,
                availableAttributepoints: 250,
                attributeUpperbound: 65,
                skillUpperbound: 55,
            }
        }
    }
}
</script>
