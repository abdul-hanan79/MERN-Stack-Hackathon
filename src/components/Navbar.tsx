'use client'
import useDashboard from '@/customHooks/useDashboard';
import { useLogin } from '@/customHooks/useLogin';
import { useSignup } from '@/customHooks/useSignup';
import { useUserLogined } from '@/utils/userLogined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const Navbar = () => {
    const { isUserLoggedIn } = useUserLogined();
    console.log("user logined in navbar", isUserLoggedIn);
    const { checkUserLogin } = useDashboard();
    // useEffect(() => {
    //     if (!auth.isLoggedIn && auth.currentUserRequestLoader) {
    //         router.push("/login");
    //     }
    // }, [auth])


    // const loginUser = useSelector((state: any) =>)
    // const { goToLogin } = useLogin()
    // const { goToSignup } = useSignup()
    return (
        <nav className="bg-blue-500 p-4 flex items-center justify-between">
            <div>
                <Link href="/">
                    <p className="text-white text-xl font-bold hover:text-blue-200">eCommerce</p>
                </Link>
            </div>
            <div className="hidden md:flex space-x-4">

                <button className="text-white hover:text-blue-200" onClick={checkUserLogin}>Dashboard</button>

                {/* {!userLoggedIn: */}
                {!isUserLoggedIn ?
                    <div>
                        <Link href="/login">
                            <button
                                className="bg-white text-blue-500 font-semibold px-4 py-2 rounded hover:bg-blue-50"
                            >
                                Login
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button
                                className="bg-white text-blue-500 font-semibold px-4 py-2 rounded hover:bg-blue-50"
                            >
                                Signup
                            </button>
                        </Link>
                    </div> : <div>

                        <button
                            className="bg-white text-blue-500 font-semibold px-4 py-2 rounded hover:bg-blue-50"
                        >
                            Signout
                        </button>
                    </div>}
                {/* } */}
            </div>
            <div className="md:hidden flex space-x-2">
                <button className="text-white focus:outline-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>
        </nav >
    );
};

export default Navbar;
