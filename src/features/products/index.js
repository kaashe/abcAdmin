import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import SearchBar from "../../components/Input/SearchBar";
import { useGetProductsQuery } from "./productsSlice";

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

  const AddProduct = useCallback(() => {
    dispatch(
      openModal({
        title: "Add Product",
        bodyType: MODAL_BODY_TYPES.ADD_PRODUCT,
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
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={AddProduct}
      >
        Add
      </button>
    </div>
  );
};

function Products() {
  const { data, refetch, isLoading, isError, error } = useGetProductsQuery();
  const allProducts = data?.data?.products || [];
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const removeFilter = useCallback(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applySearch = useCallback(
    (value) => {
      let filteredData = allProducts.filter((item) =>
        item.productName.toLowerCase().includes(value.toLowerCase())
      );
      setProducts(filteredData);
    },
    [allProducts]
  );

  const handleOnRowClick = (product) => {
    const productid = product?._id;
    dispatch(
      openModal({
        title: "Edit Product",
        bodyType: MODAL_BODY_TYPES.ADD_PRODUCT,
        extraObject: { productid },
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
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Sr#</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Review %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer hover"
                    onClick={() => handleOnRowClick(product)}
                  >
                    <td>{index + 1}</td>
                    <td>{product.productName}</td>
                    <td>{product.category.categoryName}</td>
                    <td>{product.productReviewPercentage}</td>
                    <td>{product.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </TitleCard>
    </>
  );
}

export default Products;
