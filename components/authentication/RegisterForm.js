import { Mutation, withApollo } from 'react-apollo'
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

export default withApollo(RegisterForm)
