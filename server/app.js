const express = require('express')
const next = require('next')
const sitemapAndRobots = require('./sitemapAndRobots')
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const { i18nInstance } = require('./i18n')
const path = require('path')


const dev = process.env.NODE_ENV !== 'production'

const port = process.env.PORT || 3000
const ROOT_URL = dev
    ? `http://localhost:${port}`
    : 'http://example.com'  // Or 'https://example.com'

const app = next({ dev })
const handle = app.getRequestHandler()

// init i18next with serverside settings
// using i18next-express-middleware
i18nInstance
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        preload: ['en', 'pt'], // Preload all langages
        ns: ['common', 'home', 'authentication'], // Need to preload all the namespaces
        backend: {
            loadPath: path.join(__dirname, '../static/locales/{{lng}}/{{ns}}.json'),
            addPath: path.join(__dirname, '../static/locales/{{lng}}/{{ns}}.missing.json')
        },
        detection: {
            // Order and from where user language should be detected
            order: ['subdomain', 'querystring', 'cookie', 'localStorage', 'navigator'],

            // Params to lookup language from
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupFromSubdomainIndex: 0
        }
    }, () => {
        // loaded translations we can bootstrap our routes
        app.prepare()
            .then(() => {
                const server = express()

                sitemapAndRobots({ server })

                // enable middleware for i18next
                server.use(i18nextMiddleware.handle(i18nInstance))

                // serve locales for client
                server.use('/locales', express.static(path.join(__dirname, '../static/locales')))

                // missing keys
                server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance))

                // use next.js
                server.get('*', (req, res) => handle(req, res))

                server.listen(3000, (err) => {
                    if (err) throw err
                    console.log('> Ready on http://localhost:3000')
                })
            })
    })