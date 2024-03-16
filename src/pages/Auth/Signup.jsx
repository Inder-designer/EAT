import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { UserSchemas } from "../../schema/Schema";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const Signup = ({handleChange}) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const signup = async (values) => {
    console.log(values, "values");
    try {
        const res = await axios.post("/auth/register", {
            username: values.username,
            email: values.email,
            password: values.password,
        })
        console.log(res, "SignUp");
        toast("Signup Successfully!")
        handleChange(null, "1");
    } catch (error) {
     console.log(error.response);   
     toast(error.response.data.message)
    }
  };
  return (
    <div>
      <Formik
        initialValues={user}
        validationSchema={UserSchemas.signup}
        enableReinitialize
        onSubmit={(values) => signup(values)}
      >
        {({ errors, touched, values, handleSubmit }) => (
          <Form>
            <div className="relative w-[350px]">
              <Field
                type="text"
                id="username"
                name="username"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
                placeholder="Username"
                value={values.username}
              />
              <label
                htmlFor="username"
                className="absolute text-base text-gray-500 duration-300 transform -translate-y-[21px] scale-75 top-2 z-10 origin-[0] bg-white peer-focus:text-blue-600 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[21px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Username<sup className="text-red-600">*</sup>
              </label>
            </div>
            {errors.username && touched.username ? (
              <p className="text-start text-red-600 text-sm mt-1">
                {errors.username}
              </p>
            ) : null}
            <div className="relative w-[350px] mt-5">
              <Field
                type="email"
                id="email"
                name="email"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
                placeholder="Email"
                value={values.email}
              />
              <label
                htmlFor="email"
                className="absolute text-base text-gray-500 duration-300 transform -translate-y-[21px] scale-75 top-2 z-10 origin-[0] bg-white peer-focus:text-blue-600 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[21px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Email<sup className="text-red-600">*</sup>
              </label>
            </div>
            {errors.email && touched.email ? (
              <p className="text-start text-red-600 text-sm mt-1">
                {errors.email}
              </p>
            ) : null}
            <div className="relative w-[350px] mt-5">
              <Field
                type="password"
                id="password"
                name="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
                placeholder="Password"
                value={values.password}
              />
              <label
                htmlFor="password"
                className="absolute text-base text-gray-500 duration-300 transform -translate-y-[21px] scale-75 top-2 z-10 origin-[0] bg-white peer-focus:text-blue-600 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[21px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Password<sup className="text-red-600">*</sup>
              </label>
            </div>
            {errors.password && touched.password ? (
              <p className="text-start text-red-600 text-sm mt-1">
                {errors.password}
              </p>
            ) : null}
            <div className="relative w-[350px] mt-5">
              <Field
                type="password"
                id="confirm_password"
                name="confirm_password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
                placeholder="Password"
                value={values.confirm_password}
              />
              <label
                htmlFor="confirm_password"
                className="absolute text-base text-gray-500 duration-300 transform -translate-y-[21px] scale-75 top-2 z-10 origin-[0] bg-white peer-focus:text-blue-600 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[21px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Confirm Password<sup className="text-red-600">*</sup>
              </label>
            </div>
            {errors.confirm_password && touched.confirm_password ? (
              <p className="text-start text-red-600 text-sm mt-1">
                {errors.confirm_password}
              </p>
            ) : null}
            <button
              type="submit"
              className="btn mt-5 hover:bg-blue-500 uppercase transition-all btn-primary w-full bg-blue-400 text-white rounded-md py-2"
            >
              Signup
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
