import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SidebarDropdown = ({ item, activeKey, onClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const activeClasses = "bg-sidebarbtn";
    const inactiveClasses = "bg-stubgdark hover:bg-sidebarbtn/80";

    return (
        <>
            {/* Dropdown header */}
            <div className="bg-stubgdark my-2 flex items-center px-3 py-3 hover:bg-sidebarbtn/80 rounded-sm cursor-pointer"
            onClick={() => {
                setIsExpanded(!isExpanded)
            }}>
                <div className="flex items-center">
                    {React.cloneElement(item.icon, {
                        className: `size-6 fill-none stroke-[var(--color-dashtext)] `
                    })}
                </div>
                <div className="text-dashtext text-lg font-semibold pl-3 flex-1">
                    {item.title}
                </div>
                <div className="flex items-center pl-2">
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" className="fill-dashtext" viewBox="0 -960 960 960">
                            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" className="fill-dashtext" viewBox="0 -960 960 960">
                            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Render nested dropdown items */}
            {isExpanded && (
                <div>
                    {item.droplist.map((child) =>
                        child.path ? (
                            <Link to={child.path} onClick={() => onClick(child.title)}>
                                <div className={`${activeKey === child.title ? activeClasses : inactiveClasses} m-2 flex items-center px-6 py-3 rounded-sm cursor-pointer`}>
                                    <div className="flex items-center">
                                        {React.cloneElement(child.icon, {
                                            className: `size-6 ${activeKey === child.title ? 'fill-[var(--color-dashhovertext)]' : 'fill-[var(--color-dashtext)]'}`
                                        })}
                                    </div>
                                    <div className={`${activeKey === child.title ? "text-dashhovertext" : "text-dashtext"} text-lg font-semibold pl-3 flex-1`}>{child.title}</div>
                                </div>
                            </Link>
                        ) : (
                            <div className={`${activeKey === child.title ? activeClasses : inactiveClasses} m-2 flex items-center px-6 py-3 rounded-sm cursor-pointer`}>
                                <div className="flex items-center">
                                    {React.cloneElement(child.icon, {
                                        className: `size-6 ${activeKey === child.title ? 'fill-[var(--color-dashhovertext)]' : 'fill-[var(--color-dashtext)]'}`
                                    })}
                                </div>
                                <div className={`${activeKey === child.title ? "text-dashhovertext" : "text-dashtext"} text-lg font-semibold pl-3 flex-1`}>{child.title}</div>
                            </div>
                        )
                    )}
                </div>
            )}
        </>
    );
};
