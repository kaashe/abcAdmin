import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ProductCategory from "../../features/products/product-category";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Product Categories" }));
  }, [dispatch]);

  return <ProductCategory />;
}

export default InternalPage;