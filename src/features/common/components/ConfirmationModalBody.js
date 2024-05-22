import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../headerSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch()

 

  const { message, type, id } = extraObject;


  useEffect(() => {
  
      dispatch(showNotification({ message: "Item Deleted!", status: 1 }))
   
      
      closeModal();
    
  }, [
  ]);

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>
      {/* api errors */}
   
      <div className="modal-action mt-12">
        <button className="btn btn-glass   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          // disabled={deleteIsLoading}
        >
          {/* {deleteIsLoading ? "Deleting..." : "Yes"} */}
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
