import { signIn } from "next-auth/react";



export async function userLogin(email: string, password: string): Promise<any> {
    try {
        const res = await signIn("credentials", { email: email, password: password, redirect: false });
        console.log(res)
        console.log("Resp service >>>>>>>>>>>>>>>>>>>>>>>");
        if (res?.error) {
            return { "success": false, "message": "Email or Password is invalid!" }
        } else {
            return { "success": true, "message": "Login successful!" }
        }



    } catch (e) {
        return { error: "Something went wrong. " + e };
    }
}


