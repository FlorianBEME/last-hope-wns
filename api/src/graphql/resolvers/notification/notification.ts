import UpdateNotification from "./mutations/UpdateNotification";
import GetNotificationByUserId from "./queries/GetNotificationByUserId";

export default {
  Query: { GetNotificationByUserId },
  Mutation: { UpdateNotification },
};
