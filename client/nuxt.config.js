
export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    server: {
        host: '0.0.0.0'
    },
    head: {
        title: 'Athalon Character Datenbank',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.png' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        '~/assets/css/main.styl'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/sticky.client',
        '~/plugins/withBase',
        '~/plugins/api',
    ],
    publicRuntimeConfig: {
        // baseURL: process.env.SERVER_URL,
        axios: {
            baseURL: process.env.SERVER_URL || 'https://character.athalon.de/api/'
        }
    },
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        'cookie-universal-nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: 'https://character.athalon.de/api/'
    },
    vuetify: {
        theme: {
            themes: {
                light: {
                    primary: '#303E7A'
                }
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
