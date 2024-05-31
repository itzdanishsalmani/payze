import { Dashboard } from "./Components/Dashboard"
import { Root } from "./Components/Root"
import { SendMoney } from "./Components/SendMoney"
import { SignIn } from "./Components/SignIn"
import { SignUp } from "./Components/SignUp"
import { BrowserRouter,Routes,Route } from "react-router-dom"
function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Root/> } />
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/signin" element={ <SignIn/> } />
            <Route path="/dashboard" element={ <Dashboard/> } />
            <Route path="/send" element={ <SendMoney/> } />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
