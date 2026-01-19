import { useState, useEffect } from "react";
import {toast} from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function EditModal({ userId, isOpen, onClose, onUpdate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  //console.log("User Id is " + userId);

    useEffect(() => {
    //console.log("EditModal useEffect", { userId, isOpen });

    if (!userId || !isOpen) return;

    const fetchUser = async () => {
        const res = await fetch(`http://localhost:8080/api/user/${userId}`);
        const data = await res.json();
        //console.log("Fetched user:", data);
        const user = data.userData;

        setName(user.name || "");
        setEmail(user.email || "");
        setAddress(user.address || "");
    };

    fetchUser();
    }, [userId, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8080/api/user/update/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, address }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      toast.success("User updated successfully");
      onUpdate(updatedUser);
      onClose();
    } else {
      alert("Failed to update user");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      className="bg-white rounded-2xl shadow-xl w-96 p-6 relative mx-4 outline-none"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center">Edit User</h2>

      <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-lg"
          placeholder="Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-lg"
          placeholder="Email"
          required
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded-lg"
          placeholder="Address"
          required
        />

        <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Update
        </button>
      </form>
    </Modal>
  );
}
