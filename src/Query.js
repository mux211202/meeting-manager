import { gql } from "@apollo/client";

const getUser = (id) => gql`
  subscription GetUser {
    queryUser(filter: {id: "${id}"}) {
      name
      id
      email
    }
  }
`;



const createUser = ({email, name}) => gql`
  mutation AddUser{
    addUser(input: {email: "${email}", name: "${name}"}) {
      user {
        email
        id
        name
      }
    }
  }
`;

const addMeetingToUser = ({end, start, host, id, link}, user) => gql`
  mutation UpdateUser {
    updateUser(input: {filter: {id: "${user}"}, set: {meetings: {end: "${end}", host: "${host}", id: "${id}", link: "${link}", start: "${start}"}}}) {
      user {
        meetings {
          start
          link
          id
          host
          end
        }
      }
    }
  }
`

export { addMeetingToUser, createUser, getUser };