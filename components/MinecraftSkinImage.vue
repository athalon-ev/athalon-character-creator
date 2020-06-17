<template>
    <img :src="url">
</template>

<script>
import * as R from 'ramda'
import debounce from 'lodash.debounce'
const getUuidUrl = R.concat('https://api.minetools.eu/uuid/')
const getAvatarUrl = uuid => `https://crafatar.com/renders/body/${uuid}?overlay=true&scale=5`
const FALLBACK_UUID = '8667ba71b85a4004af54457a9734eed7'
export default {
    props: {
        name: String,
    },
    data: () => ({
        url: ''
    }),
    watch: {
        name: debounce(function() { this.getUrl() }, 800)
    },
    async created() {
        await this.getUrl()
    },
    methods: {
        async getUrl() {
            const { data: { id: uuid } } = await this.$axios.get(getUuidUrl(this.name))
            this.url = getAvatarUrl(uuid || FALLBACK_UUID)
        }
    }
}
</script>

<style>

</style>
