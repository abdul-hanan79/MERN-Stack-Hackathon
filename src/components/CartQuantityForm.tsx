import { useFormik } from 'formik';
// import InputMask from 'react-input-mask';

const CartQuantityForm = ({ initialValues, onSubmit }: any) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });
    console.log("valid quantity", formik.isValid);
    console.log("valid quantity", formik.errors);
    console.log("valid quantity", formik.values);
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between space-x-4 mb-4">
                <button
                    type="button"
                    onClick={() => formik.setFieldValue('quantity', formik.values.quantity - 1)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-lg"
                >
                    -
                </button>
                <input
                    type="text"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    //   mask="99" // Customize this mask as needed
                    className="w-16 text-center border border-gray-400 rounded-lg"
                />
                <button
                    type="button"
                    onClick={() => formik.setFieldValue('quantity', formik.values.quantity + 1)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-lg"
                >
                    +
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Update
                </button>
            </div>
        </form>
    );
};

export default CartQuantityForm;
