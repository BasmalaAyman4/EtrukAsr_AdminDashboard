import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
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
import NewCase from "./pages/new/NewCase";
import NewCategory from "./pages/new/NewCategory";
import NewDonationType from "./pages/new/NewDonationType";
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

                  <NewCase />

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
                path=":categoryId"
                element={

                  <Single />

                }
              />
              <Route
                path="new"
                element={

                  <NewCategory />

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
                path=":donationId"
                element={

                  <Single />

                }
              />
              <Route
                path="new"
                element={

                  <NewDonationType />

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
