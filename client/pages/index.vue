<template>
    <div class="h-full">
        <div class="container my-8">
            <h2 class="text-2xl my-4 text-white">
                Athalon Charakter Datenbank
            </h2>
        </div>
        <div class="my-8 w-full bg-white shadow">
            <div class="container">
                miau
                {{ characters }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        characters: []
    }),
    async asyncData(context) {
        const characters = await context.$axios.get('/characters')
        return { characters }
    }
}
</script>
