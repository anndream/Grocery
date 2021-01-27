import React, { useContext, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  LOGIN,
  PRODUCTS,
  CATEGORY,
  DASHBOARD,
  ORDERS,
  SETTINGS,
  CUSTOMERS,
  COUPONS,
  STAFF_MEMBERS,
  SITE_SETTINGS,
  MAIN,
} from "utils/constants";
import AuthProvider, { AuthContext } from "context/Admin/auth";
import { InLineLoader } from "components/Admin/InlineLoader/InlineLoader";
import CategoryPage from "containers/Client/main";
import { useMedia } from "utils/use-media";
const Products = lazy(() => import("containers/Admin/Products/Products"));
const AdminLayout = lazy(() => import("containers/Admin/Layout/Layout"));
const Dashboard = lazy(() => import("containers/Admin/Dashboard/Dashboard"));
const Category = lazy(() => import("containers/Admin/Category/Category"));
const Orders = lazy(() => import("containers/Admin/Orders/Orders"));
const Settings = lazy(() => import("containers/Admin/Settings/Settings"));
const SiteSettingForm = lazy(() => import("containers/Admin/SiteSettingForm/SiteSettingForm"));
const StaffMembers = lazy(() => import("containers/Admin/StaffMembers/StaffMembers"));
const Customers = lazy(() => import("containers/Admin/Customers/Customers"));
const Coupons = lazy(() => import("containers/Admin/Coupons/Coupons"));
const Login = lazy(() => import("containers/Admin/Login/Login"));
const NotFound = lazy(() => import("containers/Admin/NotFound/NotFound"));

/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 */

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <PrivateRoute exact={true} path={DASHBOARD}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Dashboard />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={PRODUCTS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Products />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={CATEGORY}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Category />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={ORDERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Orders />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={CUSTOMERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Customers />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={COUPONS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Coupons />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Settings />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={STAFF_MEMBERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <StaffMembers />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={SITE_SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <SiteSettingForm />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AuthProvider>
  );
};

export const ClientRoutes = () => {
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");

  return (
    <AuthProvider>
      <CategoryPage deviceType={{ mobile, tablet, desktop }} />
    </AuthProvider>
  );
};

// const Routes = () => {
//   return <AdminRoutes />;
// };

// export default Routes;
