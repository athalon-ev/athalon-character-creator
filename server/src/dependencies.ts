import * as Koa from 'koa'
import * as fs from 'fs-extra'
import axios from 'axios'
import * as cors from '@koa/cors'
import * as KoaRouter from '@koa/router'
import * as bodyParser from 'koa-bodyparser'
import * as path from 'path'

const rootPath = path.resolve(__dirname, '..')

export default () => ({
    lib: {
        axios,
        fs,
        Koa,
        KoaRouter,
        console,
        path,
    },
    server: {
        middlewares: {
            cors,
            bodyParser,
        },
    },
    config: {
        charactersFolderPath: path.join(rootPath, 'data/characters'),
        forumClient: axios.create({
            baseURL: 'https://forum.athalon.de'
        }),
        server: {
            port: parseInt(process.env.PORT || '80'),
            host: process.env.HOST || '0.0.0.0',
            pathPrefix: '/',
        }
    },
})