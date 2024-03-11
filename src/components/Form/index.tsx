"use client";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  TLoginSchema,
  TRegisterSchema,
  loginSchema,
  registerSchema,
} from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";

type VariantType = "login" | "register";
type FormProps = {
  isLogged: boolean;
};

const Form: React.FC<FormProps> = ({ isLogged }) => {
  const router = useRouter();
  const [variant, setVariant] = React.useState<VariantType>("login");
  const typeData =
    variant === "login" ? ({} as TLoginSchema) : ({} as TRegisterSchema);
  const resolverSchema = variant === "login" ? loginSchema : registerSchema;
  const [dataForm, setDataForm] = React.useState<typeof typeData>();
  const [error, setError] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<typeof typeData>({
    resolver: zodResolver(resolverSchema),
  });

  const handleChangeVariant = () => {
    setVariant((prevVariant) =>
      prevVariant === "login" ? "register" : "login"
    );
    setError("");
  };

  const submitHandler = (data: typeof typeData) => {
    setDataForm(data);
    if (variant === "register") {
      registerHandler(data as TRegisterSchema);
    } else {
      login(data as TLoginSchema);
    }
    reset();
  };

  const login = async (data: TLoginSchema) => {
    try {
      setError("");
      toast.loading("Logging you in...");
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/auth",
      });
      if (response?.status === 401 && response.error) {
        toast.error("Login failed...");
        setError("Password isn't correct");
        return;
      }
      toast.success("Login success");
      router.push("/");
    } catch (error) {
      console.log("Login error: " + error);
    }
  };

  const registerHandler = async (data: TRegisterSchema) => {
    try {
      setError("");
      toast.loading("Registration...");
      await axios.post(`/api/register`, data);
      toast.success("User successfully created");
      login({
        email: data.email,
        password: data.password,
      });
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Registration failed");
        setError(error.response.data.message);
      }
      console.log("Register error on client side", error);
    }
  };
  if (isLogged) {
    router.push("/");
  }
  return (
    <div className="w-[90%] bg-white/90 border-t-8 border-slate-950 min-h-[300px] md:max-w-[400px] rounded-xl p-3  shadow-xl shadow-slate-950 space-y-2">
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
        {error && (
          <p className="text-red-400 text-center text-sm tracking-wide">
            {error}
          </p>
        )}
        <button
          type="submit"
          className={`bg-gradient-to-r from-slate-900 to-slate-950 p-3 text-white rounded-xl transition-all duration-150 hover:from-slate-800 hover:to-slate-900 text-lg font-semibold tracking-wider hover:tracking-widest uppercase ${isLoading ? "opacity-50" : ""}`}
        >
          {variant}
        </button>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
          }}
        />
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
