import gql from 'graphql-tag'


export default apolloClient => (
  apolloClient.query({
    query: gql`
      query getUser {
        me {
          id
          username
        }
      }
    `
  }).then(({ data }) => {
    return { loggedInUser: data.me }
  }).catch(() => {
    // Fail gracefully
    return { loggedInUser: {} }
  })
)
