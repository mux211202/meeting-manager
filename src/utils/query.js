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
mutation addMeetingToUser($end: DateTime, $link: String, $start: DateTime, $id: ID! $host: String, $emails: [String!]) {
  updateUser(input: {set: {meetings: {end: $end, host: $host, id: $id, link: $link, start: $start}}, filter: {email: {in: $emails } }}) {
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
}`;

const queryUsers = () => gql`
query queryUsers {
  queryUser(order: {asc: email}) {
    email
    id
  }
}
`;

const updateMeeting = gql`
mutation updateMeeting($id: [ID!], $end: DateTime, $link: String, $start: DateTime) {
  updateMeeting(input: {filter: {id: $id}, set: {end: $end, link: $link, start: $start}}) {
    meeting {
      end
      host
      id
      link
      start
    }
  }
}`;

const getMeetingUsers = gql `
subscription getMeetingUsers($id: [ID!]) {
  queryUser {
    id
    email
    meetings(filter: {id: $id}) {
      id
    }
  }
}
`

const removeMeetingFromUsers = gql `
mutation removeMeetingFromUser($emails: [String], $meetingId: ID) {
    updateUser(input: {filter: {email: {in: $emails}}, remove: {meetings: {id: $meetingId}}}) {
        user {
            email
        }
    }
}
`



export { addMeetingToUser, createUser, queryUsers, getUser, createMeeting, getMeetingUsers, updateMeeting, removeMeetingFromUsers };