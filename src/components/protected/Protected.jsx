import { Navigate, useLocation } from "react-router-dom";

const Protected = ({
  layout: Layout,
  component: Component,
  protected: isProtected,
  auth,
  title,
  open_menu,
  set_open_menu,
}) => {
  const location = useLocation();
  return auth ? (
    // is user authenticated, if true show display route, else is the route protected ?, if true redirect to register or login, else diplay route
    <Layout title={title} open_menu={open_menu} set_open_menu={set_open_menu}>
      <Component />
    </Layout>
  ) : isProtected ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Layout title={title} open_menu={open_menu} set_open_menu={set_open_menu}>
      <Component />
    </Layout>
  );
};

export default Protected;
