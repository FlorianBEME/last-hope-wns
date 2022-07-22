import { useMutation } from "@apollo/client";

import UPDATE_NOTIFICATION from "../../queries/Notification/UpateNotification";
import { Notification } from "../global";
import Moment from "react-moment";
import { notificationIcone } from "../common/Utils";

interface IMyProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: IMyProps) {
  const [UpdateNotification] = useMutation(UPDATE_NOTIFICATION);
  const formatDate = "YYYY/MM/DD, hh:mm a";
  return (
    <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
      <div className="w-full bg-white pointer-events-auto overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {notificationIcone(notification.type, "h-6 w-6 text-lh-primary")}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-lh-primary">
                {notification.title}
              </p>
              <p className="mt-1 text-sm text-lh-dark">
                {notification.content}
              </p>
              <div className="mt-3 flex justify-end">
                <span className="text-sm text-lh-secondary">
                  <Moment format={formatDate}>
                    {new Date(notification.created_at)}
                  </Moment>
                </span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => {
                  UpdateNotification({
                    variables: {
                      notificationId: notification.id,
                      data: { is_read: true },
                    },
                  });
                }}
                type="button"
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close</span>

                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
