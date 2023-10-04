import React from 'react'
import { useRouter } from "next/navigation";
import { useUserLogined } from './useUserLogined';
import useProducts from '../useProducts';
import useCart from '../useCart';
import useOrder from '../useOrder';
import { useLogin } from '../useLogin';
import { usePathname } from 'next/navigation'
import { fetchCurrentUser } from '@/store/authSlice';

const useVerifyUserLogined = () => {
    const { isUserLoggedIn } = useUserLogined();
    const { doFetchCurrentUser } = useLogin()
    const { doFecthProducts } = useProducts()
    const { doFetchCartItems } = useCart()
    const { doFetchOrders } = useOrder()
    const { loginUserDetails } = useUserLogined()
    const router = useRouter();
    const pathName = usePathname()
    const checkUserLogin = async () => {
        // const pathName=router.pathname
        console.log("pathName", pathName);
        if (!isUserLoggedIn) {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Fetch user data and wait for it to complete
                    console.log("before fetch current user", loginUserDetails);
                    const userDetails: any = await doFetchCurrentUser();
                    console.log("user details action", userDetails);
                    if (userDetails !== undefined) {
                        console.log("after fetch current user", loginUserDetails);
                        console.log("after fetch current user", loginUserDetails);
                        const userId = userDetails.payload.id
                        console.log("user id in verify user ", userId);
                        if (pathName == '/product') {
                            console.log("product is working");
                            await doFecthProducts();
                        }
                        else if (pathName == '/order') {
                            console.log("order is working");
                            await doFetchOrders(userId);
                        }
                        else if (pathName == '/cart') {
                            console.log("cart is working");
                            await doFetchCartItems(userId);
                        } else {
                            console.log("nothing is working");
                        }

                    }
                    // Now that user data is available, you can perform actions
                    // 
                    // console.log("user is logged in. Verify user logged in");
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    router.push('/login');
                }
            } else {
                router.push('/login');
            }
        } else {
            if (pathName == '/product') {
                console.log("user is logined and product is working");
                await doFecthProducts();
            }
            else if (pathName == '/order') {
                console.log(" user is logined and order is working");
                await doFetchOrders();
            }
            else if (pathName == '/cart') {
                console.log(" user is logined and cart is working");
                await doFetchCartItems();
            } else {
                console.log(" user is logined andnothing is working");
            }
            console.log("user is logged in.");
        }
        // await fetchCurrentUser()
        // doFetchOrders()
    }
    return {
        checkUserLogin,
    }
}

export default useVerifyUserLogined
