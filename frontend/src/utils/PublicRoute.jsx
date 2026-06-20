import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function PublicRoute() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        setIsAuth(res.ok);
      } catch {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <p>Loading...</p>;

  return !isAuth ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default PublicRoute;