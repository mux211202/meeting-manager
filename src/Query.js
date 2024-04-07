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
mutation addMeetingToUser($end: DateTime, $link: String, $start: DateTime, $id: ID! $host: String, $userEmail: String!) {
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

const filterUserByEmail = (email) => gql`
query filterUserByEmail {
  queryUser(filter: {email: {regexp: "/.*${email}.*/"}}, order: {asc: email}) {
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

const removeMeetingFromUser = gql `
mutation removeMeetingFromUser($email: String, $meetingId: ID) {
    updateUser(input: {filter: {email: {eq: $email}}, remove: {meetings: {id: $meetingId}}}) {
        user {
            email
        }
    }
}
`



export { addMeetingToUser, createUser, filterUserByEmail, getUser, createMeeting, getMeetingUsers, updateMeeting, removeMeetingFromUser };