import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import EditModal from "./components/EditModal";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    // Async function inside useEffect
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setUsers(data.userData || []); // safe to call setState here
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []); // run once on mount

  // Add new user
  const handleAdd = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/user/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();

        setUsers((prev) => prev.filter((u) => u._id !== id));
        toast.success(data.message);
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Open modal and set the user to edit
  const handleEdit = (userId) => {
    setIsModalOpen(true);
    setEditUserId(userId);
    
  };

    // Update user in state after editing
  const handleUpdate = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
    );
    setIsModalOpen(false); // close modal
    setEditUserId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
      <ToastContainer />
      <UserForm onAdd={handleAdd} />
      <UserTable users={users} onDelete={handleDelete} onEdit={handleEdit}/>

      {/* Modal for Editing */}
      <EditModal
        userId={editUserId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
      />


    </div>
  );
}

export default App;
