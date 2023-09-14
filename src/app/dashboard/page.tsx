import ProductForm from '@/components/AddProductDetails'
import React from 'react'
import { store } from '../../store/store';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  const router = useRouter();
  // Get the current state of the Redux store.
  const state = store.getState();
  console.log("state", state);

  // Check if the user is logged in.
  const isLoggedIn = state.authSlice.isLoggedIn;
  if (!isLoggedIn) {
    // Redirect the user to the login page.
    router.push('/login');
  }

  // ...
  return {
    props: {
      // ...
    },
  };
}


const page = () => {
  return (
    <div>
      <ProductForm />
    </div>
  )
}

export default page
