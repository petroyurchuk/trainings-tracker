"use client";
import React from "react";
import axios from "axios";
import { TLoginSchema, TRegisterSchema, registerSchema } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type VariantType = "register" | "login";
type TDataForm = TLoginSchema | TRegisterSchema;

const Form: React.FC = () => {
  const [variant, setVariant] = React.useState<VariantType>("login");
  const [dataForm, setDataForm] = React.useState<TRegisterSchema>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const handleChangeVariant = () => {
    setVariant((prevVariant) =>
      prevVariant === "login" ? "register" : "login"
    );
  };

  const submitHandler = (data: TRegisterSchema) => {
    setDataForm(data);
    registerHandler(data);
    reset();
  };

  const registerHandler = async (data: TRegisterSchema) => {
    try {
      await axios.post("/api/register", data);
      alert("User successfully created");
    } catch (error) {
      console.log("Register error", error);
    }
  };

  return (
    <div className="w-[90%] bg-white/95 border-t-8 border-purple-950 min-h-[300px] md:max-w-[400px] rounded-xl p-3  shadow-lg shadow-slate-500 space-y-2">
      <h3 className="text-2xl font-bold w-full capitalize">{variant}</h3>
      <form
        className="space-y-5 w-full flex flex-col "
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="space-y-2">
          <input
            className="custom-input"
            type="email"
            {...register("email")}
            placeholder="email"
            name="email"
          />
          {errors.email && (
            <p className="message-error">{errors.email.message}</p>
          )}
        </div>
        {variant === "register" && (
          <div className="space-y-2">
            <input
              className="custom-input"
              type="text"
              {...register("name")}
              placeholder="Name..."
              name="name"
            />
            {errors.name && (
              <p className="message-error">{errors.name.message}</p>
            )}
          </div>
        )}
        <div className="space-y-2">
          <input
            className="custom-input"
            type="password"
            {...register("password")}
            placeholder="Password..."
            name="password"
          />
          {errors.password && (
            <p className="message-error">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-red-700 to-purple-950 p-3 text-white rounded-xl transition-all duration-150 hover:from-red-600 hover:to-purple-800 text-lg font-semibold tracking-wider hover:tracking-widest uppercase"
        >
          {variant}
        </button>
        <div className="text-right">
          {variant === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            onClick={handleChangeVariant}
            className="underline cursor-pointer"
          >
            {variant === "login" ? "Register" : "Login"}{" "}
          </span>
        </div>
      </form>
    </div>
  );
};
export default Form;
