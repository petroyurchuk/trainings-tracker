"use client";
import axios from "axios";
import React from "react";

type Props = {};
const Form = (props: Props) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const register = async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      alert("User successfully created");
    } catch (error) {
      console.log("Register error", error);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-gradient-to-r from-red-500 to-purple-500 p-4 text-white rounded-xl"
        onClick={register}
      >
        Register
      </button>
    </div>
  );
};
export default Form;
