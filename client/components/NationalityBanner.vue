<template>
    <div class="flex items-center">
        <v-img :src="banner" :max-width="size" class="mr-2" />
        {{ nation }}
    </div>
</template>

<script>
import { getNationByName } from '~/util'

export default {
    props: {
        nation: String,
        size: {
            type: Number,
            default: 32,
        }
    },
    computed: {
        banner() {
            return getNationByName(this.nation).banner
        }
    }
}
</script>

<style>

</style>

<v-img :src="item.banner" :width="32" class="mr-2" />
                                {{ item.name }}
