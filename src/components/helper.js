import swal from "@sweetalert/with-react";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_SERVER_URL;


export const handleRemoveElement = (Id, Func, elementName) => {
  swal({
    content: (
      <div>
        <h4 className="text-center mb-3">Are you sure?</h4>
        <p className="text-center">
          Do you really want to remove this <strong>{elementName}</strong>? This action{" "}
          <strong>cannot</strong> be undone.
        </p>
      </div>
    ),
    buttons: {
      cancel: {
        text: "No, cancel!",
        value: null,
        visible: true,
        className: "btn btn-secondary",
      },
      confirm: {
        text: "Yes, remove it!",
        value: true,
        visible: true,
        className: "btn btn-danger",
      },
    },
    icon: "warning",
    className: "swal-custom", // Add a custom class for further styling
    closeOnClickOutside: false, // Prevent closing when clicking outside
  }).then((willDelete) => {
    if (willDelete) {
      Func(Id);
      swal({
        title: "Removed!",
        text: `${elementName} has been successfully removed.`,
        icon: "success",
        button: "OK",
        className: "swal-success",
      });
    }
  });
};


  
export const setFavorite = async (id, userId, db_index) => {
  const payload = {
    list_id: id,
    user_id: userId,
    cate: db_index,
  };
  console.log("=============", id, userId, db_index);
  fetch(`${apiUrl}/api/admin/setFavorite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      toast.success(data.message);
    })
    .catch((error) => {
      toast.error(error.message);
    });
};