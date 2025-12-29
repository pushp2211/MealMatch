import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function SeekerLayout() {
    return (
        <div className='h-[100vh] w-full bg-amber-300'>
            <div className="h-[calc(100vh)] flex bg-pink1">
                <Sidebar/>
                <Outlet />
            </div>
        </div>
    )
}

export default SeekerLayout;