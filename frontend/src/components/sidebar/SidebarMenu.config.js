import {
  LayoutDashboard,
  PlusCircle,
  MapPin,
  Inbox,
  History,
  Search,
  Activity,
  Clock,
  CheckCircle
} from "lucide-react";

export const sidebarMenu = {
  provider: [
    { label: 'Dashboard', path: '/providerDashboard', icon: LayoutDashboard },
    { label: 'Post Food', path: '/providerDashboard/post-food', icon: PlusCircle },
    { label: 'Map View', path: '/providerDashboard/find-seeker', icon: MapPin },
    { label: 'Pickup Requests', path: '/providerDashboard/requests', icon: Inbox },
    { label: 'Activity', path: '/providerDashboard/activity', icon: Activity },
    { label: 'History', path: '/providerDashboard/history', icon: History },
  ],

  seeker: [
    { label: 'Dashboard', path: '/seekerDashboard', icon: LayoutDashboard },
    { label: 'Find Food', path: '/seekerDashboard/find-food', icon: Search },
    { label: 'My Requests', path: '/seekerDashboard/requests', icon: Clock },
    { label: 'Active Pickups', path: '/seekerDashboard/active-pickups', icon: CheckCircle },
    { label: 'Activity', path: '/seekerDashboard/activity', icon: Activity },
    { label: 'History', path: '/seekerDashboard/history', icon: History },
  ],
};
