import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import ErrorText from "../../../components/Typography/ErrorText";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import { openModal } from "../../common/modalSlice";
import SearchBar from "../../../components/Input/SearchBar";
import { useGetRolesQuery } from "./rolesSlice";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Pagination from "../../../components/Pagination/Pagination";
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
        title: "Add Role",
        bodyType: MODAL_BODY_TYPES.ABDAR,
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
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => addNewRole()}
      >
        Add
      </button>
    </div>
  );
};

function Roles() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isError, error } = useGetRolesQuery(currentPage);
  const allRoles = data?.results;
  const totalPages = data?.totalPages;
  const [roles, setRoles] = useState(allRoles);
  const dispatch = useDispatch();

  useEffect(() => {
    setRoles(allRoles);
  }, [allRoles]);
  const removeFilter = useCallback(() => {
    setRoles(allRoles);
  }, [allRoles]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const applySearch = useCallback(
    (value) => {
      let filteredData = allRoles.filter((item) =>
        item?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setRoles(filteredData);
    },
    [allRoles]
  );
  const handleOnRowClick = (role) => {
    const roleId = role?.id;
    dispatch(
      openModal({
        title: "Edit Role",
        bodyType: MODAL_BODY_TYPES.ABDAR,
        extraObject: { roleId },
      })
    );
  };
  const handleDelete = (id, event) => {
    event.stopPropagation();
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this Role?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ROLE_DELETE,
          id,
        },
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
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sr#</th>
                <th>Role Name</th>
                <th>Arabic Name</th>
              </tr>
            </thead>
            <tbody>
              {isError ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <ErrorText>
                      {error?.data?.message || "An error occurred"}
                    </ErrorText>
                  </td>
                </tr>
              ) : (
                roles?.map((role, index) => {
                  return (
                    <tr
                      key={index}
                      className="cursor-pointer hover"
                      onClick={() => handleOnRowClick(role)}
                    >
                      <td>{index + 1}</td>
                      <td>{role?.name}</td>
                      <td>{role?.nameAr}</td>

                      <td>
                        <button
                          className="btn btn-xs btn-square btn-ghost"
                          onClick={(event) => handleDelete(role?.id, event)}
                        >
                          <TrashIcon className="w-5 text-error" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {totalPages > 1 && <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />} 
        </div>
      </TitleCard>
    </>
  );
}

export default Roles;
