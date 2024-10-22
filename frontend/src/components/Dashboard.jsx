import { useEffect, useState } from "react";
import { getOtherUsers, getUserBalance } from "../api";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSendMoney = (to) => {
    navigate("/send", { state: { to } });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      getUserBalance().then(({ data }) => {
        if (data && data?.balance) {
          setBalance(data.balance);
        } else {
          setBalance(0);
        }
      });
    }
  }, []);

  useEffect(() => {
    getOtherUsers(searchTerm).then(({ data }) => {
      if (Array.isArray(data?.users)) {
        setUsers(data.users);
      }
    });
  }, [searchTerm]);

  return (
    <div>
      <header className="flex justify-between p-4 border-b-2 shadow-md mb-2">
        <h1 className="font-bold text-xl">Payments App</h1>
        <div className="flex gap-2 items-center">
          <span>Hello, firstName</span>
          <span className="border rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center">
            {"firstName".charAt(0)}
          </span>
        </div>
      </header>
      <main className="flex flex-col gap-4 p-4">
        <p className="font-semibold">Your Balance ${balance}</p>
        <span className="font-semibold">Users</span>
        <input
          className="px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Users..."
        />
        {users.map((user) => (
          <div key="" className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="border rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center">
                {user?.firstName?.charAt(0)}
              </span>
              <span>{user?.firstName + " " + user?.lastName}</span>
            </div>
            <button
              className="border rounded-md bg-black text-white p-2"
              onClick={() => handleSendMoney(user._id)}
            >
              Send Money
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};
