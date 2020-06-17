<template>
    <v-app class="h-full">
        <v-app-bar
            color="primary"
            dense
            dark
        >
            <div>
                <v-img width="100" src="http://5.9.51.136/wp-content/uploads/2020/02/Athalon_Schriftzug2020_HoheAufl%C3%B6sung.png" />
            </div>
            <v-toolbar-title>Charakter Erstellung</v-toolbar-title>
            <v-spacer />
        </v-app-bar>
        <nuxt />
        <link href="https://fonts.googleapis.com/css2?family=Marck+Script&display=swap" rel="stylesheet">
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    </v-app>
</template>

<style>
.v-toolbar {
    flex: 0 0 auto;
}
html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}
</style>
