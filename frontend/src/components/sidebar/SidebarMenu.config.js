import {
  LayoutDashboard,
  PlusCircle,
  MapPin,
  Inbox,
  History,
  
  Home,
  Truck,
  Search
} from "lucide-react";

export const sidebarMenu = {
  provider: [
    { label: 'Dashboard', path: '/providerDashboard', icon: LayoutDashboard },
    { label: 'Post Food', path: '/providerDashboard/post-food', icon: PlusCircle },
    { label: 'Map View', path: '/providerDashboard/find-seeker', icon: MapPin },
    { label: 'Pickup Requests', path: '/providerDashboard/requests', icon: Inbox },
    { label: 'History', path: '/providerDashboard/history', icon: History },
  ],

  seeker: [
    {
      label: "Dashboard",
      path: "/seeker/dashboard",
      icon: Home,
    },
    {
      label: "Find Food",
      path: "/seeker/map",
      icon: Search,
    },
    {
      label: "Active Pickups",
      path: "/seeker/pickups",
      icon: Truck,
    },
    {
      label: "History",
      path: "/seeker/history",
      icon: History,
    },
  ],
};
