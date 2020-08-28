import * as dotenv from 'dotenv'
import dependencyContainer from './dependencies'
import server from './app/server'
import routes from './app/routes'
dotenv.config()

const dependencies = dependencyContainer()
server(dependencies, routes)