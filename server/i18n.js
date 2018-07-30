const i18next = require('i18next')
const XHR = require('i18next-xhr-backend')
const LanguageDetector = require('i18next-browser-languagedetector')


const options = {
    fallbackLng: 'en',
    load: 'languageOnly', // Only provide en, de. No region specific locals like en-US, de-DE

    // Common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: false,  // Or process.env.NODE_ENV !== 'production',
    saveMissing: true,

    interpolation: {
        escapeValue: false, // Not needed for react
        formatSeparator: ',',
        format: (value, format, lng) => {
            if (format === 'uppercase') return value.toUpperCase()
            return value
        }
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
}

const i18nInstance = i18next

// For browser use xhr backend to load translations and browser lng detector
if (process.browser) {
    i18nInstance
        .use(XHR)
        // .use(Cache)
        .use(LanguageDetector)
}

// initialize if not already initialized
if (!i18nInstance.isInitialized) i18nInstance.init(options)

// a simple helper to getInitialProps passed on loaded i18n data
const getInitialProps = (req, namespaces) => {
    if (!namespaces) namespaces = i18nInstance.options.defaultNS
    if (typeof namespaces === 'string') namespaces = [namespaces]

    req.i18n.toJSON = () => null // do not serialize i18next instance and send to client

    const initialI18nStore = {}
    req.i18n.languages.forEach((l) => {
        initialI18nStore[l] = {}
        namespaces.forEach((ns) => {
            initialI18nStore[l][ns] = (req.i18n.services.resourceStore.data[l] || {})[ns] || {}
        })
    })

    return {
        i18n: req.i18n, // use the instance on req - fixed language on request (avoid issues in race conditions with lngs of different users)
        initialI18nStore,
        initialLanguage: req.i18n.language
    }
}

module.exports = {
    getInitialProps,
    i18nInstance,
    I18n: i18next.default
}