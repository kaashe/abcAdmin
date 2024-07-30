import React, { useCallback, useEffect, useState } from "react";
import { useGetWithdrawsQuery } from "./withDrawSlice";
import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import SearchBar from "../../components/Input/SearchBar";
import TitleCard from "../../components/Cards/TitleCard";
import { AiTwotoneEdit } from "react-icons/ai";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useWithdraws } from "../../app/custom-hooks/withdraw/usewithDraw";

const TopSideButtons = ({ removeAppliedFilter, applySearch }) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  const AddProduct = useCallback(() => {
    dispatch(
      openModal({
        title: "Withdraw",
        bodyType: MODAL_BODY_TYPES.WITHDRAW_DETAILS,
        extraObject: {},
      })
    );
  }, [dispatch]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {/* <button
        className="bg-[#6D4E8A] btn px-6 btn-sm normal-case text-white btn-purple"
        onClick={AddProduct}
      >
        Add
      </button> */}
    </div>
  );
};

const Withdraw = () => {
  const dispatch = useDispatch();
  const { data, refetch, isLoading, isError, error } = useGetWithdrawsQuery();
  const allWithdraws = data?.data?.withdrawals || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [withdraws, setWithdraws] = useState(allWithdraws);
  const {
    approveWithdraw,
    approveIsLoading,
    approveIsSuccess,
    approveIsError,
    approveError,
  } = useWithdraws();

  const handleApprove = async (item, event) => {
    event.stopPropagation();
    console.log(item);
    // const payload = {
    //   isActive: item?.isActive === true ? false : true,
    // };
    await approveWithdraw(item?._id);
  };
  useEffect(() => {
    setWithdraws(allWithdraws);
  }, [allWithdraws]);

  const removeFilter = useCallback(() => {
    setWithdraws(allWithdraws);
  }, [allWithdraws]);

  const applySearch = useCallback(
    (value) => {
      let filteredData = allWithdraws.filter((item) =>
        item?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setWithdraws(filteredData);
    },
    [allWithdraws]
  );

  const handleOnRowClick = (withdraw) => {
    const withdrawid = withdraw?._id;
    dispatch(
      openModal({
        title: "Withdraw Details",
        bodyType: MODAL_BODY_TYPES.WITHDRAW_DETAILS,
        extraObject: { withdrawid },
      })
    );
  };

  return (
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
                <th>Amount</th>
                <th>Name</th>
                <th>Email</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {withdraws?.map((withdraw, index) => (
                <tr key={index} className="cursor-pointer hover">
                  <td>{index + 1}</td>
                  <td>{withdraw?.amount}</td>
                  <td>{withdraw?.name}</td>
                  <td>{withdraw?.email}</td>
                  <td>{withdraw?.payment || withdraw?.paymentMethod}</td>
                  <td>{withdraw?.status}</td>
                  <td>
                    <div
                      className={`tooltip ${
                        withdraw?.status === "approved"
                          ? "tooltip-error"
                          : "tooltip-success"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="toggle toggle-sm toggle-success"
                        disabled={approveIsLoading}
                        checked={withdraw?.status === "approved"}
                        onClick={(event) => handleApprove(withdraw, event)}
                      />
                    </div>
                  </td>
                  {/* <td>
                    <button
                      className="btn btn-sm btn-square btn-ghost"
                      // onClick={(event) => handleDelete(withdraw?._id, event)}
                    >
                      <TrashIcon className="w-5 text-error" />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </TitleCard>
  );
};

export default Withdraw;
