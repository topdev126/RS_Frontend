import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar bg-light p-4 rounded-3 shadow sticky-bar">
      <h6 className="mb-4">Admin Panel</h6>
      <ul className="list-unstyled">
        <li>
          <Link to="/admin/users" className="btn btn-link text-start w-100">
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="btn btn-link text-start w-100">
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="btn btn-link text-start w-100">
            Settings
          </Link>
        </li>
        <li>
          <Link to="/admin/reload" className="btn btn-link text-start w-100">
            Reload DB
          </Link>
        </li>
      </ul>
    </div>
  );
}
