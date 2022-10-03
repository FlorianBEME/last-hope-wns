/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

import {
  FaCalendarDay,
  FaCalendarCheck,
  FaRegUserCircle,
} from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation } from "@apollo/client";

import "../../../../assets/css/addProject.css";
import { User, UserParticipant } from "../../../global";
import { useSelector } from "react-redux";
import { role } from "../../../../slicer/authSlice";
import { roleList } from "../../../common/Utils";

import { AiFillSetting, AiOutlineClose } from "react-icons/ai";
import AddMemberToProject from "./AddMemberToProject";
import AddProjectMutation from "../../../../graphql/mutation/Project/AddProjectMutation";
import getAllProjects from "../../../../graphql/queries/Project/GetAllProject";
import { notify } from "../../../common/Utils";

type Props = {
  users: User[];
  closeModal: () => void;
};

function AddProject({ users, closeModal }: Props) {
  const userRole = useSelector(role);
  const [addProject, { data, loading, error }]: any = useMutation(
    AddProjectMutation,
    {
      refetchQueries: [{ query: getAllProjects }],
    }
  );

  const [modalAssignee, setModalAssignee] = useState(false);

  const [usersAssignee, setUsersAssignee] = useState<any[]>([]);

  const [dataProject, setDataProject] = useState({});

  const [productOwnerIdSelected, setProductOwnerIdSelected] = useState();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDataProject({ ...dataProject, [e.target.name]: e.target.value });
  };

  const openModal = (modal: string) => {
    if (modal === "assignee") {
      setModalAssignee(true);
    }
  };

  const addUserToProject = (user: any) => {
    setUsersAssignee([
      ...usersAssignee,
      { userId: user.id, firstname: user.firstname, lastname: user.lastname },
    ]);
  };

  const deleteUserToProject = (user: any) => {
    const index: number = usersAssignee.findIndex(
      (userAssignee) => user.userId === userAssignee.userId
    );

    let result = [...usersAssignee];

    if (index !== -1) {
      setUsersAssignee([...result.splice(index + 1, 1)]);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let participants: { userId: string }[] = [];
    usersAssignee.forEach((user) => participants.push({ userId: user.userId }));

    let dataProjectUsers = { ...dataProject, participants: participants };

    addProject({
      variables: {
        data: { ...dataProjectUsers },
      },
      onCompleted: () => {
        closeModal();
        notify("success", "Successfuly project added");
      },
      onError: () => {
        notify("error", "Error during adding a project");
      },
    });
  };

  return (
    <>
      {modalAssignee && (
        <AddMemberToProject
          closeModal={() => setModalAssignee(false)}
          addUser={(user) => addUserToProject(user)}
          deleteUser={(user) => deleteUserToProject(user)}
          usersAssignee={usersAssignee}
        />
      )}
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "
            onClick={() => closeModal()}
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="add-modal inline-block align-bottom text-left transform transition-all sm:align-middle project-modal">
            <div className=" bg-lh-primary text-xl h-12 font-text text-lh-light w-fit px-3 flex justify-center items-center rounded-t-lg">
              <div>{`Add a project`}</div>
            </div>
            <div className=" relative bg-white rounded-lg text-left overflow-hidden transform transition-all project-modal-inside">
              <div
                className="absolute right-2 top-2 text-lh-primary cursor-pointer"
                onClick={() => closeModal()}
              >
                <AiOutlineClose size={30} />
              </div>
              <div className="add-project-modal p-4 sm:pl-6 sm:pr-6">
                <form onSubmit={(e) => handleSubmit(e)}>
                  {/* TITLE */}
                  <div className="part add-title flex flex-col mb-4">
                    <label className="text-lh-primary mb-1.5 text-2xl">
                      Title
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="title"
                      id="title"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="part add-desc flex flex-col mb-4">
                    <label className="text-lh-primary mb-1.5 text-2xl">
                      Description
                    </label>
                    <textarea
                      onChange={(e) => handleChange(e)}
                      name="description"
                      id="description"
                    />
                  </div>

                  {/* PROJECT OWNER */}
                  <div className="part add-p-owner flex flex-col mb-4">
                    <label className="text-lh-primary mb-1.5 text-2xl">
                      Project Owner
                    </label>
                    {(userRole === roleList[1] || userRole === roleList[2]) && (
                      <div className="flex items-center">
                        <select
                          name="product_owner_id"
                          className="bg-lh-light border-2 border-lh-dark py-1 px-1.5 mr-5 select-product-owner cursor-pointer"
                          onChange={(e) => handleChange(e)}
                        >
                          <option selected disabled>
                            Choose here
                          </option>
                          {users
                            .filter(
                              (user: any) =>
                                user.roles === roleList[1] ||
                                user.roles === roleList[2]
                            )
                            .map((user: User) => (
                              <option value={user.id} key={user.id}>
                                {user.firstname} {user.lastname}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* MEMBERS */}
                  <div className="part add-members mb-4">
                    <div className="flex items-center mb-1.5">
                      <label className="text-lh-primary text-2xl mr-2">
                        Members
                      </label>
                      <AiFillSetting
                        onClick={() => openModal("assignee")}
                        className="text-lh-primary cursor-pointer hover:opacity-90 transition-opacity text-2xl"
                      />
                    </div>

                    <div className="flex flex-wrap space-x-4">
                      {usersAssignee.map((user: User) => {
                        return (
                          <div
                            key={user.id}
                            className="font_weight_400 font-text text-xl	flex items-center space-x-1"
                          >
                            <FaRegUserCircle size={30} />
                            <span>{user.firstname}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* DATE */}
                  <div className="part add-date flex flex-col">
                    <label className="text-lh-primary mb-1.5 text-2xl start-date">
                      Start date
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="date"
                      name="start_at"
                      id="start_at"
                    />

                    <label className="text-lh-primary mb-1.5 text-2xl end-date">
                      End date
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="date"
                      name="end_at"
                      id="end_at"
                    />
                  </div>

                  <div className="add-project-submit flex justify-end w-full mt-2">
                    <button
                      type="submit"
                      className="bg-lh-primary w-fit font-title text-lh-light text-2xl py-1.5 px-3 space-x-2 items-center rounded mt-2"
                    >
                      Add project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProject;
