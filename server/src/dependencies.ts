import * as fs from 'fs-extra'
import axios from 'axios'
import * as Koa from 'koa'
import * as KoaCors from '@koa/cors'
import * as KoaRouter from '@koa/router'
import * as KoaBody from 'koa-body'
import * as KoaJWT from 'koa-jwt'
import * as KoaStatic from 'koa-static-server'
import * as path from 'path'
import * as filenamify from 'filenamify'
import * as nanoid from 'nanoid'
import * as jwt from 'jsonwebtoken'
import * as canvas from 'canvas'

import * as accountService from './account/accountService'
import * as characterService from './character/characterService'
import * as skinService from './skin/skinService'
import * as databaseService from './database/databaseService'
import * as minecraftApi from './minecraft/minecraftApi'
import * as skinRenderer from './skin/skinRenderer'

import * as middlewares from './http/middlewares'

import * as lowdb from 'lowdb/lib/fp'
import * as LowDbFileAsyncAdapter from 'lowdb/adapters/FileAsync'

const rootPath = path.resolve(__dirname, '..')

const getContainer = () => ({
    lib: {
        filenamify,
        axios,
        fs,
        Koa,
        KoaStatic,
        KoaRouter,
        KoaJWT,
        jwt,
        console,
        path,
        nanoid,
        lowdb,
        LowDbFileAsyncAdapter,
        canvas,
    },
    services: {
        accountService,
        characterService,
        skinService,
        databaseService,
        minecraftApi,
        skinRenderer,
    },
    config: {
        adminGroupIds: [4, 19],
        mojangApiClient: axios.create({ baseURL: 'https://api.mojang.com/' }),
        sessionApiClient: axios.create({ baseURL: 'https://sessionserver.mojang.com/' }),
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
            globalMiddlewares: {
                KoaCors,
                KoaBody,
            },
            routeMiddlewares: middlewares,
        }
    },
})

export type Dependencies = ReturnType<typeof getContainer>
export default getContainer
