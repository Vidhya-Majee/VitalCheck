import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, Heart, History as HistoryIcon, LogOut } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/check', label: 'Diabetes Check', icon: Activity },
  { to: '/check-heart', label: 'Heart Check', icon: Heart },
  { to: '/history', label: 'History', icon: HistoryIcon },
];

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const initials = (user?.name || 'U').trim().charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* DESKTOP sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 bg-vital-deep min-h-screen sticky top-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
             style={{
               backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
               backgroundSize: '22px 22px',
             }} />

        <div className="relative z-10 px-6 py-7">
          <h1 className="font-display text-xl font-semibold text-white tracking-tight">
            Vital<span className="text-vital-coral">Check</span>
          </h1>
        </div>

        <nav className="relative z-10 flex-1 px-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-all
                 ${isActive
                   ? 'bg-white/15 text-white shadow-inner'
                   : 'text-white/60 hover:bg-white/10 hover:text-white'}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="relative z-10 px-3 pb-6 pt-4 border-t border-white/10 mx-3">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-vital-teal to-vital-coral
                            flex items-center justify-center font-display text-sm font-semibold text-white shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-body text-sm text-white font-medium truncate">{user?.name || 'User'}</p>
              <p className="font-body text-xs text-white/40 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm
                       text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-vital-deep border-t border-white/10
                       flex items-center justify-around px-2 py-2 pb-safe">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg font-body text-[10px] font-medium transition-all
               ${isActive ? 'text-vital-teal' : 'text-white/50'}`
            }
          >
            <Icon size={20} />
            {label.split(' ')[0]}
          </NavLink>
        ))}
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 px-3 py-1.5 text-white/50 font-body text-[10px] font-medium">
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </>
  );
}

export default Sidebar;