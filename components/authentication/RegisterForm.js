/*import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import redirect from '../../lib/redirect'


const CREATE_USER = gql`
    mutation Create($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password ) {
            user {
                id
            }
        }
    }`

const RegisterForm = ({ client }) => {
  let firstName, lastName, username, email, password

  return (
    <Mutation mutation={CREATE_USER} onCompleted={(data) => {
      // Store the token in cookie
      //document.cookie = cookie.serialize('token', data.signinUser.token, {
      //  maxAge: 30 * 24 * 60 * 60 // 30 days
      //})
      // Force a reload of all the current queries now that the user is
      // logged in
      client.cache.reset().then(() => {
        redirect({}, '/' + data.createUser.user.id)
      })
    }} onError={(error) => {
      // If you want to send error to external service?
      console.log(error)
    }}>
      {(create, { data, error }) => (
        <form onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()

          create({
            variables: {
              firstName: firstName.value,
              lastName: lastName.value,
              username: username.value,
              email: email.value,
              password: password.value
            }
          })

            firstName.value = lastName.value = username.value = email.value = password.value = ''
        }}>
          {error && <p>Issue occured while registering</p>}
          <input name='firstName' placeholder='First Name' ref={node => { firstName = node }} /><br />
          <input name='lastName' placeholder='Last Name' ref={node => { lastName = node }} /><br />
          <input name='username' placeholder='Username' ref={node => { username = node }} /><br />
          <input name='email' placeholder='Email' ref={node => { email = node }} /><br />
          <input name='password' placeholder='Password' ref={node => { password = node }} type='password' /><br />
          <button>Register</button>
        </form>
      )}

    </Mutation>
  )
}

export default withApollo(RegisterForm)*/



import React from 'react'
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../../lib/redirect'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const CREATE_USER = gql`
    mutation Create($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password ) {
            user {
                id
            }
        }
    }`

class RegisterForm extends React.Component {
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    }

    render() {
        const { classes, client } = this.props;

        return (
            <Mutation mutation={CREATE_USER} onCompleted={(data) => {
                client.cache.reset().then(() => {
                    redirect({}, '/' + data.createUser.user.id)
                })
            }} onError={(error) => {
                console.log(error)
            }}>
                {(create, { data, error }) => (

                    <form
                        className={classes.container}
                        onSubmit={e => {
                            e.preventDefault()
                            e.stopPropagation()

                            if(this.state.password == this.state.password2) {
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
                        <TextField
                            id="firstName"
                            label="First name"
                            className={classes.textField}
                            onChange={this.handleChange('firstName')}
                        /><br/>
                        <TextField
                            id="lastName"
                            label="Last name"
                            className={classes.textField}
                            onChange={this.handleChange('lastName')}
                        /><br/>
                        <TextField
                            id="username"
                            label="Username"
                            className={classes.textField}
                            onChange={this.handleChange('username')}
                        /><br/>
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            onChange={this.handleChange('email')}
                        /><br/>
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            onChange={this.handleChange('password')}
                            type="password"
                            value={this.state.password}
                        /><br/>
                        <TextField
                            id="password2"
                            label="Confirm password"
                            className={classes.textField}
                            onChange={this.handleChange('password2')}
                            type="password"
                            value={this.state.password2}
                        /><br/>
                        <Button variant="contained" color="secondary" type="submit">
                            Register
                        </Button><br/><br/>
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
        width: 200,
    },
    menu: {
        width: 200,
    },
})
export default withStyles(styles)(RegisterForm)

