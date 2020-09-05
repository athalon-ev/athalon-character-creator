import * as dotenv from 'dotenv'
import dependencyContainer from './dependencies'
import server from './app/server'
import routes from './app/routes'
import * as lowdb from 'lowdb'
import * as FileAsyncAdapter from 'lowdb/adapters/FileAsync'

const db = lowdb(new FileAsyncAdapter('db.json'))

const posts = db.defaults({ characters: [] })

posts.write()


dotenv.config()

const dependencies = dependencyContainer()
server(dependencies, routes)