import React from "react";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/signupSchema";
import { useSignup } from "@/customHooks/useSignup";
import { signupUserType } from "@/types/types";

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
            onSubmit: (values, action) => {
                doSignup(values)
                action.resetForm();
            },
        });
    // console.log("error", errors);
    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-1/3 mx-2 ">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div className="input-block">
                                <label htmlFor="name" className="block text-md font-medium text-slate-700">
                                    Name
                                </label>
                                <input
                                    type="name"
                                    autoComplete="off"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    value={values.name}
                                    className="rounded-lg shadow-md p-1"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.name && errors.name ? (
                                    <p className="form-error text-rose-700">{errors.name}</p>
                                ) : null}
                            </div>
                            <div className="input-block">
                                <label htmlFor="email" className="block text-md font-medium text-slate-700F">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    id="email"
                                    className="rounded-lg shadow-md p-1"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email ? (
                                    <p className="form-error text-rose-700">{errors.email}</p>
                                ) : null}
                            </div>
                            <div className="input-block">
                                <label htmlFor="password" className="block text-md font-medium text-slate-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className="rounded-lg shadow-md p-1"
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password ? (
                                    <p className="form-error text-rose-700">{errors.password}</p>
                                ) : null}
                            </div>
                            <div className="input-block">
                                <label htmlFor="confirm_password" className="block text-md font-medium text-slate-700">
                                    confirm Password
                                </label>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="rounded-lg shadow-md p-1"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <p className="form-error text-rose-700">{errors.confirmPassword}</p>
                                ) : null}
                            </div>

                            <div className="modal-buttons">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                                    type="submit"
                                // disabled={!isValid}
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                        <p className="sign-up text-sm text-slate-500">
                            Already have an account? <a href="#" className="text-blue-600 underline-offset-auto">Sign In now</a>
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