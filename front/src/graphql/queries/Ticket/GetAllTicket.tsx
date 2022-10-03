import { gql } from "@apollo/client";

const getAllTickets = gql`
  query Query {
    GetAllTickets {
      id
      title
      project {
        id
        title
      }
      description
      due_at
      estimated_time
      advancement
      ticketUser {
        id
        user {
          id
          lastname
          firstname
          roles
        }
      }
      state_id
      state {
        name
      }
    }
  }
`;

export default getAllTickets;
