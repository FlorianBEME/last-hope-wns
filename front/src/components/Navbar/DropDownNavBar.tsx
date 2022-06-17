import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";

import Logo from "../../assets/img/logo_LastHope_inline.png";
import "../../assets/styles/navbar.css";
import NotificationItem from "./NotificationItem";
import GetNotificationByUserId from "../../queries/Notification/GetNotificationByUserId";

import { FaLaptopCode } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { myId } from "../../slicer/authSlice";

type Notification = {
  id: string;
  is_read: Boolean;
  data: JSON;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownNavBar() {
  const [notificationsList, setNotificationsList] = useState<Notification[]>(
    []
  );
  const userId = useSelector(myId);
  const { loading, error, data } = useQuery(GetNotificationByUserId, {
    variables: { userId: userId },
  });
  const [notificationsUnread, setNotificationsUnread] = useState<Number>(0);

  useEffect(() => {
    if (data) {
      const notifications = [...data.GetNotificationByUserId];
      setNotificationsList(notifications);
      setNotificationsUnread(
        notifications.filter((el: Notification) => el.is_read === false).length
      );
    }
  }, [data]);

  return (
    <nav className="py-4 px-10 shadow-md flex justify-between mb-10">
      <Link to="/dashboard">
        <img src={Logo} alt="logo-last-hope" className="w-40" />
      </Link>
      <div className="flex items-stretch ">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="h-full account rounded-l-lg inline-flex justify-center gap-x-2 items-center p-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-lh-primary">
            <FaLaptopCode color="var(--primary-color)" size={18} /> John Doe
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-75"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-lh-dark",
                        "flex items-center gap-x-2 px-4 py-2 text-md"
                      )}
                    >
                      <VscAccount size={18} color="var(--primary-color)" />
                      Profil
                    </a>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active ? "bg-gray-100 text-lh-dark" : "text-gray-700",
                          "flex items-center gap-x-2 w-full text-left px-4 py-2 text-md"
                        )}
                      >
                        <RiLogoutBoxLine
                          size={18}
                          color="var(--primary-color)"
                        />
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="notifications rounded-r-lg inline-flex justify-center gap-x-1 items-center shadow-sm p-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-lh-primary">
            <span className="relative">
              <IoIosNotifications size={26} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {notificationsUnread.toString()}
              </span>
            </span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-75"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-sm bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {notificationsList.length > 0 && !loading && !error ? (
                notificationsList.map((notification: Notification) => {
                  return (
                    <div className="py-1 border-b-2">
                      <NotificationItem notification={notification} />
                    </div>
                  );
                })
              ) : (
                <div className="text-lh-dark flex items-center justify-center gap-x-2 p-8 text-md">
                  Aucune notification disponible
                </div>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
}
