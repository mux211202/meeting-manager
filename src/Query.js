import { gql } from "@apollo/client";

const getUser = (email) => gql`
  subscription GetUser {
    queryUser(filter: {email: {eq: "${email}"}}) {
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
`;

const createMeeting = gql`
  mutation addMeeting($start: DateTime!, $end: DateTime!, $host: String!, $link: String!) {
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
`;

const createUser = gql`
  mutation addUser($email: String!) {
    addUser(input: {email: $email}) {
      user {
        email
        id
      }
    }
  }
`;

const addMeetingToUser = gql`
mutation MyMutation($end: DateTime, $link: String, $start: DateTime, $id: ID! $host: String, $userEmail: String!) {
  updateUser(input: {set: {meetings: {end: $end, host: $host, id: $id, link: $link, start: $start}}, filter: {email: {eq: $userEmail } }}) {
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