import React from 'react'
import Link from 'next/link'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import LoginForm from '../components/authentication/LoginForm'
import Layout from '../components/layout/Layout'


export default class Login extends React.Component {
  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (loggedInUser) {
      redirect(context, '/')
    }

    return {}
  }

  render () {
    return (
      <Layout>
        <LoginForm />
        <hr />
        New? <Link prefetch href='/register'><a>Create account</a></Link>
      </Layout>
    )
  }
}
