import * as dotenv from 'dotenv'
import dependencyContainer from './dependencies'
import server from './app/server'
import routes from './app/routes'
import { getCharactersByIdFromFiles } from './character/characterService'
dotenv.config()

const dependencies = dependencyContainer()
server(dependencies, routes)

const x = async () => {
    const d = await getCharactersByIdFromFiles(dependencies, 258)
    console.log(d)
}

x()