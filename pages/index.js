import React from 'react'
import Layout from '../components/layout/Layout'
import HomeContent from '../components/home/HomeContent'
import { withI18next } from "../lib/withI18next"
import { connect } from 'react-redux'
import { setTitle } from "../lib/store"


class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch(setTitle("Home"))
    }

    render () {
        const { t } = this.props

        return (
            <Layout>
                <HomeContent t={t}/>
            </Layout>
        )
    }
}

// Internationalization
Index = withI18next(['home', 'common'])(Index)

// Redux
export default connect()(Index)
