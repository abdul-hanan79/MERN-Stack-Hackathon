import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/loginSchema";
import { useSignup } from "@/customHooks/useSignup";
import { useLogin } from "@/customHooks/useLogin";
import Link from "next/link";
import InputBlock from "./InputBlock";
import Button from "./ui/Button";
import ErrorBox from "./ui/ErrorBox";

const LoginForm = () => {
    const { doLogin, loginError, loader,
        setLoader } = useLogin()
    const initialValues = {
        email: "",
        password: "",
    };
    const { values, handleBlur, handleChange, isValid, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: loginSchema,
            validateOnChange: true,
            validateOnBlur: true,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: async (values, action) => {
                setLoader(true)
                await doLogin(values)
                action.resetForm();
                setLoader(false)
            },
        });
    console.log("is valid", isValid);
    console.log("errors", errors);
    console.log("touched", touched);
    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
                        <img
                            src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
                            alt=""
                        />
                    </div>
                    <div className="w-1/2 mx-2 flex flex-col justify-center items-center ">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                            <InputBlock label="Email" type="email" name="email" id="email" placeholder="Enter your Email"
                                value={values.email} onChange={handleChange} onBlur={handleBlur} error={errors.email}
                                touched={touched.email}
                            />
                            <InputBlock label="Password" type="password" name="password" id="password" placeholder="Enter Password"
                                value={values.password} onChange={handleChange} onBlur={handleBlur} error={errors.password}
                                touched={touched.password}
                            />
                            {loginError && <ErrorBox error={loginError} />}
                            <Button type="submit" title="Login" loading={loader} isValid={isValid} className="w-10/12" />
                        </form>
                        <p className="sign-up text-sm text-slate-500">
                            Do not have accout? <Link href="/signup" className="text-blue-600 underline-offset-auto">Sign Up Now</Link>
                        </p>
                    </div>
                </div>

            </div>



        </>
    );
};


export default LoginForm;