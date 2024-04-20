import {
  BrowserRouter,
  Navigate,
  Route,
  RouteProps,
  Routes,
} from "react-router-dom";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { useAuth } from "./context/hooks";
import { HomePage } from "./pages/home";

export function RoutesApp() {
  const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
    const { signed } = useAuth();
    return signed ? element : <Navigate to="/signin" replace />;
  };

  const PrivatePage: React.FC<{ item: React.ComponentType }> = ({
    item: Component,
  }) => {
    const { signed } = useAuth();

    return signed ? <Component /> : <Navigate to="/signin" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={<PrivateRoute element={<PrivatePage item={HomePage} />} />}
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
