import * as dotenv from 'dotenv'
import dependencyContainer from './dependencies'
import server from './http/server'
import routes from './http/routes'
dotenv.config()

const dependencies = dependencyContainer()
server(dependencies, routes)
