import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrash, FaHeart } from "react-icons/fa";
import { handleRemoveElement, setFavorite } from "./helper.js";
import { toast } from "react-toastify";

export const ListView = ({ items, index, role, user_id }) => {
  const navigate = useNavigate(); // Hook for navigation
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const columnName = [
    [
      "Name",
      "Property Type",
      "District",
      "Address",
      "Price",
      "Area Size",
      "Development Name",
      "Furnishing",
      "Agent Name",
      "Agent Phone",
      "",
    ],
    [
      "Name",
      "Property Type",
      "District",
      "Address",
      "Price",
      "Area Size",
      "Development Name",
      "Furnishing",
      "Amenities",
      "Agent Name",
      "Agent Phone",
      "Bed Rooms",
      "Bath Rooms",
      "Tenure",
      "MRT",
      "",
    ],
  ];
  const deleteList = async (id) => {
    const payload = {
      list_id: id,
      user_id: user_id,
      cate: index,
    };
    fetch(`${apiUrl}/api/admin/deleteList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleViewProperty = (id) => {
    role > 1
      ? navigate(`/detail-admin/${index}/${id}`)
      : navigate(`/detail/${index}/${id}`);
  };

  const handleRemoveProperty = (id) => {
    // Handle property removal logic here
                                handleRemoveElement(
                                  id,
                                  deleteList,
                                  "Post"
                                )
  };

  const handleFavoriteProperty = (id) => {
    if (user_id === -99) toast.warning("Please login")
    else setFavorite(id, user_id, index);
  };

  return (
    <div className="table-responsive my-4" style={{ overflowX: "auto" }}>
      <table className="table table-hover table-bordered align-middle">
        <thead className="bg-primary text-white text-center">
          <tr>
            <th>Image</th>
            {columnName[0]
              .filter((key) =>
                role < 1 ? key !== "Agent Name" && key !== "Agent Phone" : true
              )
              .map((header) => (
                <th key={header} className="text-uppercase fw-bold">
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="text-center align-middle">
              {/* Image Column */}
              <td>
                <img
                  src={item.images_list[0] || "https://via.placeholder.com/100"}
                  alt={"No Image"}
                  className="rounded shadow"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    border: "2px solid #ccc",
                  }}
                />
              </td>
              {/* Other Columns */}
              <td>{item.name || "N/A"}</td>
              <td>{item.property_type || "N/A"}</td>
              <td>{item.district || "N/A"}</td>
              <td>{item.address || "N/A"}</td>
              <td>{item.price ? `$${item.price}` : "N/A"}</td>
              <td>{item.area_size ? `${item.area_size} sqft` : "N/A"}</td>
              <td>{item.dev_name || "N/A"}</td>
              <td>{item.furnishing || "N/A"}</td>
              {role > 1 && (
                <>
                  <td>{item.agent_name || "N/A"}</td>
                  <td>{item.agent_phone || "N/A"}</td>
                </>
              )}
              <td>
                <div className="d-flex flex-column align-items-center gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewProperty(item._id)}
                    style={{
                      width: "25px",
                      height: "25px",
                      padding: "0",
                      borderRadius: "50%",
                    }}
                  >
                    <FaEye size={12} />
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleFavoriteProperty(item._id)}
                    style={{
                      width: "25px",
                      height: "25px",
                      padding: "0",
                      borderRadius: "50%",
                    }}
                  >
                    <FaHeart size={12} />
                  </button>
                  {role > 1 && (
                    <>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveProperty(item._id)}
                        style={{
                          width: "25px",
                          height: "25px",
                          padding: "0",
                          borderRadius: "50%",
                        }}
                      >
                        <FaTrash size={12} />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
