import React from 'react'
import { connect } from "react-redux"
import { setTitle } from "../../lib/store"
import redirect from '../../lib/redirect'
import checkLoggedIn from '../../lib/checkLoggedIn'
//import ForgotPasswordForm from '../../components/authentication/ForgotPasswordForm'
import Layout from '../../components/layout/Layout'
import CenteredPaper from '../../components/shared/CenteredPaper'


class ForgotPassword extends React.Component {
  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (loggedInUser) {
      redirect(context, '/')
    }

    return {}
  }

  componentWillMount() {
    this.props.dispatch(setTitle("Forgot Password"))
  }

  render () {
    return (
      <Layout>
          <CenteredPaper>
              {/*<LoginForm />*/}
          </CenteredPaper>
      </Layout>
    )
  }
}

// Redux
export default connect()(ForgotPassword)
