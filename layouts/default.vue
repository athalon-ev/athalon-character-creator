<template>
    <v-app class="h-full">
        <v-app-bar
            color="deep-purple accent-4"
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

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
