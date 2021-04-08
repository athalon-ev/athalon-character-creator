const skillpoint = (name, basePoints, categories = [], category = null, custom = false, deletable = false, linkAttribute = false, hidden = false) => ({
    name,
    basePoints,
    points: 0,
    custom,
    categories,
    category,
    deletable,
    linkAttribute,
    hidden,
})
const nativeLanguages = [
    'Tasperin',
    'Sorridianisch',
    'Kalifatisch',
]

const foreignLanguages = [
    ...nativeLanguages,
    'Alt-Tasperin',
    'Alt-Sorridianisch',
    'Bororo',
]

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
    ],
    nations: [
        {
            name: 'Kaiserliche Monarchie Tasperin',
            url: 'https://wiki.athalon.net/index.php/Kaiserliche_Monarchie_Tasperin',
            banner: 'https://wiki.athalon.de/images/4/4b/Wappen_Tasperin_2020.png',
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
            name: 'Heiliges Königreich Sorridia',
            url: 'https://wiki.athalon.net/index.php/K%C3%B6nigreich_Sorridia',
            banner: 'https://wiki.athalon.de/images/d/d5/Wappen_Sorridia2020.png',
            cities: [
                'Montebrillo',
                'Fortifa',
                'Jevasqèz',
                'Matoléz',
            ],
        },
        {
            name: `Kalifat Al'bastra`,
            url: 'https://wiki.athalon.net/index.php/Kalifat_Al%27bastra',
            banner: 'https://wiki.athalon.de/images/e/e4/Wappen_Kalifat6.png',
            cities: [
                'Mina Farah',
                "Waha'kandh",
                'Schattpur',
                'Kualtan',
            ],
        },
        {
            name: 'Vereinigte Provinzen Silventrums',
            url: 'https://wiki.athalon.net/index.php/Vereinigte_Provinzen_von_Silventrum',
            banner: 'https://wiki.athalon.de/images/9/99/Wappen_Silventrum2020.png',
            cities: [
                'Zweibach',
                'Windwarden',
                'Steunvik',
                'Bischoffelden',
            ],
        },
        {
            name: 'Königreich Weidtland',
            url: 'https://wiki.athalon.net/index.php/Klanreich_Kaledon',
            banner: 'https://wiki.athalon.de/images/9/9a/Weidtland_2020_Neu.png',
            cities: [
                'Asmaeth',
                'Molder',
                'Rodstedt',
                'Nordingen',
            ],
        },
        {
            name: 'Klanreich Kaledon',
            url: 'https://wiki.athalon.net/index.php/Nostrisches_Imperium',
            banner: 'https://wiki.athalon.de/images/6/6a/Kaledon_2020_2.png',
            cities: [
                'Brist',
                'Kirkmore',
                'Averssire',
                'Ochsenbach',
            ],
        },
        {
            name: 'Königreich Patrien',
            url: 'https://wiki.athalon.net/index.php/K%C3%B6nigreich_Patrien',
            banner: 'https://wiki.athalon.de/images/4/4e/Wappen_Patrien.png',
            cities: [
                'Olapaso',
                'Corastella',
                'Vadez',
                'Figurréz',
            ],
        },
        {
            name: 'Königreich Fallice',
            url: 'https://wiki.athalon.net/index.php/K%C3%B6nigreich_Fallice',
            banner: 'https://wiki.athalon.de/images/3/30/Fallice2020_Neu.png',
            cities: [
                'Hilton',
                'Tremban',
                'Graméntis',
                'Pas - Baltan',
            ],
        },
        {
            name: 'Nostrisches Imperium',
            url: 'https://wiki.athalon.net/index.php/Nostrisches_Imperium',
            banner: 'https://wiki.athalon.de/images/2/2c/Wappen_Nostrien_2020_Neu.png',
            cities: [
                'Herabion', 'Pentas', 'Yamas',
            ],
        },
        {
            name: 'Erzbistum Kurmark',
            url: 'https://wiki.athalon.net/index.php/Erzbistum_Kurmark',
            banner: 'https://wiki.athalon.de/images/0/0b/Kurmark2020.png',
            cities: [
                'Zandig',
                'Sôlfurt',
                'Zinten',
                'Berent',
                'Königsberg',
                'Lötzen',
            ]
        },
        {
            name: 'Haldarische Stammesländer',
            url: 'https://wiki.athalon.net/index.php/Haldarische_Stammesl%C3%A4nder',
            banner: 'https://wiki.athalon.de/images/d/d5/Wappen_Haldar_2020_Neu.png',
            cities: [
                'Nebelhafen',
                'Siefhof',
                'Talgrund',
                'Haflof',
            ],
        },
        {
            name: 'Nordamar',
            url: 'https://wiki.athalon.net/index.php/Nordamar',
            banner: 'https://wiki.athalon.de/images/0/0b/FlaggeNordamar.png',
            cities: [
                'Frostheim',
                'Otterama',
                'Bisruk',
                'Ruladufa'
            ],
        },
    ],
    skillpoints: {
        strength: {
            name: 'Stärke',
            colorForum: '#ff3333',
            colorCreator: '-red-',
            attribute: 40,
            skills: [
                skillpoint('Handgemenge', 25),
                skillpoint('Werfen', 25),
                skillpoint('Nahkampfwaffen (Grob)', 15, [
                    'Äxte', 'Wuchtwaffen', 'Zweihandschwerter', 'Schilde'
                ]),
            ],
        },
        constitution: {
            name: 'Konstitution',
            colorForum: '#ff9933',
            colorCreator: '-orange-',
            attribute: 40,
            skills: [
                skillpoint('Vitalität', 25),
                skillpoint('Athletik', 20),
                skillpoint('Klettern', 20),
                skillpoint('Schwimmen', 10),
            ],
        },
        aptness: {
            name: 'Geschicklichkeit',
            colorForum: '#33cc33',
            colorCreator: '-green-',
            attribute: 40,
            skills: [
                skillpoint('Ausweichen', 20),
                skillpoint('Nahkampfwaffen (Fein)', 15, [
                    'Einhandschwerter', 'Speere', 'Stangenwaffen', 'Ungewöhnliches'
                ]),
                skillpoint('Fernkampfwaffen', 10, [
                    'Bögen', 'Armbrüste', 'Pulverwaffen', 'Belagerungsgeräte'
                ]),
                skillpoint('Reiten', 10),
                skillpoint('Heimlichkeit', 20),
                skillpoint('Fingerfertigkeit', 20),
            ],
        },
        intelligence: {
            name: 'Intelligenz',
            colorForum: '#33ccff',
            colorCreator: '-blue-',
            attribute: 40,
            skills: [
                skillpoint('Heilkunde', 10),
                skillpoint('Wissen', 0, [
                    'Alchemie', 'Archäologie', 'Astronomie',
                    'Baukunst', 'Geographie', 'Geschichte',
                    'Gesteinskunde', 'Heraldik', 'Kryptographie',
                    'Metamythologie', 'Nautik', 'Okkultismus',
                    'Pflanzenkunde', 'Philosophie', 'Rechtskunde',
                    'Schließtechnik', 'Theologie', 'Tierkunde'
                ]),
                skillpoint('Handwerk', 0, [
                    'Barbier', 'Bauer', 'Baumeister',
                    'Bergarbeiter', 'Braumeister', 'Buchbinder',
                    'Bäcker', 'Büchsenmacher', 'Fischer',
                    'Gerber', 'Glaser', 'Imker', 'Jäger',
                    'Juwelenschleifer', 'Koch', 'Mechanikus',
                    'Medicus', 'Metzger', 'Münzmeister',
                    'Schmied', 'Schneider', 'Schreiner',
                    'Schuhmacher', 'Seifensieder', 'Steinmetz', 'Töpfer'
                ]),
                skillpoint('Muttersprache', 0, nativeLanguages, false, false, false, false, true),
                skillpoint('Tasperin', 0, [], 'Muttersprache', true, false, true),
                skillpoint('Fremdsprachen', 0, foreignLanguages),
                skillpoint('Kunst', 0, [
                    'Bildhauerei',
                    'Fälscherei',
                    'Gesang',
                    'Kalligraphie',
                    'Kartographie',
                    'Malerei',
                    'Musikinstrument',
                    'Schauspiel',
                    'Tanz',
                ]),
            ],
        },
        mind: {
            name: 'Geist',
            colorForum: '#cc33ff',
            colorCreator: '-purple-',
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
