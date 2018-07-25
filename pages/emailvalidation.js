import React from 'react'
import Layout from '../components/layout/Layout'
import EmailValidationContent from '../components/authentication/EmailValidationContent'
import { connect } from 'react-redux'
import { setTitle } from "../lib/store"


class EmailValidation extends React.Component {
    componentDidMount() {
        this.props.dispatch(setTitle("Register"))
    }

    render () {
        return (
            <Layout>
                <EmailValidationContent/>
            </Layout>
        )
    }
}

// Redux
export default connect()(EmailValidation)
