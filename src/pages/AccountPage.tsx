import { useState, useEffect } from "react";
import { User } from "../types";
import EditAccountModal from "../components/EditAccountModal";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const AccountPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setLoggedInUser(currentUser);

    if (currentUser.email === "admin@gmail.com") {
      setIsAdmin(true);
    }
  }, []);

  const handleSave = (updatedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Account Update Successfully");

    setShowModal(false);
  };

  const handleDelete = (email: string) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    toast.success("Account Delete Successfully");
    setShowDeleteModal(false);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const openDeleteModal = (email: string) => {
    setSelectedUserEmail(email);
    setShowDeleteModal(true);
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center text-white mb-4 fw-bold">Account List</h2>
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => selectedUserEmail && handleDelete(selectedUserEmail)}
        message="Are you sure you want to delete this account?"
      />
      {users.length > 0 ? (
        <>
          {/* Table View for Larger Screens */}
          <div className="d-none d-lg-block">
            <table className="table table-success table-bordered rounded">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Mobile</th>
                  <th>Date of Birth</th>
                  <th>Is Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.mobile}</td>
                    <td>{moment(user.dob).format("YYYY-MM-DD")}</td>
                    <td>{user.email === "admin@gmail.com" ? "Yes" : "No"}</td>
                    <td>
                      {isAdmin || user.email === loggedInUser?.email ? (
                        <>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowModal(true);
                            }}
                          >
                            Edit
                          </button>
                          {isAdmin && user.email !== "admin@gmail.com" && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => openDeleteModal(user.email)}
                            >
                              Delete
                            </button>
                          )}
                        </>
                      ) : (
                        <>--</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View for Smaller Screens */}
          <div className="d-lg-none">
            {users.map((user, index) => (
              <div className="card text-dark bg-light mb-3" key={index}>
                <div className="card-body">
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Gender:</strong> {user.gender}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {user.mobile}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {moment(user.dob).format("YYYY-MM-DD")}
                  </p>
                  <p>
                    <strong>Is Admin:</strong>{" "}
                    {user.email === "admin@gmail.com" ? "Yes" : "No"}
                  </p>
                  {(isAdmin || user.email === loggedInUser?.email) && (
                    <div>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </button>
                      {user.email !== loggedInUser?.email && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => openDeleteModal(user.email)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-white text-center">No users found.</p>
      )}

      {selectedUser && (
        <EditAccountModal
          user={selectedUser}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AccountPage;
