import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  PlusCircle,
  MapPin,
  Inbox,
  History,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Utensils,
} from 'lucide-react';
import { useState } from 'react';
import { mockStats, mockProvider } from '@/data/mockData';

const navItems = [
  { label: 'Dashboard', path: '/providerDashboard', icon: LayoutDashboard },
  { label: 'Post Food', path: '/providerDashboard/post-food', icon: PlusCircle },
  { label: 'Map View', path: '/providerDashboard/find-seeker', icon: MapPin },
  { label: 'Pickup Requests', path: '/providerDashboard/requests', icon: Inbox },
  { label: 'History', path: '/providerDashboard/history', icon: History },
];

const bottomNavItems = [
  { label: 'Profile', path: '/providerDashboard/profile', icon: User },
  { label: 'Settings', path: '/providerDashboard/settings', icon: Settings },
];

function ProviderSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'shrink-0 h-screen flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 sticky top-0',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
          <Utensils className="w-5 h-5" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">MealMatch</span>
            <span className="text-xs text-muted-foreground">
              Provider Portal
            </span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const badgeCount =
            item.label === 'Pickup Requests'
              ? mockStats.pendingRequests
              : undefined;

          return (
            <Link key={item.path} to={item.path}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon
                  className={cn(
                    'w-5 h-5 flex-shrink-0',
                    isActive && 'text-primary-foreground'
                  )}
                />

                {!collapsed && (
                  <>
                    <span className="flex-1 text-sm font-medium">
                      {item.label}
                    </span>

                    {badgeCount > 0 && (
                      <Badge
                        variant={isActive ? 'secondary' : 'accent'}
                        className="text-xs px-2 py-0"
                      >
                        {badgeCount}
                      </Badge>
                    )}
                  </>
                )}

                {collapsed && badgeCount > 0 && (
                  <div className="absolute right-2 top-1 w-2 h-2 rounded-full bg-accent" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 space-y-1 border-t border-sidebar-border">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}

        {/* Logout */}
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>

      {/* Provider Info */}
      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              {mockProvider.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {mockProvider.name}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {mockProvider.type}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute -right-3 top-20 bg-card border shadow-sm hover:bg-accent/10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>
    </aside>
  );
}

export default ProviderSidebar;
