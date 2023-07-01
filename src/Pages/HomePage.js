import { useDispatch, useSelector } from "react-redux"
import ExpenseItems from "../components/expenseList/ExpenseItems"
import Charts from "../components/charts/Charts"
import { useEffect } from "react"
import { expenseGetDataAsync } from "../components/expenseList/ExpenseSlice"
import Cards from "../components/Cards/Cards"

const HomePge = () => {
  const { items } = useSelector(state => state.expense)
  const { email } = useSelector(state => state.auth.token) 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(expenseGetDataAsync(email))
  }, [dispatch, email])

  return (
    <>
      <Cards />
      <Charts />
      <ExpenseItems items={items} />
    </>
  )
}
export default HomePge