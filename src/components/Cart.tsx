
'use client'
import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SimpleButton from './ui/SimpleButton';
import useCart from '@/customHooks/useCart';
import useVerifyUserLogined from '@/customHooks/utils/useVerifyUserLogined';
// import { Image, Button } from 'react-bootstrap';

// const schema = Yup.object().shape({
//     items: Yup.array().of(
//         Yup.object().shape({
//             id: Yup.string().required(),
//             name: Yup.string().required(),
//             quantity: Yup.number().required().min(1),
//         })
//     ),
// });

const Cart = () => {
    // const [cart, setCart] = React.useState([]);
    const { checkUserLogin } = useVerifyUserLogined()
    useEffect(() => {
        checkUserLogin()
    }, [])
    const { cart } = useCart()

    // const handleRemoveItem = (item:any) => {
    //     setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id));
    // };

    const handleCheckout = () => {
        // TODO: Implement checkout functionality
    };

    return (
        // <Formik
        //     initialValues={{
        //         items: cart,
        //     }}
        //     validationSchema={schema}
        //     onSubmit={handleCheckout}
        // >
        //     {({ values, errors, touched }) => (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h5>Cart</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {cart.map((item: any, index: number) => (
                                    <li
                                        key={index}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <p>{item.cartId}</p>
                                        <p>{item.quantity}

                                        </p>
                                        {/* <div>
                                            <Image src={item.image} width={50} height={50} />
                                            {item.name}
                                        </div> */}
                                        <div>
                                            {/* <Field
                                                type="number"
                                                name={`items[${item.id}].quantity`}
                                                value={item.quantity}
                                            onChange={(e) => {
                                                setCart((prevCart) => {
                                                    const newCart = [...prevCart];
                                                    newCart[item.id].quantity = e.target.value;
                                                    return newCart;
                                                });
                                            }}
                                            /> */}
                                            {/* <Button
                                                        variant="danger"
                                                        // onClick={() => handleRemoveItem(item)}
                                                    >
                                                        Remove
                                                    </Button> */}
                                            <SimpleButton title="delete" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Summary</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Total Items
                                    {/* <span>{values.items.length}</span> */}
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Total Price
                                    {/* <span>Rs. {values.items.reduce((total, item) => total + item.quantity * item.price, 0)}</span> */}
                                </li>
                            </ul>
                            {/* <Button  onClick={handleCheckout}>
                                        Go to checkout
                                    </Button> */}
                            <SimpleButton title="go to checkout" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // )}
        // </Formik>
    );
};

export default Cart;
