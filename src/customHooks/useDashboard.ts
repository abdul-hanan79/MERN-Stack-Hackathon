import { useUserLogined } from "@/customHooks/utils/userLogined";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useDashboard = () => {
    const { isUserLoggedIn } = useUserLogined();
    const [loader, setLoader] = useState(false)
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
    return {
        checkUserLogin,
        loader, setLoader,
    }
}
export default useDashboard
