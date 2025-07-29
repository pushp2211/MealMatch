import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { SidebarDropdown } from "./SidebarDropDown";

function DashSidebar({ isMobile, isOpen, slideIn, setIsOpen, menuItems }) {
  const [activeKey, setActiveKey] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const key = findActiveKey(menuItems, location.pathname);
    if (key) setActiveKey(key);
  }, [location, menuItems]);

  const findActiveKey = (items, currentPath) => {
    for (let item of items) {
      if (item.path === currentPath) return item.title;
      if (item.droplist) {
        for (let child of item.droplist) {
          if (child.path === currentPath) return child.title;
        }
      }
    }
    return null;
  };

  const handleActive = (key) => setActiveKey(key);

  return (
    <>
      <div
        className={`fixed z-40 md:relative w-62 h-[calc(100vh-60px)] bg-dashbg1 shadow-[3px_0_3px_-1px_rgba(0,0,0,0.2)]
          transition-transform duration-500 ease-in-out
          transform ${isOpen && slideIn ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="max-h-[calc(100vh-60px)] px-2 pt-6 pb-4 overflow-auto scrollbar-thin scrollbar-webkit">
          {menuItems.map((item, index) => {
            if (item.title === "hr") {
              return <hr key={index} className="border-t-2 border-pink2 mt-[20%] mb-[10%]" />;
            } else if (item.droplist) {
              return (
                <SidebarDropdown key={index} item={item} activeKey={activeKey} onClick={handleActive} />
              );
            } else {
              return (
                <SidebarItem key={index} item={item} activeKey={activeKey} onClick={handleActive} />
              );
            }
          })}
        </nav>
      </div>

      {/* Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default DashSidebar;
