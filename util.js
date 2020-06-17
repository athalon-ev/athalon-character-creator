import * as R from 'ramda'
import characterData from '~/character-data'
export const randomItem = list => list[Math.random() * list.length | 0]
export const getNationByName = name => R.find(R.propEq('name', name), characterData.nations)
export const availableCities = character => R.prop('cities', getNationByName(character.nationality))
export const randomFromRange = (min, max) => (min + Math.random() * (max - min))
export const exportCharacter = character => `
[b][size=large]I. Charakterhintergrund[/size][/b]
Attributspunkte: 250
Fähigkeitenpunkte: 250

[b]- Name[/b]
${character.name}

[b]- Alter[/b]
${character.age}

[b]- Äußerliche Erscheinung[/b]
Geschlecht: Weiblich
Alter: ${character.age}     | Größe: ${character.size}m     | Gewicht: ${character.weight}kg
Haarfarbe: ${character.hairColor}
Augenfarbe: ${character.eyeColor}



[b]- Angewohnheiten[/b]
${character.habits}

[b]- Weltanschauung[/b]
${character.ideology}

[b]- Ängste und Phobien[/b]
${character.fears}

[hr]

[b][size=large]II. Charaktergeschichte[/size][/b]

[b]- Wo wurde der Charakter geboren?[/b]
Nationalität: ${character.nationality}
Geburtsort: ${character.birthcity}

[b]- Wer sind die Eltern und Verwandte deines Charakters, sind sie noch am Leben?[/b]
${character.family}


[b]- Was hat dein Charakter gemacht, bevor er nach Neu Corethon kam?[/b]
${character.job}

[b]- Warum hat der Charakter sein gewohntes Leben hinter sich gelassen?[/b]
${character.whyLeft}

[b]- Was hat dein Charakter in seiner Heimat zurückgelassen?[/b]
${character.leftWhat}

[b]- Was möchte dein Charakter erreichen, welches Ziel hat er?[/b]
${character.goals}

[hr]

[b][size=large]III. Charakterwerte[/size][/b]

[b]-[/b] [b]Lebenspunkte:[/b] 22/22
[b]-[/b] [b]Stabilitätspunkte:[/b] 10/10
[b]-[/b] [b]Karmapunkte:[/b] 50/99
[b]-[/b] [b]Staturbonus:[/b] 1

[b]-[/b] [b]Schwere Wunde?[/b] Nein!
[b]-[/b] [b]Psychische Probleme?[/b] Nein!

[hr]

[b][size=large]IV. Charakterfertigkeiten[/size][/b]

[b][color=#ff3333][size=medium]Stärke 65% [/size][size=small](5)[/size][/color][/b]
[list]
[*]- [b]65%[/b] Handgemenge
[*]- [b]30%[/b] Werfen
[*]- [b]20%[/b] Nahkampfwaffen Grob ([color=#ff3333]AUSWAHL[/color])
[/list]
[b][color=#ff9933][size=medium]Konstitution 55%[/size][size=small](0)[/size][/color][/b]
[list]
[*]- [b]25%[/b] Vitalität
[*]- [b]65%[/b] Athletik
[*]- [b]20%[/b] Klettern
[*]- [b]60%[/b] Schwimmen
[/list]
[b][color=#33cc33][size=medium]Geschicklichkeit 65% [/size][size=small](5)[/size][/color][/b]
[list]
[*]- [b]35%[/b] Ausweichen
[*]- [b]20%[/b] Nahkampfwaffen Fein ([color=#33cc33]AUSWAHL[/color])
[*]- [b]15%[/b] Fernkampfwaffen ([color=#33cc33]AUSWAHL[/color])
[*]- [b]10%[/b] Pulverwaffen
[*]- [b]10%[/b] Steuern ([color=#33cc33]AUSWAHL[/color])
[*]- [b]65%[/b] Heimlichkeit
[*]- [b]25%[/b] Fingerfertigkeit
[/list]
[b][color=#33ccff][size=medium]Intelligenz 55% [/size][size=small](0)[/size][/color][/b]
[list]
[*]- [b]10%[/b] Heilkunde
[*]- [b]00%[/b] Wissen ([color=#33ccff]AUSWAHL[/color])
[*]- [b]00%[/b] Handwerk ([color=#33ccff]AUSWAHL[/color])
[*]- [b]00%[/b] Sprachen ([color=#33ccff]AUSWAHL[/color])
[*]  - [b]55%[/b] Tasperin (Muttersprache)
[*]- [b]00%[/b] Kunst ([color=#33ccff]AUSWAHL[/color])
[*]  - [b]00%[/b] asda
[/list]
[b][color=#cc33ff][size=medium]Geist 10% [/size][size=small](-15)[/size][/color][/b]
[list]
[*]- [b]10%[/b] Wahrnehmung
[*]- [b]10%[/b] Horchen
[*]- [b]00%[/b] Orientierung
[*]- [b]05%[/b] Intuition
[*]- [b]00%[/b] Willenskraft
[*]- [b]00%[/b] Menschenkenntnis
[/list]
`
