// components/OrderForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from './ui/Button';

const OrderDetailsForm = ({ onSubmit }: any) => {
  console.log("on submit",onSubmit);
  const initialValues = {
    shippingAddress: '',
  };

  const validationSchema = Yup.object({
    shippingAddress: Yup.string().required('Shipping address is required'),
  });
// console.log("error",formik.errors);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="p-4 space-y-4 border rounded shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          {/* Display order summary here */}
        </div>
        <div>
          <label htmlFor="shippingAddress" className="block text-sm font-medium">
            Shipping Address
          </label>
          <Field
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            className="mt-1 p-2 border rounded w-full"
          />
          <ErrorMessage name="shippingAddress" component="p" className="text-red-500 text-sm" />
        </div>
        <Button type="submit" title="Place Your Order" isValid={true} />
      </Form>
    </Formik>
  );
};

export default OrderDetailsForm;
