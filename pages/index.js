import React from 'react'
import cookie from 'cookie'
import { ApolloConsumer } from 'react-apollo'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import Button from '@material-ui/core/Button'
import Layout from '../components/layout/Layout'


export default class Index extends React.Component {
  static async getInitialProps (context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (!loggedInUser) {
      redirect(context, '/login')
    }

    return { loggedInUser }
  }

  signout = apolloClient => () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/login')
    })
  }

    render () {
        return (
            <Layout>
                <ApolloConsumer>
                    {client => (
                        <div>
                            Hello {this.props.loggedInUser.username}!<br />
                            <Button onClick={this.signout(client)}>Sign out</Button>
                        </div>
                    )}
                </ApolloConsumer>
            </Layout>
        )
    }
}
