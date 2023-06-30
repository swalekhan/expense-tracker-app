import axios from "axios";


export const expenseGetData = async (email) => {
    try {
        const res = await axios(`https://authentication-expense-tracker-default-rtdb.firebaseio.com/expenses/${email}.json`)
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
        const res = await axios.post(`https://authentication-expense-tracker-default-rtdb.firebaseio.com/expenses/${email}.json`, data)
        return { ...data, id: res.data.name }
    } catch (err) {
        console.log(err)
    }
}

export const expensePutData = async({email,data}) => {
    const id = data.id
    try{
    const res = await axios.put(`https://authentication-expense-tracker-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`,data)
    return {...res.data,id:id} 
    }catch(err){
        console.log(err)
    }
}


export const expenseDeleteData = async ({ email, id }) => {
    try {
        await axios.delete(`https://authentication-expense-tracker-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`)
        return id
    } catch (err) {
        console.log(err)
    }
}