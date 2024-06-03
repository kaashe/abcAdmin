import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { useGetMembersQuery } from "./membersSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import { openModal } from "../../common/modalSlice";
import SearchBar from "../../../components/Input/SearchBar";
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
  const addNewMember = () => {
    dispatch(
      openModal({
        title: "Add Member",
        bodyType: MODAL_BODY_TYPES.ADD_MEMBER,
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
        onClick={() => addNewMember()}
      >
        Add
      </button>
    </div>
  );
};

function Members() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isError, error } = useGetMembersQuery(currentPage);
  const allMembers = data?.results;
  const totalPages = data?.totalPages;
  const [members, setMembers] = useState(allMembers);
  useEffect(() => {
    setMembers(allMembers);
  }, [allMembers]);

  const removeFilter = useCallback(() => {
    setMembers(allMembers);
  }, [allMembers]);

  const applySearch = useCallback(
    (value) => {
      let filteredData = allMembers.filter((item) =>
        item?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setMembers(filteredData);
    },
    [allMembers]
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                <th>Name</th>
                <th>Email Id</th>
                <th>Role</th>
                <th>Status</th>
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
                members?.map((l, k) => {
                  return (
                    <tr key={k} className="hover">
                      <td>{k + 1}</td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{l?.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{l?.email}</td>
                      <td>{l?.role?.name}</td>
                      <td>
                        {l?.isEmailVerified === true ? (
                          <div className="badge badge-accent">Verified</div>
                        ) : (
                          <div className="badge badge-secondary">
                            Unverified
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {totalPages > 1 &&
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          }
        </div>
      </TitleCard>
    </>
  );
}

export default Members;
