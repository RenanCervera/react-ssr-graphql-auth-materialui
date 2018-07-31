import React from 'react'
import Layout from '../../components/layout/Layout'
import { connect } from 'react-redux'
import { setTitle } from "../../lib/store"
import ProfileContent from "../../components/social/ProfileContent";


class Profile extends React.Component {
    componentDidMount() {
        this.props.dispatch(setTitle("Profile"))
    }

    render () {
        return (
            <Layout>
                <ProfileContent/>
            </Layout>
        )
    }
}

// Redux
export default connect()(Profile)
