import { useUserLogined } from "@/utils/userLogined";
import { useRouter } from "next/navigation";

const useDashboard = () => {
    const { isUserLoggedIn } = useUserLogined();
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
        checkUserLogin
    }
}
export default useDashboard
