import * as R from 'ramda'
import characterData from '~/character-data'
export const randomItem = list => list[Math.random() * list.length | 0]
export const getNationByName = name => R.find(R.propEq('name', name), characterData.nations)
export const availableCities = character => R.prop('cities', getNationByName(character.nationality))
export const randomFromRange = (min, max) => (min + Math.random() * (max - min))
const between = (min, max) => R.both(R.gte(R.__, min), R.lte(R.__, max))

export const getAttributeBonusMalus = R.cond([
    [between(0, 9), () => -20],
    [between(10, 19), () => -15],
    [between(20, 29), () => -10],
    [between(30, 39), () => -5],
    [between(40, 59), () => 0],
    [between(60, 69), () => 5],
    [between(70, 79), () => 10],
    [between(80, 89), () => 15],
    [between(90, 100), () => 20],
])

export const getWeaponBonusMalus = R.cond([
    [between(0, 19), () => -2],
    [between(20, 39), () => -1],
    [between(40, 59), () => 0],
    [between(60, 79), () => 1],
    [between(80, 100), () => 2],
])

export const getHealthpoints = health => Math.floor(health / 2.5)

export const getSkillpointValue = (attribute, skill) => getAttributeBonusMalus(attribute) + parseInt(skill.points) + parseInt(skill.basePoints)
export const getBoundsSkillpointValue = (skillUpperbound, attribute, skill) => R.clamp(0, skillUpperbound, getSkillpointValue(attribute, skill))
export const exportSkill = R.curry(({ attribute, color, skillUpperbound }, skill) =>
    `[*]${skill.custom ? '  ' : ''}☐ [b]${getBoundsSkillpointValue(skillUpperbound, attribute, skill)}%[/b] ${skill.name} ${skill.custom ? `([color=${color}]AUSWAHL[/color])` : ''}`)
export const exportSkills = (attribute, color, skillUpperbound) => `
[list]
${attribute.skills.map(exportSkill({ attribute: attribute.attribute, color, skillUpperbound }), attribute.skills).join(`
`)}
[/list]
`
export const exportCharacter = (character, skillUpperbound) => `
[b][size=large]I. Charakterhintergrund[/size][/b]
Attributspunkte: 250
Fähigkeitenpunkte: 250

[b]➤ Name[/b]
${character.name}

[b]➤ Alter[/b]
${character.age}

[b]➤ Äußerliche Erscheinung[/b]
Geschlecht: ${character.gender}
Alter: ${character.age} Jahre    | Größe: ${character.size}m     | Gewicht: ${character.weight}kg
Haarfarbe: ${character.hairColor}
Augenfarbe: ${character.eyeColor}

[b]➤ Angewohnheiten[/b]
${character.habits}

[b]➤ Weltanschauung[/b]
${character.ideology}

[b]➤ Ängste und Phobien[/b]
${character.fears}

[hr]

[b][size=large]II. Charaktergeschichte[/size][/b]

[b]➤ Wo wurde der Charakter geboren?[/b]
Nationalität: ${character.nationality}
Geburtsort: ${character.birthcity}

[b]➤ Wer sind die Eltern und Verwandte deines Charakters, sind sie noch am Leben?[/b]
${character.family}

[b]➤ Was hat dein Charakter gemacht, bevor er nach Neu Corethon kam?[/b]
${character.job}

[b]➤ Warum hat der Charakter sein gewohntes Leben hinter sich gelassen?[/b]
${character.whyLeft}

[b]➤ Was hat dein Charakter in seiner Heimat zurückgelassen?[/b]
${character.leftWhat}

[b]➤ Was möchte dein Charakter erreichen, welches Ziel hat er?[/b]
${character.goals}

[hr]

[b][size=large]III. Charakterwerte[/size][/b]

[b]➤[/b] [b]Lebenspunkte:[/b] ${getHealthpoints(character.skillpoints.constitution.attribute)}/${getHealthpoints(character.skillpoints.constitution.attribute)}
[b]➤[/b] [b]Stabilitätspunkte:[/b] ${character.skillpoints.mind.attribute}/${character.skillpoints.mind.attribute}
[b]➤[/b] [b]Karmapunkte:[/b] 50/99
[b]➤[/b] [b]Staturbonus:[/b] ${getWeaponBonusMalus(character.skillpoints.strength.attribute)}

[b]➤[/b] [b]Schwere Wunde?[/b] Nein!
[b]➤[/b] [b]Psychische Probleme?[/b] Nein!

[hr]

[b][size=large]IV. Charakterfertigkeiten[/size][/b]

[b][color=#ff3333][size=medium]Stärke ${character.skillpoints.strength.attribute}% [/size][size=small](5)[/size][/color][/b]
${exportSkills(character.skillpoints.strength, '#ff3333', skillUpperbound)}
[b][color=#ff9933][size=medium]Konstitution ${character.skillpoints.constitution.attribute}%[/size][size=small](0)[/size][/color][/b]
${exportSkills(character.skillpoints.constitution, '#ff9933', skillUpperbound)}
[b][color=#33cc33][size=medium]Geschicklichkeit ${character.skillpoints.aptness.attribute}% [/size][size=small](5)[/size][/color][/b]
${exportSkills(character.skillpoints.aptness, '#33cc33', skillUpperbound)}
[b][color=#33ccff][size=medium]Intelligenz ${character.skillpoints.intelligence.attribute}% [/size][size=small](0)[/size][/color][/b]
${exportSkills(character.skillpoints.intelligence, '#33ccff', skillUpperbound)}
[b][color=#cc33ff][size=medium]Geist ${character.skillpoints.mind.attribute}% [/size][size=small](-15)[/size][/color][/b]
${exportSkills(character.skillpoints.mind, '#cc33ff', skillUpperbound)}

[code]
${JSON.stringify(character, null, 4)}
[/code]
`
