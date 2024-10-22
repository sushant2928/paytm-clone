import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormInput } from "./FormInput";
import { transferBalance } from "../api";

export const SendMoney = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { to } = location.state;
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSendMoney = async () => {
    const { data, error } = await transferBalance(to, amount);
    if (data) {
      alert(data?.message);
      navigate("/dashboard", { replace: true });
      return;
    }
    if (error) alert(error?.message);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-500 p-4">
      <div className="w-full sm:w-2/3 lg:w-1/3 bg-white border rounded-md p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-black text-2xl font-semibold">Sign In</h1>
          <p className="text-gray-500">Send Money</p>
        </div>

        <FormInput
          label={"Amount (in Rs.)"}
          required={true}
          onChange={handleAmountChange}
          value={amount}
          name={"username"}
          type={"email"}
          placeholder="Enter amount"
        />
        <button
          className="border rounded-md bg-black text-white p-2"
          onClick={handleSendMoney}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};
