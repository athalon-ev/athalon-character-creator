<template>
    <div class="h-full">
        <div class="container my-8">
            <h2 class="text-2xl m-4 text-white">
                {{ isMe ? 'Deine Charaktäre' : `Charaktäre von ${account.username}` }}
            </h2>
        </div>
        <div class="my-8 w-full bg-gray-200 shadow">
            <div class="container flex flex-wrap">
                <div class="p-4 w-1/3">
                    <NewCharacterCard />
                </div>
                <CharacterCard v-for="character in characters" :key="character.id" :character="character" class="w-1/3" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import NewCharacterCard from '~/components/NewCharacterCard'
import CharacterCard from '~/components/CharacterCard'

export default {
    components: {
        CharacterCard,
        NewCharacterCard,
    },
    async asyncData(context) {
        const [characters, account] = await Promise.all([
            context.$api.getCharacters({ limit: 0, offset: 0, filter: `accountId=${context.route.params.id}` }),
            context.$api.getAccount(context.route.params.id),
        ])
        return { characters, account, offset: 0 }
    },
    data: () => ({
        characters: [],
        account: null,
        limit: 0,
        offset: 0,
    }),
    computed: {
        ...mapState(['user']),
        isMe() {
            if (!this.user) return false
            return this.$route.params.id == this.user.id
        }
    },
    methods: {
        // async loadMore() {
        //     this.offset += 2
        //     this.characters = [...this.characters, ...await this.$api.getCharacters({ limit: 10, offset: this.offset })]
        // },
        async deleteCharacter(id) {
            await this.$axios.delete(`characters/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.user.token}`
                }
            })
        }
    },
}
</script>
