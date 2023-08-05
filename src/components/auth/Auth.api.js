import { auth } from "../../utils/axios"

export const postSign = async ({ url, data }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await auth.post(url, data)
            const validEmail = res.data.email.replace(/[^a-z0-9]/gi, "")
            localStorage.setItem("token", JSON.stringify({ ...res.data, email: validEmail }))
            resolve({ ...res.data, email: validEmail })
        } catch (err) {
            if (err) {
                reject(err?.response?.data?.error?.message)
            }
        }
    })
}


export const postForgetPasswordData = async (data) => {
    try {
        await auth.post(":sendOobCode?key=AIzaSyC5Q8mjUSkbayV7izSHVIjQnd5-ndxl1gk", { ...data, requestType: "PASSWORD_RESET" })
         return ""
    } catch (err) {
        if (err) {
            alert(err?.response?.data?.error?.message)
        }
    }
}