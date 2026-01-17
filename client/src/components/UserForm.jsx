import { useState } from "react";

export default function UserForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create user object
    const user = { name, email, address };

    // Call API
    const res = await fetch("http://localhost:8080/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      onAdd(data); // Update parent state
      setName("");
      setEmail("");
      setAddress("");
    } else {
      alert(data.message || "Error creating user");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-md"
    >
      <h2 className="text-xl font-bold">Add User</h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Address"
        className="w-full p-2 border rounded"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Add User
      </button>
    </form>
  );
}
