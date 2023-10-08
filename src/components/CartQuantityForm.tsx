import { useFormik } from 'formik';
import Button from './ui/Button';
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
            <div className="flex items-center justify-between space-x- mb-4">
                <div className='flex  gap-4'>
                    <button
                        type="button"
                        onClick={() => formik.setFieldValue('quantity', formik.values.quantity - 1)}
                        className="px-2 py-1 bg-yellow-200 text-white rounded-lg"
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
                        className="px-2 py-1 bg-teal-400 text-white rounded-lg"
                    >
                        +
                    </button>
                </div>
                <Button type="submit" title='update' className="" isValid={true} />

            </div>
        </form>
    );
};

export default CartQuantityForm;
