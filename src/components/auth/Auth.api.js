import axios from "axios"


export const postSignUpData = async (data) => {
    try {
        const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXcVIOVTYP4MQZwzkEHgb-OgLvYj0Rl28", data)
        const validEmail = res.data.email.replace(/[^a-z0-9]/gi, "")
        localStorage.setItem("token", JSON.stringify({ ...res.data, email: validEmail }))
        return { ...res.data, email: validEmail }
    } catch (err) {
        if (err) {
            alert(err?.response?.data?.error?.message)
        }
    }
}

export const postSignInData = async (data) => {
    try {
        const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXcVIOVTYP4MQZwzkEHgb-OgLvYj0Rl28", data)
        const validEmail = res.data.email.replace(/[^a-z0-9]/gi, "")
        localStorage.setItem("token", JSON.stringify({ ...res.data, email: validEmail }))
        return { ...res.data, email: validEmail }
    } catch (err) {
        if (err) {
            alert(err?.response?.data?.error?.message)
        }
    }
}

export const postForgetPasswordData = async (data) => {
    try {
        await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXcVIOVTYP4MQZwzkEHgb-OgLvYj0Rl28", { ...data, requestType: "PASSWORD_RESET" })
        alert("Link is sent. please check email")
    } catch (err) {
        if (err) {
            alert(err?.response?.data?.error?.message)
        }
    }
}