import React from 'react'
import Layout from '../components/layout/Layout'
import { connect } from 'react-redux'
import { setTitle } from "../lib/store"


class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch(setTitle("Home"))
    }

    render () {
        return (
            <Layout>
                <p>Home</p>
            </Layout>
        )
    }
}

// Redux
export default connect()(Index)
