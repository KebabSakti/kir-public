import { Outlet } from "react-router-dom";
import logo from "../../assets/image/logo.png";

export function Layout() {
  return (
    <>
      <div className="min-h-screen">
        <div className="bg-blue-900 p-4 flex items-center justify-center gap-2">
          <img src={logo} className="w-8" />
          <div className="text-white font-semibold text-lg">
            KEMENTERIAN PERHUBUNGAN
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
