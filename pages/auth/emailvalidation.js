import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import EmailValidationContent from '../../components/authentication/EmailValidationContent'
import { connect } from 'react-redux'
import { setTitle } from "../../lib/store"


class EmailValidation extends React.Component {
    componentDidMount() {
        this.props.dispatch(setTitle("Register"))
    }

    render () {
        if(this.props.router.query.email && this.props.router.query.email.length > 0) {
            return (
                <Layout>
                    <EmailValidationContent email={this.props.router.query.email}/>
                </Layout>
            )
        }
        else {
            return (
                <Layout>
                    <EmailValidationContent/>
                </Layout>
            )
        }
    }
}

// Router
EmailValidation = withRouter(EmailValidation)

// Redux
export default connect()(EmailValidation)
