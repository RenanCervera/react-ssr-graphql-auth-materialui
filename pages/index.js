import React from 'react'
import Layout from '../components/layout/Layout'
import HomeContent from '../components/home/HomeContent'
import { connect } from 'react-redux'
import { setTitle } from "../lib/store"


class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch(setTitle("Home"))
    }

    render () {
        return (
            <Layout>
                <HomeContent/>
            </Layout>
        )
    }
}

// Redux
export default connect()(Index)
