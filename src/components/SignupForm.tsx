import React from "react";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/signupSchema";
import { useSignup } from "@/customHooks/useSignup";
import { signupUserType } from "@/types/types";
import InputBlock from "./InputBlock";
import Button from "./ui/Button";
import Link from "next/link";

const SignupForm = () => {
    const { doSignup } = useSignup()
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const { values, handleBlur, handleChange, isValid, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: signupSchema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: async (values, action) => {
                // setLoader(true)
                await doSignup(values)
                action.resetForm();
                // setLoader(true)

            },
        });
    // console.log("error", errors);
    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-1/3 mx-2 ">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <InputBlock label="Name" type="text" name="name" id="name" placeholder="enter your name"
                                value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name}
                                touched={touched.name}
                            />
                            <InputBlock label="Email" type="email" name="email" id="email" placeholder="Enter your Email"
                                value={values.email} onChange={handleChange} onBlur={handleBlur} error={errors.email}
                                touched={touched.email}
                            />
                            <InputBlock label="Password" type="password" name="password" id="password" placeholder="Enter Password"
                                value={values.password} onChange={handleChange} onBlur={handleBlur} error={errors.password}
                                touched={touched.password}
                            />
                            <InputBlock label="Confirm Password" type="password" name="confirmPassword" id="confirmPassword" placeholder="Enter Confirm Password"
                                value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                            />
                            <Button type="submit" title="Signup" />
                        </form>
                        <p className="sign-up text-sm text-slate-500">
                            Already have an account? <Link href="/login" className="text-blue-600 underline-offset-auto">Sign In now</Link>
                        </p>
                    </div>
                    <div className="w-1/3 mx-2">
                        <img
                            src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
                            alt=""
                        />
                    </div>
                </div>

            </div>



        </>
    );
};



export default SignupForm;