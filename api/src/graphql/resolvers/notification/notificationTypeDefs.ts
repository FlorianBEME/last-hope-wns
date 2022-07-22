import { gql } from "apollo-server";

export default gql`
  type Notification {
    id: ID
    user_id: String
    is_read: Boolean
    title: String
    content: String
    type: String
    user: User
    created_at: DateTime
  }

  input UpdatedNotificationInput {
    is_read: Boolean
    title: String
    content: String
    type: String
  }

  type Query {
    GetNotificationByUserId(userId: String!): [Notification]
  }

  type Mutation {
    UpdateNotification(
      notificationId: String!
      data: UpdatedNotificationInput
    ): Notification
  }

  scalar DateTime
`;
