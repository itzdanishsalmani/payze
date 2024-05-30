import { Dashboard } from "./Components/Dashboard"
import { SignIn } from "./Components/SignIn"
import { SignUp } from "./Components/SignUp"
import { BrowserRouter,Routes,Route } from "react-router-dom"
function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/signin" element={ <SignIn/> } />
            <Route path="/dashboard" element={ <Dashboard/> } />
            <Route path="/send" />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
