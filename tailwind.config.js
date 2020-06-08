/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
    theme: {},
    variants: {},
    plugins: [],
    purge: [
        'pages/**/*.vue',
        'components/**/*.vue',
        'layouts/**/*.vue',
        'plugins/**/*.js',
        'nuxt.config.js'
    ],
}
