import type Dependencies from '../dependencies'

export default (dependencies: ReturnType<typeof Dependencies>) => {
    const login = async (username: String, password: String) => {
        return await dependencies.config.forumClient.post('api.php', {
            username,
            password
        })
    }
    return {
        login
    }
}