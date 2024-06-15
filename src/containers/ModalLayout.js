import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import AddRolesModalBody from "../features/roles/roles/components/AddRolesModalBody";
import AddProductModalBody from "../features/products/components/AddProductModalBody";
import ActiveteUserModalBody from "../features/users/component/ActiveteUserModalBody";
import AddProductCategoryModalBody from "../features/products/product-category/components/AddProductCategoryModalBody";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };
  return (
    <>
      {/* The button to open modal */}
      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>
          {/* Loading modal body according to different modal type */}
          {
            {
              
              [MODAL_BODY_TYPES.ABDAR]: (
                <AddRolesModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_PRODUCT]: (
                <AddProductModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_PRODUCT_CATEGORY]: (
                <AddProductCategoryModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_SIZE]: (
                <ActiveteUserModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}
export default ModalLayout;
