import React from "react";
import { Link } from "react-router-dom";

export const SidebarItem = React.memo(({ item, activeKey, onClick }) => {
    const activeClasses = "bg-darkpink1";
    const inactiveClasses = "bg-dashbg1 hover:bg-pink2/80";
    return (
        item.path ? (
            <Link to={item.path} onClick={() => onClick(item.title)}>
                <div className={`${activeKey === item.title ? activeClasses : inactiveClasses} my-2 flex items-center px-2 py-2 rounded-sm cursor-pointer`}>
                    {React.cloneElement(item.icon, {
                        className: `size-6 ${activeKey === item.title ? 'fill-[var(--color-dashhovertext)]' : 'fill-[var(--color-dashtext)]'}`
                    })}
                    <span className={`${activeKey === item.title ? "text-dashhovertext" : "text-dashtext"} text-md font-semibold pl-2`}>{item.title}</span>
                </div>
            </Link>
        ) : (
            <div className={`${inactiveClasses} "my-2 flex items-center px-3 py-3 rounded-sm cursor-pointer"`}>
                {React.cloneElement(item.icon, {
                    className: `size-6 ${activeKey === item.title ? 'fill-[var(--color-dashhovertext)]' : 'fill-[var(--color-dashtext)]'}`
                })}
                <span className={`${activeKey === item.title ? "text-dashhovertext" : "text-dashtext"} text-md font-normal pl-3`}>{item.title}</span>
            </div>
        )
    )
});
