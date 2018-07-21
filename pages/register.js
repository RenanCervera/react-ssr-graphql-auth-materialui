import React from 'react'
import Link from 'next/link'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import RegisterForm from '../components/authentication/RegisterForm'


export default class Register extends React.Component {
    static async getInitialProps (context) {
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)

        if (loggedInUser) {
            redirect(context, '/')
        }

        return {}
    }

    render () {
        return (
            <React.Fragment>
                <RegisterForm />
                <hr />
                Already have an account? <Link prefetch href='/login'><a>Login</a></Link>
            </React.Fragment>
        )
    }
};
