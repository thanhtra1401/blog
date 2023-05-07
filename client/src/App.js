import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/post/:id" element={<Single />}></Route>
          <Route path="/write" element={<Write />}></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
