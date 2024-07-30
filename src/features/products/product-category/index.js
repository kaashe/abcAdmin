import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import ErrorText from "../../../components/Typography/ErrorText";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import { useGetCategoriesQuery } from './productCategorySlice';
import { openModal } from "../../common/modalSlice";
import SearchBar from "../../../components/Input/SearchBar";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Pagination from "../../../components/Pagination/Pagination";
import { useProductCategory } from "../../../app/custom-hooks/products-category/useProductCategory";
import { showNotification } from "../../common/headerSlice";
import { AiTwotoneEdit } from "react-icons/ai";
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
  const addNew = () => {
    dispatch(
      openModal({
        title: "Add Product Category",
        bodyType: MODAL_BODY_TYPES.ADD_PRODUCT_CATEGORY,
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
        className=" bg-[#6D4E8A]  btn px-6 btn-sm normal-case text-white btn-purple"
        onClick={() => addNew()}
      >
        Add Category
      </button>
    </div>
  );
};

function ProductCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isError, isLoading, error , refetch } = useGetCategoriesQuery(currentPage);
  const allCategories = data?.data?.categories;
  const totalPages = data?.totalPages;
  const [categories, setCategories] = useState(allCategories);
  const dispatch = useDispatch();

  const {
    updateSingleCategory,
    updateIsLoading,
    updateIsSuccess,
    updateIsError,
    updateError,
    deleteSingleCategory,
    deleteCategoryIsLoading,
    deleteCategoryIsSuccess,
    deleteCategoryIsError,
    deleteCategoryError,
  } = useProductCategory();



  useEffect(() => {
    setCategories(allCategories);
  }, [allCategories, setCategories]);

  const removeFilter = useCallback(() => {
    setCategories(allCategories);
  }, [allCategories]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applySearch = useCallback(
    (value) => {
      let filteredData = allCategories?.filter((item) =>
        item?.categoryName?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setCategories(filteredData);
    },
    [allCategories]
  );
  const handleOnRowClick = (category) => {
    const categoryId = category?._id;
    console.log(category,"category")
    dispatch(
      openModal({
        title: "Edit Product Category",
        bodyType: MODAL_BODY_TYPES.ADD_PRODUCT_CATEGORY,
        extraObject: { categoryId },
      })
    );
  };
  const handleDelete = async (id) => {
    // console.log(id, "idddd");
    await deleteSingleCategory(id);
  };
  useEffect(() => {
    // if (updateIsSuccess) {
    //   dispatch(showNotification({ message: "User Updated!", status: 1 }));
    // } else
     if (deleteCategoryIsSuccess) {
      dispatch(showNotification({ message: "User Deleted!", status: 1 }));
      refetch();
    }
  }, [ dispatch, refetch, deleteCategoryIsSuccess]);
  // const handleDelete = (id, event) => {
  //   event.stopPropagation();
  //   dispatch(
  //     openModal({
  //       title: "Confirmation",
  //       bodyType: MODAL_BODY_TYPES.CONFIRMATION,
  //       extraObject: {
  //         message: `Are you sure you want to delete this Category?`,
  //         type: CONFIRMATION_MODAL_CLOSE_TYPES.PRODUCT_CATEGORY_DELETE,
  //         id,
  //       },
  //     })
  //   );
  // };

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
        <div className="overflow-x-auto w-full ">
          <div className="flex-grow overflow-auto">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) :
              isError ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <ErrorText>
                      {error?.data?.message || "An error occurred"}
                    </ErrorText>
                  </td>
                </tr>
              ) : (
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Status</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories?.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className="cursor-pointer hover"
                          >
                            <td>{item?.categoryName}</td>
                            <td>{item?.status === "active" ? "Active" : "Inactive"}</td>

                            <td>
                            <button
                          className="btn btn-xs btn-square btn-ghost"
                          onClick={() => handleOnRowClick(item)}
                          >
                          <AiTwotoneEdit
                            style={{ fontSize: "1.2rem" }}
                            className=" text-success"
                          />
                        </button>
                              <button
                                className="btn btn-xs btn-square btn-ghost"
                                onClick={(event) => handleDelete(item?._id, event)}
                              >
                                <TrashIcon className="w-5 text-error" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              )}
          </div>
          <div className="flex-shrink-0 flex justify-center items-center">
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default ProductCategory;
