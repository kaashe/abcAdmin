import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import SearchBar from "../../components/Input/SearchBar";
import { useGetUsersQuery } from "./usersSlice";
import { useUsers } from "../../app/custom-hooks/users/useUsers";
import { showNotification } from "../common/headerSlice";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

const TopSideButtons = ({ removeAppliedFilter, applySearch }) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText, applySearch, removeAppliedFilter]);
  const addNewRole = () => {
    dispatch(
      openModal({
        title: "Add USer",
        bodyType: MODAL_BODY_TYPES.ADD_USER,
        extraObject: {},
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      <button
        className="bg-[#6D4E8A] btn px-6 btn-sm normal-case text-white btn-purple"
        onClick={() => addNewRole()}
      >
        Add
      </button>
    </div>
  );
};
function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const {
    data: usersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();
  const {
    deleteSingleUser,
    deleteIsLoading,
    deleteIsSuccess,
    deleteIsError,
    deleteError,
  } = useUsers();

  const allUsers = usersData?.data?.data;
  // Dummy data for users
  const { updateSingleUser, updateIsLoading, updateIsSuccess } = useUsers();
  const [users, setUsers] = useState(allUsers);
console.log(users,"users")
  const removeFilter = useCallback(() => {
    setUsers(allUsers);
  }, [allUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleDelete = async (id) => {
    // console.log(id, "idddd");
    await deleteSingleUser(id);
  };

  const applySearch = useCallback(
    (value) => {
      let filteredData = allUsers?.filter((item) =>
        item.fullname.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(filteredData);
    },
    [allUsers]
  );
  const handleStatus = async (item, event) => {
    console.log(item, "user");
    event.stopPropagation();
    const payload = {
      status: item?.isApproved === true ? "Inactive" : "Active",
      isApproved: item?.isApproved === true ? false : true,
    };
    await updateSingleUser(item?._id, payload);
  };
  const handleOnRowClick = (user) => {
    const userId = user?._id;
    dispatch(
      openModal({
        title: "Edit User",
        bodyType: MODAL_BODY_TYPES.ADD_USER,
        extraObject: { userId },
        // size: "lg",
      })
    );
  };
  useEffect(() => {
    if (updateIsSuccess) {
      dispatch(showNotification({ message: "User Updated!", status: 1 }));
    } else if (deleteIsSuccess) {
      dispatch(showNotification({ message: "User Deleted!", status: 1 }));
      refetch();
    }
  }, [updateIsSuccess, dispatch, refetch, deleteIsSuccess]);
  return (
    <>
      <TitleCard
        title=""
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            removeAppliedFilter={removeFilter}
          />
        }
      >
        <div className="overflow-x-auto w-full">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : isError ? (
            <div className="text-center py-4 text-red-500">
              {error?.data?.message || "An error occurred"}
            </div>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Sr#</th>
                  <th>User Name</th>
                  <th>Balance</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className="cursor-pointer hover"
                      // onClick={() => handleOnRowClick(user)}
                    >
                      <td>{index + 1}</td>
                      <td>{user.fullname}</td>
                      <td>{user.balance}</td>
                      <td>{user.role}</td>
                      <td>
                        <div
                          className={`tooltip ${
                            user?.isActive === true
                              ? "tooltip-error"
                              : "tooltip-success"
                          }`}
                          // data-tip={
                          //   user?.isActive === true
                          //     ? `Make ${user?.type?.name} Inactive`
                          //     : `Make ${user?.type?.name} Active`
                          // }
                        >
                          <input
                            type="checkbox"
                            className="toggle toggle-sm toggle-success"
                            disabled={updateIsLoading}
                            checked={user?.isApproved === true}
                            onClick={(event) => handleStatus(user, event)}
                          />
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-xs btn-square btn-ghost"
                          onClick={() => handleOnRowClick(user)}
                          >
                          <AiTwotoneEdit
                            style={{ fontSize: "1.2rem" }}
                            className=" text-success"
                          />
                        </button>
                        <button
                          className="btn btn-xs btn-square btn-ghost"
                          onClick={() => handleDelete(user?._id)}
                        >
                          <FaRegTrashAlt
                            className="text-xl text-red-500"
                          />
                        </button>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </TitleCard>
    </>
  );
}

export default Users;
