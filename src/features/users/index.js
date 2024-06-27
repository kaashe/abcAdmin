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

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {/* <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => addSize()}
      >
        Add
      </button> */}
    </div>
  );
};

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { data: usersData,isLoading,isError,error } = useGetUsersQuery();
  const allUsers = usersData?.data?.data;
  console.log(allUsers, 'all users');
  // Dummy data for users
  const { updateSingleUser, updateIsLoading } = useUsers();
  const [users, setUsers] = useState(allUsers);

  const removeFilter = useCallback(() => {
    setUsers(allUsers);
  }, [allUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applySearch = useCallback(
    (value) => {
      let filteredData = allUsers.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(filteredData);
    },
    [allUsers]
  );
  const handleStatus = async (item, event) => {
    console.log(item);
    event.stopPropagation();
    const payload = {
      activate: item?.isApproved === true ? false : true,
    };
    await updateSingleUser(item?.id, payload);
  };
  const handleOnRowClick = () => {
    dispatch(
      openModal({
        title: "User Details",
        bodyType: MODAL_BODY_TYPES.ADD_SIZE,
        extraObject: {},
      })
    );
  };
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
          ) : (<table className="table w-full">
            <thead>
              <tr>
                <th>Sr#</th>
                <th>User Name</th>
                <th>Balance</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr key={index} className="cursor-pointer hover">
                    <td>{index + 1}</td>
                    <td>{user.fullname}</td>
                    <td>{user.balance}</td>
                    <td>{user.role}</td>
                    <td>
                      <div
                        className={`tooltip ${user?.isActive === true
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
                          // disabled={updateIsLoading}
                          checked={user?.isApproved === true}
                          onClick={(event) => handleStatus(user, event)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>)}
        </div>
      </TitleCard>
    </>
  );
}

export default Users;
