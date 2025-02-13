import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { FaSearch, FaPlus } from "react-icons/fa";
import TableDashboard from "../common/TableDashboard";
import GetAllProjects from "../../graphql/queries/Project/GetAllProject";

import Error from "../common/Error";
import { role, user } from "../../slicer/authSlice";
import ProjectDetail from "./Modal/ProjectDetail";
import { Column, Project, User } from "../global";
import { theme } from "../common/Utils";
import GetAllUsers from "../../graphql/queries/User/GetAllUsers";
import AddProject from "./Modal/AddForm/AddProject";

const columns: Column[] = [
  { id: "title", label: "Project", style: "text", metadata: {} },
  { id: "advancement", label: "Status", style: "linear-bar", metadata: {} },
  {
    id: "product_owner",
    label: "Project Manager",
    style: "multitext",
    metadata: { property: ["firstname", "lastname"] },
  },
  {
    id: "end_at",
    label: "End date",
    style: "date",
    metadata: { format: "YYYY/MM/DD" },
  },
];

export default function ProjectList() {
  const { loading, error, data } = useQuery(GetAllProjects);
  const userRole = useSelector(role);
  const userInStore = useSelector(user);
  const [users, setUsers] = useState<User[]>([]);

  const [list, setList] = useState<Project[]>([]);
  const [beMy, setByMe] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [hideDone, setHideDone] = useState(false);
  const [displayModalProjectDetails, setDisplayModalProjectDetails] =
    useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>();

  const [displayModalAddProject, setDisplayModalAddProject] = useState(false);

  const openAddProject: any = () => {
    setDisplayModalAddProject(true);
  };

  const closeModalAddProject: any = () => {
    setDisplayModalAddProject(false);
  };

  const openProject = (el: Project) => {
    setSelectedProject(el);
    setDisplayModalProjectDetails(true);
  };

  const closeModalProjectDetails = () => {
    setDisplayModalProjectDetails(false);
    setSelectedProject(null);
  };

  useQuery(GetAllUsers, {
    onCompleted: (data) => {
      setUsers(data.GetAllUsers);
    },
  });

  useEffect(() => {
    if (data) {
      let dataFiltered: Project[] = [...data.GetAllProjects];

      // Si un project est sélectionné, on le met à jour
      if (selectedProject) {
        const index = dataFiltered.findIndex(
          (el: Project) => el.id === selectedProject.id
        );
        if (index !== -1) {
          setSelectedProject(dataFiltered[index]);
        }
      }

      if (searchInput.length > 0) {
        dataFiltered = dataFiltered.filter((el: Project) =>
          el.title.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      // if (hideDone) {
      //   dataFiltered = dataFiltered.filter((el) => el.advancement < 100);
      // }

      if (beMy) {
        dataFiltered = dataFiltered.filter(
          (el) => el.product_owner.id === userInStore.id
        );
      }

      setList([...dataFiltered]);
    }
  }, [data, searchInput, hideDone, beMy]);

  return (
    <div className="relative">
      {displayModalProjectDetails && selectedProject && (
        <ProjectDetail
          project={selectedProject}
          users={users}
          closeModal={() => closeModalProjectDetails()}
        />
      )}
      {displayModalAddProject && (
        <AddProject users={users} closeModal={() => closeModalAddProject()} />
      )}
      <div
        className={`w-full ${theme(
          userRole,
          "dashboard"
        )} z-20 py-8 px-2 rounded-tr-md md:h-30`}
      >
        <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between items-center h-12">
          <div className="flex items-center flex-col space-y-2 md:space-y-0 md:flex-row">
            {/* A cabler sur le filtre de la liste  */}
            {userRole === "ROLE_PROJECT_MANAGER" && (
              <div className="mx-2 flex items-center space-x-1">
                <input
                  className="rounded-md h-5 w-5"
                  type="checkbox"
                  name="beMy"
                  id="beMy"
                  onChange={(e) => setByMe(e.target.checked)}
                />
                <label htmlFor="beMy" className="text-lh-light">
                  Managed by me only
                </label>
              </div>
            )}
            {/* <div className="mx-2 flex items-center space-x-1">
              <input
                className="rounded-md h-5 w-5"
                type="checkbox"
                name="hideDone"
                id="hideDone"
                onChange={(e) => setHideDone(e.target.checked)}
              />
              <label htmlFor="hideDone" className="text-lh-light">
                Hide done
              </label>
            </div> */}
          </div>

          <div className="flex items-center space-x-1 mr-2">
            <div className="relative flex item-centers">
              <label htmlFor="searchInput" className="sr-only">
                Recherche
              </label>
              <input
                type="text"
                id="searchInput"
                name="searchInput"
                placeholder="Search"
                className="rounded-md h-8 mx-2 px-8"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <FaSearch className="absolute top-2 left-4 text-gray-500" />
            </div>
            {userRole === "ROLE_ADMIN" && (
              <button
                onClick={() => openAddProject()}
                className=" flex bg-lh-light font-text font-bold text-lh-primary items-center p-1.5 rounded-md space-x-2"
              >
                <FaPlus className="" />
                <div className="">Add project</div>
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <Transition
          show={error ? true : false}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {error && <Error />}
        </Transition>

        <Transition
          show={!error ? true : false}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {!error && !loading && (
            <TableDashboard
              dataList={list}
              loading={loading}
              columns={columns}
              clickHandlerRow={(el: Project): void => {
                openProject(el);
              }}
            />
          )}
        </Transition>
      </div>
    </div>
  );
}
