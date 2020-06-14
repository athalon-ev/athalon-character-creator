<template>
    <div>
        <h3 class="font-bold uppercase flex items-center" :class="color">
            <v-btn text>
                <v-icon :class="color">mdi-arrow-up-bold</v-icon>
            </v-btn>
            {{ value }}
            <v-btn text>
                <v-icon :class="color">mdi-arrow-down-bold</v-icon>
            </v-btn>
            {{ name }}
        </h3>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 50,
        },
        name: String,
        color: String,
    }
}
</script>

<style>

</style>
