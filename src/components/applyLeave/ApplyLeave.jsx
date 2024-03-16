import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const ApplyLeave = ({ token, setOpenModal, getLeaves }) => {
  const [categories, SetCategories] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState({
    date: Date,
    reason: "",
    category: "",
    compensatory: false,
    upto: "",
  });

  const leaveSchema = Yup.object({
    date: Yup.date().required("Please select date"),
    reason: Yup.string().required("Please enter reason"),
    category: Yup.string().required("Please select category"),
    comensatory: Yup.boolean().default(false),
    upto: Yup.date(),
  });

  const ApplyLeave = async (values) => {
    console.log("values:", values);
    try {
      const res = await axios.post(
        "/leave/apply-leave",
        {
          leaves: [
            {
              date: values.date,
              reason: values.reason,
              category: values.category,
              compensatory: values.compensatory,
              upto: values.upto,
            },
          ],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setOpenModal(false);
      getLeaves();
      console.log(res);
      toast(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await axios.get("/leave/category", {
          headers: {
            Authorization: token,
          },
        });
        SetCategories(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, []);

  const handleCompensatoryChange = (e) => {
    setLeaveDetails((prevDetails) => ({
      ...prevDetails,
      compensatory: e.target.checked,
    }));
  };
  return (
    <div>
      <Formik
        initialValues={leaveDetails}
        enableReinitialize
        validationSchema={leaveSchema}
        onSubmit={(values) => ApplyLeave(values)}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="flex flex-col">
              <label htmlFor="category">Leave Category*</label>
              <Field
                as="select"
                name="category"
                id="category"
                value={values.category}
                className="py-1 w-1/2 mt-2"
              >
                <option value="">Select Category</option>
                {categories.map((entry) =>
                  entry.categories.map((leave, index) => (
                    <option value={leave.category} key={index}>{leave.category}</option>
                  ))
                )}
              </Field>
            </div>
            {errors.category && touched.category ? (
              <p className="text-start text-red-600 text-sm mt-1">
                {errors.category}
              </p>
            ) : null}
            <div className="flex flex-col mt-4">
              <label htmlFor="reason">Reason*</label>
              <Field
                as="textarea"
                name="reason"
                id="reason"
                value={values.reason}
                className="mt-2"
              />
            </div>
            {errors.reason && touched.reason ? (
              <p className="text-start text-red-600 text-sm mt-1">
                {errors.reason}
              </p>
            ) : null}
            <div className="mt-3 flex justify-between w-1/2 items-center">
              <label htmlFor="compensatory">Compensatory Leave</label>
              <input
                type="checkbox"
                name="compensatory"
                id="compensatory"
                checked={values.compensatory}
                onChange={handleCompensatoryChange}
              />
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="flex flex-col">
                <label htmlFor="date">Date*</label>
                <Field type="date" name="date" id="date" value={values.date} />
                {errors.date && touched.date ? (
                  <p className="text-start text-red-600 text-sm mt-1">
                    Please Select Date
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="upto">Upto</label>
                <Field type="date" name="upto" id="upto" value={values.upto} />
                {errors.date && touched.date ? (
                  <p className="text-start text-red-600 text-sm mt-1 py-2.5"></p>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-10 py-2 bg-blue-500 mt-4 text-white"
              >
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ApplyLeave;
