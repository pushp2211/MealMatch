import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function SeekerLayout() {
  return (
    <div className="h-[100vh] w-full flex bg-pink1 overflow-hidden">
      <Sidebar />

      <div className="flex-1 min-w-0 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default SeekerLayout;
