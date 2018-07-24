import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import redirect from '../../lib/redirect'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'


const CREATE_USER = gql`
    mutation Create($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password ) {
            user {
                id
            }
        }
    }`

class RegisterForm extends React.Component {
    state = {
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        password2: '',
        password2Error: '',
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    render() {
        const { classes, client } = this.props;

        return (
            <Mutation mutation={CREATE_USER} onCompleted={(data) => {
                client.cache.reset().then(() => {
                    redirect({}, '/emailvalidation?userId=' + data.createUser.user.id)
                })
            }} onError={(error) => {
                console.log(error)

                if(error.message && error.message.includes("GraphQL error: Username already been used.")) {
                    this.setState({
                        usernameError: 'Username already been used.'
                    })
                }

                if(error.message && error.message.includes("GraphQL error: Email already been used.")) {
                    this.setState({
                        emailError: 'Email already been used.'
                    })
                }

            }}>
                {(create, { data, error }) => (

                    <form
                        className={classes.container}
                        onSubmit={e => {
                            e.preventDefault()
                            e.stopPropagation()

                            let error = false

                            this.setState({
                                firstNameError: '',
                                lastNameError: '',
                                usernameError: '',
                                emailError: '',
                                passwordError: '',
                                password2Error: '',
                            })

                            if(this.state.firstName == ''
                                || this.state.firstName.length < 3
                            ) {
                                this.setState({
                                    firstNameError: 'Must be at least 3 characters long.',
                                })
                                error = true
                            }

                            if(this.state.lastName == ''
                                || this.state.lastName.length < 3
                            ) {
                                this.setState({
                                    lastNameError: 'Must be at least 3 characters long.',
                                })
                                error = true
                            }

                            if(this.state.username == ''
                                || this.state.username.length < 3
                            ) {
                                this.setState({
                                    usernameError: 'Must be at least 3 characters long.',
                                })
                                error = true
                            }

                            var re = /\S+@\S+\.\S+/
                            if(this.state.email == ''
                                || !re.test(this.state.email)
                            ) {
                                this.setState({
                                    emailError: 'Invalid email.',
                                })
                                error = true
                            }

                            if(this.state.password == '' || this.state.password != this.state.password2)
                            {
                                this.setState({
                                    passwordError: 'Must be at least 6 characters long.',
                                })
                                error = true
                            }

                            if(this.state.password != this.state.password2)
                            {
                                this.setState({
                                    password2Error: 'Password does not match the confirm password',
                                })
                                error = true
                            }

                            if (!error)
                            {
                                create({
                                    variables: {
                                        firstName: this.state.firstName,
                                        lastName: this.state.lastName,
                                        username: this.state.username,
                                        email: this.state.email,
                                        password: this.state.password
                                    }
                                })
                            }

                            this.setState({
                                password: '',
                                password2: ''
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
                                id="firstName"
                                label="First name"
                                className={classes.textField}
                                onChange={this.handleChange('firstName')}
                                error={this.state.firstNameError != ''}
                                helperText={this.state.firstNameError}
                            />
                            <TextField
                                id="lastName"
                                label="Last name"
                                className={classes.rightTextField}
                                onChange={this.handleChange('lastName')}
                                error={this.state.lastNameError != ''}
                                helperText={this.state.lastNameError}
                            />
                        </div>
                        <div>
                            <TextField
                                id="username"
                                label="Username"
                                className={classes.textField}
                                onChange={this.handleChange('username')}
                                error={this.state.usernameError != ''}
                                helperText={this.state.usernameError}
                            />
                        </div>
                        <div>
                            <TextField
                                id="email"
                                label="Email"
                                className={classes.textField}
                                onChange={this.handleChange('email')}
                                error={this.state.emailError != ''}
                                helperText={this.state.emailError}
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
                                error={this.state.passwordError != ''}
                                helperText={this.state.passwordError}
                            />
                            <TextField
                                id="password2"
                                label="Confirm password"
                                className={classes.rightTextField}
                                onChange={this.handleChange('password2')}
                                type="password"
                                value={this.state.password2}
                                error={this.state.password2Error != ''}
                                helperText={this.state.password2Error}
                            />
                        </div>
                        <Grid
                            container
                            alignItems="center"
                            justify="space-between"
                            className={classes.submit}
                        >
                            <Grid item>
                                <Link prefetch href='/login'><a>Login</a></Link>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" type="submit">
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                )}
            </Mutation>
        )
    }
}

RegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

// Apollo
RegisterForm = withApollo(RegisterForm)

// Styles
const styles = theme => ({
    textField: {
        marginBottom: theme.spacing.unit*3,
        maxWidth: 350,
    },
    rightTextField: {
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit*3,
        maxWidth: 350,
    },
    submit: {
        marginTop: theme.spacing.unit*3,
    },
})
export default withStyles(styles)(RegisterForm)

