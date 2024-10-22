import axios from "axios";
const baseURL = "http://localhost:8080/api/v1/";

class Response {
  constructor(data, error) {
    this.data = data;
    this.error = error;
  }
}

export const signIn = async (payload) => {
  try {
    const url = baseURL + "user/signin";
    const result = await axios.post(url, payload);
    return new Response(result.data);
  } catch (e) {
    return new Response(null, e.message);
  }
};
export const signUp = async (payload) => {
  try {
    const url = baseURL + "user/signup";
    const result = await axios.post(url, payload);
    return new Response(result.data);
  } catch (e) {
    return new Response(null, e.message);
  }
};

export const getUserBalance = async () => {
  try {
    const url = baseURL + "account/balance";
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return new Response(result.data, null);
  } catch (e) {
    return new Response(null, e.message);
  }
};

export const getOtherUsers = async (searchTerm) => {
  try {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("filter", searchTerm || "");
    const url = baseURL + `user/bulk?${urlSearchParams.toString()}`;
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return new Response(result.data, null);
  } catch (e) {
    return new Response(null, e.message);
  }
};

export const transferBalance = async (to, balance) => {
  const payload = {
    to,
    balance: Number(balance),
  };
  try {
    const url = baseURL + "account/transfer";
    const result = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });
    return new Response(result.data, null);
  } catch (e) {
    return new Response(null, e.message);
  }
};
