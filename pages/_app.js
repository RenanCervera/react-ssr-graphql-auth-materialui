import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/withApollo'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../lib/getPageContext'
import withReduxStore from '../lib/withReduxStore'
import { Provider } from 'react-redux'
import Router from 'next/router'
import * as gtag from '../lib/gtag'


Router.onRouteChangeComplete = url => {
    gtag.pageview(url)
}

class MyApp extends App {
    constructor(props) {
        super(props)
        this.pageContext = getPageContext()
    }

    pageContext = null

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render () {
        const { Component, pageProps, apolloClient, reduxStore } = this.props

        return (
            <Container>
                <JssProvider
                    registry={this.pageContext.sheetsRegistry}
                    generateClassName={this.pageContext.generateClassName}
                >
                    {/* MuiThemeProvider makes the theme available down the React
                  tree thanks to React context. */}
                    <MuiThemeProvider
                        theme={this.pageContext.theme}
                        sheetsManager={this.pageContext.sheetsManager}
                    >
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server side. */}
                        <ApolloProvider client={apolloClient}>
                            <Provider store={reduxStore}>
                                <Component {...pageProps} pageContext={this.pageContext} />
                            </Provider>
                        </ApolloProvider>
                    </MuiThemeProvider>
                </JssProvider>
            </Container>
        )
    }
}

export default withApollo(withReduxStore(MyApp))
