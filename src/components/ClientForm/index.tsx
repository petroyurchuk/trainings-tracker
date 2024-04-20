"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TextField, Button } from "@mui/material";
import { Client } from "@/types/client";

const ClientForm: React.FC = () => {
  const router = useRouter();

  const handleAddClient = async () => {
    try {
      const { data } = await axios.post<Client>("/api/client/", {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        height: Number(formData.height),
        weight: Number(formData.weight),
      });
      router.push(`/clients/${data.id}`);
      router.refresh();
    } catch (error) {
      console.log("Error here");
      console.log(error);
    }
  };
  const [formData, setFormData] = React.useState({
    name: "",
    phoneNumber: "",
    height: "",
    weight: "",
  });

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await handleAddClient();
    toast.success("Client successfully added .");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-5 max-w-[800px] m-auto"
    >
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        className="bg-white"
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
        className="bg-white"
      />
      <TextField
        label="Height (cm)"
        variant="outlined"
        name="height"
        type="number"
        value={formData.height}
        onChange={handleChange}
        fullWidth
        className="bg-white"
      />
      <TextField
        label="Weight (kg)"
        variant="outlined"
        name="weight"
        type="number"
        value={formData.weight}
        onChange={handleChange}
        fullWidth
        className="bg-white"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="w-full"
      >
        Add
      </Button>
    </form>
  );
};

export default ClientForm;
