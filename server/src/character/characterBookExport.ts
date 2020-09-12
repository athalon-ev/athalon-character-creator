import type { Character, Skillpoint } from './characterTypes'

interface Book {
    author: string
    title: string
    pages: string[]
}

enum Color {
    Black = 'black',
    DarkBlue = 'dark_blue',
    DarkGreen = 'dark_green',
    DarkAqua = 'dark_aqua',
    DarkRed = 'dark_red',
    DarkPurple = 'dark_purple',
    Gold = 'gold',
    Gray = 'gray',
    DarkGray = 'dark_gray',
    Blue = 'blue',
    Green = 'green',
    Aqua = 'aqua',
    Red = 'red',
    LightPurple = 'light_purple',
    Yellow = 'yellow',
    White = 'white',
    Reset = 'reset',
}

interface ClickEvent {
    value: string
    action: 'run_command'
}

interface HoverEvent {
    contents: string
    action: 'show_text'
}

interface TextBlockStyle {
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    underline?: boolean
    color?: Color
    clickEvent?: ClickEvent
    hoverEvent?: HoverEvent
}

const character: Character = { "name": "Famus", "minecraftName": "Misan", "gender": "Männlich", "age": 23, "size": 136, "weight": 53.1, "haircolor": "Blond", "eyecolor": "Türkis", "nationality": "Fallice", "birthcity": "Graméntis", "physical": "", "habits": "dasd", "ideology": "asdas", "fears": "asda", "job": "asdasd", "family": "wd", "whyLeft": "sd", "leftWhat": "sd", "goals": "sd", "skillpoints": { "strength": { "name": "Stärke", "colorForum": "#ff3333", "colorCreator": "-red-", "attribute": 45, "skills": [{ "points": "2", "name": "Handgemenge", "basePoints": 25, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": "3", "name": "Werfen", "basePoints": 25, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Nahkampfwaffen (Grob)", "basePoints": 15, "custom": false, "categories": ["Äxte", "Wuchtwaffen", "Zweihandschwerter", "Schilde"], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": "3", "name": "Äxte", "custom": true, "basePoints": 15, "categories": [], "category": "Nahkampfwaffen (Grob)", "deletable": true }] }, "constitution": { "name": "Konstitution", "colorForum": "#ff9933", "colorCreator": "-orange-", "attribute": 55, "skills": [{ "points": 0, "name": "Vitalität", "basePoints": 25, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": "1", "name": "Athletik", "basePoints": 20, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": "3", "name": "Klettern", "basePoints": 20, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Schwimmen", "basePoints": 10, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }] }, "aptness": { "name": "Geschicklichkeit", "colorForum": "#33cc33", "colorCreator": "-green-", "attribute": 50, "skills": [{ "points": "3", "name": "Ausweichen", "basePoints": 20, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Nahkampfwaffen (Fein)", "basePoints": 15, "custom": false, "categories": ["Einhandschwerter", "Speere", "Stangenwaffen", "Ungewöhnliches"], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": "3", "name": "Speere", "custom": true, "basePoints": 15, "categories": [], "category": "Nahkampfwaffen (Fein)", "deletable": true }, { "points": 0, "name": "Fernkampfwaffen", "basePoints": 10, "custom": false, "categories": ["Bögen", "Armbrüste", "Pulverwaffen", "Belagerungsgeräte"], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Steuern", "basePoints": 5, "custom": false, "categories": ["Reiten", "Gespann", "Schiff", "Luftschiff"], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Heimlichkeit", "basePoints": 20, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Fingerfertigkeit", "basePoints": 20, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }] }, "intelligence": { "name": "Intelligenz", "colorForum": "#33ccff", "colorCreator": "-blue-", "attribute": 45, "skills": [{ "points": 0, "name": "Heilkunde", "basePoints": 10, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Wissen", "basePoints": 0, "custom": false, "categories": ["Alchemie", "Archäologie", "Astronomie", "Baukunst", "Geographie", "Geschichte", "Gesteinskunde", "Heraldik", "Kryptographie", "Metamythologie", "Nautik", "Okkultismus", "Pflanzenkunde", "Philosophie", "Rechtskunde", "Schließtechnik", "Theologie", "Tierkunde"], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Handwerk", "basePoints": 0, "custom": false, "categories": ["Barbier", "Bauer", "Baumeister", "Bergarbeiter", "Braumeister", "Buchbinder", "Bäcker", "Büchsenmacher", "Fischer", "Gerber", "Glaser", "Imker", "Jäger", "Juwelenschleifer", "Koch", "Mechanikus", "Medicus", "Metzger", "Münzmeister", "Schmied", "Schneider", "Schreiner", "Schuhmacher", "Seifensieder", "Steinmetz", "Töpfer"], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Muttersprache", "basePoints": 0, "custom": false, "categories": ["Tasperin", "Sorridianisch", "Kalifatisch"], "category": false, "deletable": false, "linkAttribute": false, "hidden": true }, { "points": 0, "name": "Tasperin", "basePoints": 0, "custom": true, "categories": [], "category": "Muttersprache", "deletable": false, "linkAttribute": true, "hidden": false }, { "points": 0, "name": "Fremdsprachen", "basePoints": 0, "custom": false, "categories": ["Tasperin", "Sorridianisch", "Kalifatisch", "Alt-Tasperin", "Alt-Sorridianisch", "Bororo"], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": "5", "name": "Bororo", "custom": true, "basePoints": 0, "categories": [], "category": "Fremdsprachen", "deletable": true }, { "points": "5", "name": "Kalifatisch", "custom": true, "basePoints": 0, "categories": [], "category": "Fremdsprachen", "deletable": true }, { "points": 0, "name": "Kunst", "basePoints": 0, "custom": false, "categories": ["Bildhauerei", "Fälscherei", "Gesang", "Kalligraphie", "Kartographie", "Malerei", "Musikinstrument", "Schauspiel", "Tanz"], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }] }, "mind": { "name": "Geist", "colorForum": "#cc33ff", "colorCreator": "-purple-", "attribute": 55, "skills": [{ "points": 0, "name": "Wahrnehmung", "basePoints": 25, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Horchen", "basePoints": 25, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Orientierung", "basePoints": 10, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": "10", "name": "Intuition", "basePoints": 20, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Willenskraft", "basePoints": 15, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }, { "points": 0, "name": "Menschenkenntnis", "basePoints": 5, "custom": false, "categories": [], "category": null, "deletable": false, "linkAttribute": false, "hidden": false }] } } }

const textBlock = (text: string, style: TextBlockStyle) => ({ text, ...style })

// textBlock('Characterbogen', { color: Color.Aqua })

const getBook = (book: Book) => `/give @p written_book${JSON.stringify(book)}`

const getPage = (textBlocks: ReturnType<typeof textBlock>[]) => JSON.stringify(['', ...textBlocks])

// ['["",{"text":"\\nMinecra"},{"text":"ft Tools book","clickEvent":{"action":"run_command","value":"dice 100"}},{"text":"\\n\\ns"},{"text":"d","bold":true,"italic":true,"strikethrough":true,"underlined":true},{"text":"f","color":"reset","bold":true},{"text":"s","color":"reset","obfuscated":true},{"text":"\\n\\n","color":"reset"},{"text":"asdasdasdas\\n\\nsdfsdfd df \\n\\nasd","hoverEvent":{"action":"show_text","contents":"moiau"}}]','{"text":"asdasd s"}'],title:Book,author:"http://minecraft.tools/",display:{Lore:["asd"]}
// ["", { "text": "CHARAKTERBOGEN", "underlined": true }, { "text": "\\n\\n", "color": "reset" }, { "text": "Raphael Bonnington", "italic": true }, { "text": "\\n\\n", "color": "reset" }, { "text": "* [Stärke]", "bold": true, "color": "dark_red" }, { "text": "\\n\\n", "color": "reset", "bold": true }, { "text": "* [Konstitution]", "bold": true, "color": "gold" }, { "text": "\\n\\n", "color": "reset", "bold": true }, { "text": "* [Geschicklichkeit]", "bold": true, "color": "dark_green" }, { "text": "\\n\\n", "color": "reset", "bold": true }, { "text": "* [Intelligenz]", "bold": true, "color": "dark_blue" }, { "text": "\\n\\n", "color": "reset", "bold": true }, { "text": "* [Geist]", "bold": true, "color": "dark_purple" }]','["", { "text": "[STÄ] 50%", "bold": true, "color": "dark_red" }, { "text": "\\n\\n* [Handgemenge] 25%\\n* [Werfen] 25%\\n* [Waffen - Grob] 15%\\n** [Äxte] 15%\\n** [Wuchtwaffen 15%\\n** [2H-Schwerter] 15%\\n** [Schilde] 15%\\n ", "color": "reset" }]','["", { "text": "[KON] 50%", "bold": true, "color": "gold" }, { "text": "\\n\\n* [Vitalität] 25%\\n* [Athletik] 20%\\n* [Klettern] 20%\\n* [Schwimmen] 10%", "color": "reset" }]','["", { "text": "[GES] 50%", "bold": true, "color": "dark_green" }, { "text": "\\n\\n* [Ausweichen] 20%\\n* [Waffen - Fein] 15%\\n** [1H-Schwerter] 15%\\n** [Speere] 15%\\n** [Stangenwaffen] 15%\\n** [Ungewöhnlich] 15%\\n* [Fernkampf] 10%\\n** [Bögen] 10%\\n** [Armbrüste] 10%\\n** [Pulverwaffen] 10%\\n** [Belagerung] 10%", "color": "reset" }]','["", { "text": "[GES] 50%", "bold": true, "color": "dark_green" }, { "text": "\\n\\n* [Steuern] 05%\\n** [Reiten] 05%\\n** [Gespann] 05%\\n** [Schiff] 05%\\n** [Luftschiff] 05%\\n* [Heimlichkeit] 20%\\n* [Fingerfertigkeit] 20%\\n ", "color": "reset" }]','["", { "text": "[INT] 50%", "bold": true, "color": "dark_blue" }, { "text": "\\n\\n* [Heilkunde] 10%\\n* [Wissen] 00%\\n** [Alles] 00%\\n* [Handwerk] 00%\\n** [Alles] 00%\\n* [Sprachen] 00%\\n** [Alles] 00%\\n* [Kunst] 00%\\n** [Alles] 00%\\n* [Zauberkunde] 00%", "color": "reset" }]','["", { "text": "[GEI] 50%", "bold": true, "color": "dark_purple" }, { "text": "\\n\\n* [Wahrnehmung] 25%\\n* [Horchen] 25%\\n* [Orientierung] 10%\\n* [Intuition] 20%\\n* [Willenskraft] 15%\\n* [Menschenkennt] 05%", "color": "reset" }]