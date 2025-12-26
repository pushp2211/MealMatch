import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function ProviderLayout() {
    return (
        <div className='h-[100vh] w-full'>
            <div className="h-[calc(100vh)] flex bg-pink1">
                <Sidebar/>
                <Outlet />
            </div>
        </div>
    )
}

export default ProviderLayout;