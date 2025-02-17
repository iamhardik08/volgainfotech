import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const hardcodedData = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543210" },
];

const Home = () => {
  const [data, setData] = useState(hardcodedData);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) => item.email.includes(search));

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-3 text-center">User Table</h1>
      <div className="flex justify-between mb-3">
        <button
          onClick={() => navigate("/create")}
          className="bg-gray-600 text-white px-3 py-1 rounded"
        >
          Create
        </button>
        <input
          type="text"
          placeholder="Search by Email"
          className="border p-1 w-1/3 text-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-800 font-medium">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2 text-center">Details</th>
              <th className="border p-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border bg-gray-50 hover:bg-gray-100">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{item.phone}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => navigate(`/details/${item.id}`)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Details
                  </button>
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (name && email && phone) {
      hardcodedData.push({ id: Date.now(), name, email, phone });
      navigate("/");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3">Create User</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-1 w-full mb-2 text-sm"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        className="border p-1 w-full mb-2 text-sm"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        className="border p-1 w-full mb-2 text-sm"
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-gray-600 text-white p-1 w-full rounded mb-2"
      >
        Submit
      </button>
      <button
        onClick={() => navigate("/")}
        className="bg-gray-500 text-white p-1 w-full rounded"
      >
        Cancel
      </button>
    </div>
  );
};

const Details = () => {
  const { id } = useParams();
  const user = hardcodedData.find((item) => item.id === parseInt(id));
  if (!user) return <p className="text-center">User not found.</p>;
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3">User Details</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <Link
        to="/"
        className="bg-gray-600 text-white px-3 py-1 rounded mt-3 inline-block"
      >
        Back
      </Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
