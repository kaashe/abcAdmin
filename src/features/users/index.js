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
  const {data,refetch} = useGetUsersQuery();
  const dispatch = useDispatch();

  // Dummy data for users
  const dummyUsers = [
    { id: 1, name: "John Doe", status: true },
    { id: 2, name: "Jane Smith", status: true },
    { id: 3, name: "Alice Johnson", status: true },
    { id: 4, name: "Chris Lee", status: false },
    { id: 5, name: "Emily Davis", status: true },
    { id: 6, name: "Michael Brown", status: false },
    { id: 7, name: "Jessica Wilson", status: true },
    { id: 8, name: "Daniel Martinez", status: false },
    { id: 9, name: "Laura Garcia", status: true },
    { id: 10, name: "David Anderson", status: false },
  ];

  const [roles, setRoles] = useState(dummyUsers);

  const removeFilter = useCallback(() => {
    setRoles(dummyUsers);
  }, [dummyUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applySearch = useCallback(
    (value) => {
      let filteredData = dummyUsers.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setRoles(filteredData);
    },
    [dummyUsers]
  );
  const handleStatus = async (item, event) => {
    event.stopPropagation();
    const payload = {
      isActive: item?.isActive === true ? false : true,
    };
    // await updateSingleAdBanner(item?.id, payload);
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
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sr#</th>
                <th>User Name</th>
                <th>Activate</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => {
                return (
                  <tr key={index} className="cursor-pointer hover">
                    <td>{index + 1}</td>
                    <td>{role.name}</td>
                    <td>
                  <input type="checkbox" className="toggle toggle-sm toggle-success"  /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Users;
