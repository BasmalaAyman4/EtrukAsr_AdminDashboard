import Home from "./pages/home/Home";
import List from "./pages/list/ListData";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Login from "./components/Login/Login";
import { AuthContext } from "./context/AuthContext";
import ListData from "./pages/list/ListData";
import ListCategory from "./pages/list/ListCategory";
import ListDonation from "./pages/list/ListDonation";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext)

  // const RequireAuth = ({ children }) => {
  //   return currentUser ? children : <Navigate to="/login" />;
  // };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={

                <Home />

              }
            />
            <Route path="users">
              <Route
                index
                element={

                  <ListData />

                }
              />
              <Route
                path=":userId"
                element={

                  <Single />

                }
              />
              <Route
                path="new"
                element={

                  <New inputs={userInputs} title="Add New User" />

                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <ListCategory />

                }
              />
              <Route
                path=":productId"
                element={

                  <Single />

                }
              />
              <Route
                path="new"
                element={

                  <New inputs={productInputs} title="Add New Product" />

                }
              />
            </Route>
            <Route path="orders">
              <Route
                index
                element={

                  <ListDonation />

                }
              />
              <Route
                path=":orderId"
                element={

                  <Single />

                }
              />
              <Route
                path="new"
                element={

                  <New inputs={productInputs} title="Add New Orders" />

                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
