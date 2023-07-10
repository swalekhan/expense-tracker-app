import {useSelector } from "react-redux"
import ExpenseItems from "../components/expenseList/ExpenseItems"
import Charts from "../components/charts/Charts"
import Cards from "../components/Cards/Cards"

const HomePge = () => {
  const { items } = useSelector(state => state.expense)

  return (
    <>
      <Cards />
      <Charts />
      <ExpenseItems items={items} />
    </>
  )
}
export default HomePge