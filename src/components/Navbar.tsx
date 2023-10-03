'use client'
import useDashboard from '@/customHooks/useDashboard';
import { useLogin } from '@/customHooks/useLogin';
import { useSignup } from '@/customHooks/useSignup';
import { useUserLogined } from '@/customHooks/utils/userLogined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const Navbar = () => {
    const { isUserLoggedIn, userRole } = useUserLogined();
    const {doSignout}=useLogin()
    console.log("user logined in navbar", isUserLoggedIn);

    return (
        <nav className="bg-blue-500 p-4 flex items-center justify-between ">
            <div className='flex gap-2'>
                <Link href="/">
                    <p className="text-white text-xl font-bold hover:text-blue-200">eCommerce</p>
                </Link>
                <Link href="/product">
                    <p className="text-blue text-xl font-bold hover:text-white  hover:shadow-lg">All Products</p>
                </Link>
                <Link href="/order">
                    <p className="text-blue text-xl font-bold hover:text-white  hover:shadow-lg">My Order</p>
                </Link>
                <Link href="/cart">
                    <p className="text-blue text-xl font-bold hover:text-white  hover:shadow-lg">Cart</p>
                </Link>
            </div>
            <div className="hidden md:flex space-x-4">


                {/* {!userLoggedIn: */}
                {!isUserLoggedIn ?
                    <div className='flex gap-2'>
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
                    </div> : <div className='flex gap-2 '>
                        {userRole == "admin" ? <button className="bg-white text-blue-500 font-semibold px-4 py-2 rounded hover:bg-blue-50" ><Link href='/dashboard'>Dashboard</Link></button> : <button className="bg-white text-blue-500 font-semibold px-4 py-2 rounded hover:bg-blue-50" ><Link href='/'>Explore</Link></button>}

                        <button
                            className="bg-white text-blue-500 font-semibold px-4 py-2 rounded hover:bg-blue-50"
                        
                         onClick={()=>{
                            doSignout()
                         }}>
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
