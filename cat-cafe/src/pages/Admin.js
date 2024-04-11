// src/pages/Admin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function Admin({ users, cart, modifyProduct, removeProduct }) {
  const [viewingCartUserId, setViewingCartUserId] = useState(null);
  const userCart =
    viewingCartUserId && cart && cart.get ? cart.get(viewingCartUserId) : null;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>User List</h2>
      {users && (
        <table>
          <thead>
            <tr className="tr-thead">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="tr-content" key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Customer"}</td>{" "}
                <td>
                  <button
                    onClick={() => {
                      setViewingCartUserId(user.id);
                      navigate(`/cart`);
                    }}
                  >
                    View Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {userCart && (
        <>
          <h2>Cart for User {viewingCartUserId}</h2>
          {userCart.map((product) => (
            <div key={product.mid}>
              <p>{product.name}</p>
              <button
                onClick={() => modifyProduct(product, product.amount + 1)}
              >
                Increase Quantity
              </button>
              <button
                onClick={() => modifyProduct(product, product.amount - 1)}
              >
                Decrease Quantity
              </button>
              <button onClick={() => removeProduct(product.mid)}>
                Remove Product
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
