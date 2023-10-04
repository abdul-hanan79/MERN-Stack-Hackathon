import { useUserLogined } from "@/customHooks/utils/useUserLogined";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useDashboard = () => {
    const { isUserLoggedIn, loginUserDetails } = useUserLogined();
    const [loader, setLoader] = useState(false)
    const [showAddProductForm, setShowAddProductForm] = useState(false)
    console.log("user is logined", isUserLoggedIn);
    const router = useRouter();
    const checkUserLogin = () => {
        if (isUserLoggedIn) {
            router.push("/dashboard")
        }
        else {
            router.push("/login")
        }
    }
    const doHideUnhide = () => {
        setShowAddProductForm(!showAddProductForm)
    }
    return {
        checkUserLogin,
        loader,
        setLoader,
        showAddProductForm,
        setShowAddProductForm,
        loginUserDetails,
        doHideUnhide
    }
}
export default useDashboard
