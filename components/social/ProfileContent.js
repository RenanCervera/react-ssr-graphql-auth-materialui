import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { setTitle } from '../../lib/store'
import Typography from "@material-ui/core/Typography";
import CenteredPaper from "../shared/CenteredPaper";


class ProfileContent extends Component {
    render () {
        const { data, dispatch } = this.props

        if (data.error) return <div>{error.message}</div>

        if (data.loading) {
            return <div>Loading...</div>
        } else {
            dispatch(setTitle(data.me.firstName + ' ' + data.me.lastName))

            if(data.me) {
                return (
                    <CenteredPaper>
                        <Typography variant="display1" align="left" color="secondary" gutterBottom>
                            { data.me.firstName } { data.me.lastName }
                        </Typography>
                        <Typography variant="subheading" align="left" color="primary" gutterBottom>
                            @{ data.me.username }
                        </Typography>
                    </CenteredPaper>
                )
            } else {
                return (
                    <div>User not authenticated.</div>
                )
            }
        }
    }
}

// Redux
ProfileContent = connect()(ProfileContent)

// Apollo
export const loggedInUser = gql`
  query getUser {
    me {
      id
      firstName
      lastName
      username
    }
  }
`
export default graphql(loggedInUser)(ProfileContent)
