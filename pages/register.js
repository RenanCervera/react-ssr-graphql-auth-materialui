import React from 'react'
import Link from 'next/link'
import { connect } from "react-redux"
import { setTitle } from "../lib/store"
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import RegisterForm from '../components/authentication/RegisterForm'
import Layout from '../components/layout/Layout'
import CenteredPaper from '../components/shared/CenteredPaper'


class Register extends React.Component {
    static async getInitialProps (context) {
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)

        if (loggedInUser) {
            redirect(context, '/')
        }

        return {}
    }

    componentDidMount() {
        this.props.dispatch(setTitle("Register"))
    }

    render () {
        return (
            <Layout>
                <CenteredPaper>
                    <RegisterForm />
                    <hr />
                    Already have an account? <Link prefetch href='/login'><a>Login</a></Link>
                </CenteredPaper>
            </Layout>
        )
    }
}

// Redux
export default connect()(Register)
