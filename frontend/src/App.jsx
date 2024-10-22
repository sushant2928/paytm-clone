import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Dashboard } from "./components/Dashboard";
import { SendMoney } from "./components/SendMoney";
import { Signup } from "./components/Signup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </Router>
  );
}

export default App;
