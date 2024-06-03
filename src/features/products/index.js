import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import SearchBar from "../../components/Input/SearchBar";

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
  const AddProduct = () => {
    dispatch(
      openModal({
        title: "Add Product",
        bodyType: MODAL_BODY_TYPES.ADD_PRODUCT,
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
        onClick={() => AddProduct()}
      >
        Add
      </button>
    </div>
  );
};

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  // Dummy data for products
  const dummyProducts = [
    { id: 1, name: "Product 1", price: 10,  },
    { id: 2, name: "Product 2", price: 20, },
    { id: 3, name: "Product 3", price: 30,  },
    { id: 4, name: "Product 4", price: 40,  },
    { id: 5, name: "Product 5", price: 50, },
    { id: 6, name: "Product 6", price: 60,  },
    { id: 7, name: "Product 7", price: 70, },
    { id: 8, name: "Product 8", price: 80,  },
    { id: 9, name: "Product 9", price: 90, },
    { id: 10, name: "Product 10", price: 100,  },
  ];

  const [products, setProducts] = useState(dummyProducts);

  const removeFilter = useCallback(() => {
    setProducts(dummyProducts);
  }, [dummyProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applySearch = useCallback(
    (value) => {
      let filteredData = dummyProducts.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setProducts(filteredData);
    },
    [dummyProducts]
  );

  const handleOnRowClick = (product) => {
    dispatch(
      openModal({
        title: "Product Details",
        bodyType: MODAL_BODY_TYPES.ADD_PRODUCT,
        extraObject: product,
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
                <th>Product Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="cursor-pointer hover"
                  onClick={() => handleOnRowClick(product)}
                >
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
               
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Products;
