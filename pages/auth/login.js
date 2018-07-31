import React from 'react'
import { connect } from "react-redux"
import { setTitle } from "../../lib/store"
import redirect from '../../lib/redirect'
import checkLoggedIn from '../../lib/checkLoggedIn'
import LoginForm from '../../components/authentication/LoginForm'
import Layout from '../../components/layout/Layout'
import CenteredPaper from '../../components/shared/CenteredPaper'


class Login extends React.Component {
  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (loggedInUser) {
      redirect(context, '/')
    }

    return {}
  }

  componentDidMount() {
    this.props.dispatch(setTitle("Login"))
  }

  render () {
    return (
      <Layout>
          <CenteredPaper>
              <LoginForm />
          </CenteredPaper>
      </Layout>
    )
  }
}

// Redux
export default connect()(Login)
