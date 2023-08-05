import axios from "axios"

export const auth = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts`,
});

export const expenseAxios = axios.create({
  baseURL: `${process.env.REACT_APP_EXPENSE_API}`,
});