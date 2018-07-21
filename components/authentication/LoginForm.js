import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../../lib/redirect'


const SIGN_IN = gql`
    mutation Signin($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`

const LoginForm = ({ client }) => {
  let username, password

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
        <form onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()

          tokenAuth({
            variables: {
              username: username.value,
              password: password.value
            }
          })

            username.value = password.value = ''
        }}>
          {error && <p>No user found with that information.</p>}
          <input name='username' placeholder='Username' ref={node => { username = node }} /><br />
          <input name='password' placeholder='Password' ref={node => { password = node }} type='password' /><br />
          <button>Sign in</button>
        </form>
      )}
    </Mutation>
  )
}

export default withApollo(LoginForm)
