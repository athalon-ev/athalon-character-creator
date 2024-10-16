/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
    theme: {
        extend: {
            textShadow: {
                'lg-outline': '0 0 1px rgb(0 0 0 / 70%), 3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)1px 1px 5px rgb(33 34 43 / 20%)',
            }
        },
    },
    variants: {},
    plugins: [
        require('tailwindcss-textshadow'),
        require('tailwind-css-variables')({
            colors: 'color',
            screens: false,
            fontFamily: false,
            fontSize: false,
            fontWeight: false,
            lineHeight: false,
            letterSpacing: false,
            backgroundSize: false,
            borderWidth: false,
            borderRadius: false,
            width: false,
            height: false,
            minWidth: false,
            minHeight: false,
            maxWidth: false,
            maxHeight: false,
            padding: false,
            margin: false,
            boxShadow: false,
            zIndex: false,
            opacity: 'opacity',
        }, {})
    ],
    purge: [
        'pages/**/*.vue',
        'components/**/*.vue',
        'layouts/**/*.vue',
        'plugins/**/*.js',
        'nuxt.config.js'
    ],
}
