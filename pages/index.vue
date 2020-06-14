<template>
    <div class="flex h-full">
        <div class="container mx-auto">
            <div class="w-4/5 mx-auto">
                <h2 class="text-xl my-4 text-white">
                    Erstelle deinen Charakter
                </h2>
                <CharacterEditor />
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
}
</script>

<style>
    #app {
        background-image: url(https://board.athalon.net/images/revolution/bg.jpeg);
        background-attachment: fixed
    }
</style>
