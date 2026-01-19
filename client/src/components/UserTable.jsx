export default function UserTable({ users, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto w-full mt-6">
      <table className="min-w-full bg-white rounded shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Address</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.address}</td>
              <td className="py-2 px-4 border space-x-2">
                <button
                  onClick={() => onDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                {/* Edit button */}
                <button
                  onClick={() => onEdit(user._id)} // call a function passed from parent
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
