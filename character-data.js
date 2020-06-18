const skillpoint = (name, basePoints) => ({
    name,
    basePoints,
    points: 0,
    custom: false,
})
export default {
    haircolors: [
        'Braun',
        'Hellbraun',
        'Dunkelbraun',
        'Blond',
        'Hellblond',
        'Dunkelblond',
        'Weißblond',
        'Grau',
        'Rot',
        'Schwarz'
    ],
    eyecolors: [
        'Braun',
        'Hellbraun',
        'Dunkelbraun',
        'Grau',
        'Rot',
        'Grün',
        'Hellgrün',
        'Dunkelgrün',
        'Smaragdgrün',
        'Blau',
        'Hellblau',
        'Himmelblau',
        'Eisblau',
        'Meerblau',
        'Türkis',
        'Violett',
        'Schwarz'
    ],
    nations: [
        {
            name: 'Tasperin',
            url: 'https://wiki.athalon.net/index.php/Kaiserliche_Monarchie_Tasperin',
            banner: 'http://wiki.athalon.net/images/4/4b/Wappen_Tasperin_2020.png',
            cities: [
                'Carviel',
                'Schwarzwasser',
                'Linnigh',
                'Auenthal',
                'Wolfshalm',
                'Faywell',
            ],
        },
        {
            name: 'Sorridia',
            url: 'https://wiki.athalon.net/index.php/K%C3%B6nigreich_Sorridia',
            banner: 'http://wiki.athalon.net/images/d/d5/Wappen_Sorridia2020.png',
            cities: [
                'Montebrillo',
                'Fortifa',
                'Jevasqèz',
                'Matoléz',
            ],
        },
        {
            name: 'AlBastra',
            url: 'https://wiki.athalon.net/index.php/Kalifat_Al%27bastra',
            banner: 'http://wiki.athalon.net/images/e/e4/Wappen_Kalifat6.png',
            cities: [
                'Mina Farah',
                "Waha'kandh",
                'Schattpur',
                'Kualtan',
            ],
        },
        {
            name: 'Silventrum',
            url: 'https://wiki.athalon.net/index.php/Vereinigte_Provinzen_von_Silventrum',
            banner: 'http://wiki.athalon.net/images/9/99/Wappen_Silventrum2020.png',
            cities: [
                'Zweibach',
                'Windwarden',
                'Steunvik',
                'Bischoffelden',
            ],
        },
        {
            name: 'Haldar',
            url: 'https://wiki.athalon.net/index.php/Haldarische_Stammesl%C3%A4nder',
            banner: 'http://wiki.athalon.net/images/9/9b/Wappen_Haldar_2020.png',
            cities: [
                'Nebelhafen',
                'Siefhof',
                'Talgrund',
                'Haflof',
            ],
        },
        {
            name: 'Patrien',
            url: 'https://wiki.athalon.net/index.php/K%C3%B6nigreich_Patrien',
            banner: 'http://wiki.athalon.net/images/4/4e/Wappen_Patrien.png',
            cities: [
                'Olapaso',
                'Corastella',
                'Vadez',
                'Figurréz',
            ],
        },
        {
            name: 'Fallice',
            url: 'https://wiki.athalon.net/index.php/K%C3%B6nigreich_Fallice',
            banner: 'http://wiki.athalon.net/images/4/4c/Wappen_FalliceNeu_2020.png',
            cities: [
                'Hilton',
                'Tremban',
                'Graméntis',
                'Pas - Baltan',
            ],
        },
        {
            name: 'Kurmark',
            url: 'https://wiki.athalon.net/index.php/Erzbistum_Kurmark',
            banner: 'http://wiki.athalon.net/images/4/49/KurmarkFlagge.png',
            cities: [
                'Zandig',
                'Sôlfurt',
                'Zinten',
                'Berent',
                'Königsberg',
                'Lötzen',
            ]
        }
    ],
    skillpoints: {
        strength: {
            attribute: 65,
            skills: [
                skillpoint('Handgemenge', 25),
                skillpoint('Werfen', 25),
                skillpoint('Nahkampfwaffen (Grob)', 15),
            ],
        },
        constitution: {
            attribute: 60,
            skills: [
                skillpoint('Vitalität', 25),
                skillpoint('Athletik', 20),
                skillpoint('Klettern', 20),
                skillpoint('Schwimmen', 10),
            ],
        },
        aptness: {
            attribute: 45,
            skills: [
                skillpoint('Ausweichen', 0),
                skillpoint('Nahkampfwaffen (Fein)', 15),
                skillpoint('Fernkampfwaffen', 10),
                skillpoint('Pulverwaffen', 5),
                skillpoint('Steuern', 5),
                skillpoint('Heimlichkeit', 20),
                skillpoint('Fingerfertigkeit', 20),
            ],
        },
        intelligence: {
            attribute: 40,
            skills: [
                skillpoint('Heilkunde', 10),
                skillpoint('Wissen', 0),
                skillpoint('Handwerk', 0),
                skillpoint('Sprachen', 0),
                skillpoint('Tasperin', 40),
                skillpoint('Kunst', 0),
                skillpoint('Zauberkunde', 0),
            ],
        },
        mind: {
            attribute: 40,
            skills: [
                skillpoint('Wahrnehmung', 25),
                skillpoint('Horchen', 25),
                skillpoint('Orientierung', 10),
                skillpoint('Intuition', 20),
                skillpoint('Willenskraft', 15),
                skillpoint('Menschenkenntnis', 5),
            ],
        },
    },
}
