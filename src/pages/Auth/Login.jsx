import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { UserSchemas } from "../../schema/Schema";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const login = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      // let string = JSON.string(res)
      console.log(res.data);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data));
      // const token = localStorage.getItem('accessToken')
      // console.log(token, "accessToken");
      navigate("/");
      toast("Login Successfull! ");
      // window.location.reload();
      // Handle successful login, e.g., redirect to another page
    } catch (error) {
      setLoading(false);
      toast(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <div>
      {loading && (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm backdrop-brightness-[0.8] z-[99]">
          <Loader />
        </div>
      )}
      <Formik
        initialValues={user}
        validationSchema={UserSchemas.login}
        enableReinitialize
        onSubmit={(values) => login(values)}
      >
        {({ errors, touched, values, handleSubmit }) => (
          <Form>
            <div className="relative w-[300px]">
              <Field
                type="text"
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
            <div className="relative w-[300px] mt-5">
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
            {/* {Object.keys(errors).length > 0 ? (
              <p className="text-start text-red-600 text-sm mt-1">
                {errors}
              </p>
            ) : null} */}

            <div className=" mt-2">
              <Link className="text-center text-sm underline text-blue-500 ">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="btn mt-5 hover:bg-blue-500 uppercase transition-all btn-primary w-full bg-blue-400 text-white rounded-md py-2"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      <div className="mt-5">
        <p>Email: <span className="text-lg text-blue-600 font-semibold/">user@gmail.com</span></p>
        <p>Password: <span className="text-lg text-blue-600 font-semibold/">user</span></p>
      </div>
    </div>
  );
};

export default Login;
