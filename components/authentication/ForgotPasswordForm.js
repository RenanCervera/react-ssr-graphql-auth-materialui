import React from 'react'
import Link from 'next/link'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../../lib/redirect'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


const SIGN_IN = gql`
    mutation Signin($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`

class ForgotPasswordForm extends React.Component {
    state = {
        username: '',
        usernameError: false,
        password: '',
        passwordError: false
    }

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
                // Force a reload of all the current queries now that the user is logged in
                client.cache.reset().then(() => {
                    redirect({}, '/')
                })
            }} onError={(error) => {
                if(error.message && error.message.includes("GraphQL error: Please, enter valid credentials")) {
                    this.setState({
                        usernameError: true,
                        passwordError: true
                    })
                }

                this.setState({
                    password: ''
                })
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
                        }}
                    >
                        <Typography variant="title" color="secondary" gutterBottom align="center">
                            Auth boilerplate
                        </Typography>
                        <Typography variant="display1" gutterBottom>
                            Login
                        </Typography>
                        <div>
                            <TextField
                                id="username"
                                label="Username"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                error={this.state.usernameError}
                            />
                        </div>
                        <div>
                            <TextField
                                id="password"
                                label="Password"
                                className={classes.textField}
                                onChange={this.handleChange('password')}
                                type="password"
                                value={this.state.password}
                                error={this.state.passwordError}
                            />
                        </div>
                        <Grid
                            container
                            alignItems="center"
                            justify="space-between"
                            className={classes.submit}
                        >
                            <Grid item>
                                <Link href='/auth/register'><a>Create account</a></Link>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" type="submit">
                                    Sign in
                                </Button>
                            </Grid>
                        </Grid>
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
    textField: {
        marginBottom: theme.spacing.unit*3,
        maxWidth: 350,
    },
    submit: {
        marginTop: theme.spacing.unit*3,
    },
})
export default withStyles(styles)(LoginForm)
