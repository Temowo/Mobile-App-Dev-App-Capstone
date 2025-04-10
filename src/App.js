import React from "react";
import { ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { routes } from "./routes/routes";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/protected/Protected";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { user } = useAuth();
  const isAuth = user.isAuthenticated;

  return (
    <>
      <Routes>
        {routes.map(
          ({ title, path, component, layout, protected: isProtected }) => (
            <Route
              path={path}
              key={uuidv4()}
              element={
                <Protected
                  component={component}
                  layout={layout}
                  protected={isProtected}
                  auth={isAuth}
                  title={title}
                />
              }
            />
          )
        )}
      </Routes>

      <ToastContainer
        style={{ marginTop: "20px" }}
        theme="colored"
        autoClose={true}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
