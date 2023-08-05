// import { resolve } from "chart.js/dist/helpers/helpers.options";
import { expenseAxios } from "../../utils/axios";


export const expenseGetData = async (email) => {
    try {
        const res = await expenseAxios.get(`${email}.json`)
        let arr = [];
        for (let key in res.data) {
            arr.push({
                ...res.data[key],
                id: key
            })
        }
        return arr;
    } catch (err) {
        console.log(err)
    }
}

export const expensePostData = async ({ email, data }) => {
    try {
        const res = await expenseAxios.post(`${email}.json`, data)
        return { ...data, id: res.data.name }
    } catch (err) {
        console.log(err)
    }
}

export const expensePutData = async ({ email, data }) => {
    const id = data.id
    try {
        const res = await expenseAxios.put(`${email}/${id}.json`, data)
        return { ...res.data, id: id }
    } catch (err) {
        console.log(err)
    }
}


export const expenseDeleteData = async ({ email, id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            await expenseAxios.delete(`${email}/${id}.json`)
            resolve(id)
        } catch (err) {
            reject(err)
        }
    })

}