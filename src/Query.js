import { gql } from "@apollo/client";

const getUser = (email) => gql`
  subscription GetUser {
    queryUser(filter: {email: {eq: "${email}"}}) {
      email
      id
      name
      meetings {
        start
        link
        id
        host
        end
      }
    }
  }
`;

const createMeeting = gql`
  mutation sendMessage($start: String!, $end: String!, $host: String!, $link: String!) {
    addMeeting(input: [{ start: $start, end: $end, host: $host, link: $link }]) {
      meeting {
        end
        host
        id
        link
        start
      }
    }
  }
`


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

// TODO: refactor ids
const addMeetingToUser = gql`
mutation MyMutation($end: String, $link: String, $start: String, $id: ID! $host: String, $userId: [ID!]) {
  updateUser(input: {set: {meetings: {end: $end, host: $host, id: $id, link: $link, start: $start}}, filter: {id: $userId}}) {
    user {
      email
      id
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
`;

export { addMeetingToUser, createUser, getUser, createMeeting };