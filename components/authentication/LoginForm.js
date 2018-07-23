import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../../lib/redirect'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const SIGN_IN = gql`
    mutation Signin($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`

class LoginForm extends React.Component {
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    render() {
        const { classes, client } = this.props;

        return (
            <Mutation mutation={SIGN_IN} onCompleted={(data) => {
                // Store the token in cookie
                document.cookie = cookie.serialize('token', data.tokenAuth.token, {
                    maxAge: 30 * 24 * 60 * 60 // 30 days
                })
                // Force a reload of all the current queries now that the user is
                // logged in
                client.cache.reset().then(() => {
                    redirect({}, '/')
                })
            }} onError={(error) => {
                // If you want to send error to external service?
                console.log(error)
            }}>
                {(tokenAuth, { data, error }) => (

                    <form
                        className={classes.container}
                        onSubmit={e => {
                            e.preventDefault()
                            e.stopPropagation()

                            tokenAuth({
                                variables: {
                                    username: this.state.username,
                                    password: this.state.password
                                }
                            })

                            this.setState({
                                username: '',
                                password: ''
                            })
                        }}
                    >
                        <TextField
                            id="username"
                            label="Username"
                            className={classes.textField}
                            onChange={this.handleChange('username')}
                        /><br/>
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            onChange={this.handleChange('password')}
                            type="password"
                        /><br/>
                        <Button variant="contained" color="secondary" type="submit">
                            Sign in
                        </Button><br/><br/>
                    </form>

                )}
            </Mutation>
        )
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

// Apollo
LoginForm = withApollo(LoginForm)

// Styles
const styles = theme => ({
    container: {
        //display: 'flex',
        //flexWrap: 'wrap',
    },
    textField: {
        marginBottom: theme.spacing.unit*3,
        width: 200,
    },
    menu: {
        width: 200,
    },
})
export default withStyles(styles)(LoginForm)
