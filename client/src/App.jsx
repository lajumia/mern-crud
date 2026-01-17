import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Async function inside useEffect
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users"); // use correct backend port
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
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
      <UserForm onAdd={handleAdd} />
      <UserTable users={users} onDelete={handleDelete} />
    </div>
  );
}

export default App;
