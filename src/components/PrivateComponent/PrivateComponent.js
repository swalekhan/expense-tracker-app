import { useSelector } from "react-redux"
import { Navigate} from "react-router-dom"

const PrivateComponent = ({children}) => {
    const token = useSelector(state => state.auth.token)
    console.log(token)
    return token ?<>{children}</> : <Navigate to="/Auth/SignUpPage" />
}
export default PrivateComponent