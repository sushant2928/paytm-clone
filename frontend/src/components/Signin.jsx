import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "./FormInput";
import { useState } from "react";
import { signIn } from "../api";

export const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    signIn(formData).then((res) => {
      const { data, error } = res;
      if (data) {
        sessionStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/dashboard", { replace: true });
        return;
      }
      if (error) {
        alert(error);
        return;
      }
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name: e.target });
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-500 p-4">
      <div className="w-full sm:w-2/3 lg:w-1/3 bg-white border rounded-md p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-black text-2xl font-semibold">Sign In</h1>
          <p className="text-gray-500">
            Enter you information to access your account
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormInput
            label={"Email"}
            required={true}
            onChange={handleChange}
            value={formData.username}
            name={"username"}
            type={"email"}
          />
          <FormInput
            label={"Password"}
            required={true}
            onChange={handleChange}
            value={formData.password}
            name={"password"}
            type={"password"}
          />
          <button
            type="submit"
            className="border rounded-md bg-black text-white p-2"
          >
            Sign In
          </button>
        </form>
        <p className="m-auto">
          {"Don't have an account?"}
          <Link className="underline" to={"/signup"} replace>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
