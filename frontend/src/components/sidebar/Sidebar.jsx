import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Utensils,
} from 'lucide-react';
import { useState } from 'react';
import { sidebarMenu } from './SidebarMenu.config';
import { useAuth } from '@/context/AuthContext';
import { useSidebarData } from './useSidebarData';

function Sidebar() {
  const {user, logout} = useAuth();
  const role = user.role;
  const navItems = sidebarMenu[role] || [];
  
  const { stats, profile, theme } = useSidebarData(role);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const baseDashboardPath = role === 'provider' ? '/providerDashboard' : '/seekerDashboard';

  // Bottom nav items 
  const bottomNavItems = [
    {
      label: 'Profile',
      path: `${baseDashboardPath}/profile`,
      icon: User,
    },
    {
      label: 'Settings',
      path: `${baseDashboardPath}/settings`,
      icon: Settings,
    },
  ];

  const activeClass =
    theme === "info"
      ? "bg-info text-info-foreground"
      : "bg-primary text-primary-foreground";

  const badgeVariant = theme === "info" ? "info" : "accent";

  return (
    <aside
      className={cn(
        'shrink-0 h-screen flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 sticky top-0',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-xl",
            theme === "info"
              ? "bg-info text-info-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          <Utensils className="w-5 h-5" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">MealMatch</span>
            <span className="text-xs text-muted-foreground">
              {role == "provider" ? "Provider Portal" : "Seeker Portal"}
            </span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const badgeCount = item.badgeKey
            ? stats?.[item.badgeKey]
            : undefined;

          return (
            <Link key={item.path} to={item.path}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                  isActive
                    ? `${activeClass} shadow-sm`
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
                        variant={isActive ? 'secondary' : badgeVariant}
                        className="text-xs px-2 py-0"
                      >
                        {badgeCount}
                      </Badge>
                    )}
                  </>
                )}

                {collapsed && badgeCount > 0 && (
                  <div
                    className={cn(
                      "absolute right-2 top-1 w-2 h-2 rounded-full",
                      theme === "info" ? "bg-info" : "bg-accent"
                    )}
                  />
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
                    ? `${activeClass} shadow-sm`
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
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 cursor-pointer"
          onClick={async() =>{
            await logout();
            navigate("/login", {replace: true});
          }}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>

      {/* Profile Info */}
      {!collapsed && profile && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-semibold",
                theme === "info"
                  ? "bg-info/10 text-info"
                  : "bg-primary/10 text-primary"
              )}
            >
              {profile.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {profile.type?.replace("_", " ")}
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

export default Sidebar;