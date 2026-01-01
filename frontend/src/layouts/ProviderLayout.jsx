import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function ProviderLayout() {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full bg-pink1">
        <Sidebar />
        {/* MAIN CONTENT */}
        <main className="flex-1 h-full min-h-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ProviderLayout;