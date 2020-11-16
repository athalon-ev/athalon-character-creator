import * as Koa from 'koa'
import * as fs from 'fs-extra'
import axios from 'axios'
import * as cors from '@koa/cors'
import * as KoaRouter from '@koa/router'
import * as bodyParser from 'koa-bodyparser'
import * as path from 'path'
import * as filenamify from 'filenamify'
import * as nanoid from 'nanoid'
import * as KoaJWT from 'koa-jwt'
import * as jwt from 'jsonwebtoken'

import * as accountService from './account/accountService'
import * as characterService from './character/characterService'
import * as databaseService from './database/databaseService'
import * as minecraftAvatarService from './minecraft/avatar'

import * as lowdb from 'lowdb/lib/fp'
import * as LowDbFileAsyncAdapter from 'lowdb/adapters/FileAsync'
const rootPath = path.resolve(__dirname, '..')

const getContainer = () => ({
    lib: {
        filenamify,
        axios,
        fs,
        Koa,
        KoaRouter,
        KoaJWT,
        jwt,
        console,
        path,
        nanoid,
        lowdb,
        LowDbFileAsyncAdapter,
    },
    services: {
        accountService,
        characterService,
        databaseService,
        minecraftAvatarService,
    },
    server: {
        middlewares: {
            cors,
            bodyParser,
        },
    },
    config: {
        miencraftAvatarClient: axios.create({
            baseURL: 'https://crafatar.com',
        }),
        jwtSecret: '4thalonS3cretS4uce3',
        charactersFolderPath: path.join(rootPath, 'data/characters'),
        charactersDatabasePath: path.join(rootPath, 'data/characters.json'),
        forumApiKey: 'Athal0n2020!MybbL0ginK3y',
        forumClient: axios.create({
            baseURL: 'https://board.athalon.de'
        }),
        server: {
            port: parseInt(process.env.PORT || '80'),
            host: process.env.HOST || '0.0.0.0',
            pathPrefix: '',
        }
    },
})

export type Dependencies = ReturnType<typeof getContainer>
export default getContainer