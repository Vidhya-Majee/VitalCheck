import { useNavigate, Link } from 'react-router-dom';
import { Activity, Heart, History as HistoryIcon, LogOut, ArrowRight, Database, Cpu, Zap } from 'lucide-react';
import PulseLine from '../components/PulseLine';
import PageBackground from '../components/PageBackground';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const initials = (user?.name || 'U').trim().charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
       <PageBackground>
      {/* Top bar */}
      <div className="bg-vital-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-40"
             style={{
               background: 'radial-gradient(circle at 20% 30%, #2DD4B4 0%, transparent 50%), radial-gradient(circle at 90% 70%, #FF6B5E 0%, transparent 50%)',
             }} />
        <div className="absolute inset-0 opacity-[0.07]"
             style={{
               backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
               backgroundSize: '24px 24px',
             }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-vital-teal to-vital-coral
                            flex items-center justify-center font-display text-lg font-semibold text-white
                            shadow-lg shadow-black/20 ring-2 ring-white/20">
              {initials}
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold text-white tracking-tight">
                Welcome back, {user?.name?.split(' ')[0] || 'there'}
              </h1>
              <p className="font-body text-white/50 text-sm">Here's your health overview</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/70 hover:text-white font-body text-sm
                       bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition-all border border-white/10"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-8 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
            <Cpu size={13} className="text-vital-teal" />
            <span className="font-mono text-xs text-white/80">3 ML Models Compared</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
            <Database size={13} className="text-vital-coral" />
            <span className="font-mono text-xs text-white/80">253K+ Records Trained</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
            <Zap size={13} className="text-white" />
            <span className="font-mono text-xs text-white/80">Instant Predictions</span>
          </div>
        </div>

        <PulseLine color="#FF6B5E" className="h-8 w-full opacity-50 relative z-10" />
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="font-display text-xl font-semibold text-vital-ink mb-1">
          What would you like to check today?
        </h2>
        <p className="font-body text-vital-ink/50 mb-8">
          Choose a screening below to get an instant AI-powered risk assessment.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <Link
            to="/check"
            className="group relative bg-white rounded-2xl p-7 shadow-sm border border-vital-ink/5
                       hover:shadow-2xl hover:shadow-vital-teal/15 hover:-translate-y-1.5 hover:border-vital-teal/30
                       transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vital-teal to-vital-teal/30" />
            <div className="flex items-start justify-between mb-5">
              <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-vital-teal to-vital-teal/70
                              flex items-center justify-center shadow-md shadow-vital-teal/30 p-3">
                <Activity className="text-white" size={22} />
              </div>
              <span className="font-mono text-[11px] text-vital-teal bg-vital-teal/10 px-2.5 py-1 rounded-full">
                80% recall
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-vital-ink mb-2">
              Diabetes Risk Check
            </h3>
            <p className="font-body text-sm text-vital-ink/50 mb-5 leading-relaxed">
              Estimate your diabetes risk using BMI, blood pressure, general health, and more.
            </p>
            <div className="flex items-center gap-1.5 text-vital-teal font-body text-sm font-medium">
              Start check
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/check-heart"
            className="group relative bg-white rounded-2xl p-7 shadow-sm border border-vital-ink/5
                       hover:shadow-2xl hover:shadow-vital-coral/15 hover:-translate-y-1.5 hover:border-vital-coral/30
                       transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vital-coral to-vital-coral/30" />
            <div className="flex items-start justify-between mb-5">
              <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-vital-coral to-vital-coral/70
                              flex items-center justify-center shadow-md shadow-vital-coral/30 p-3">
                <Heart className="text-white" size={22} />
              </div>
              <span className="font-mono text-[11px] text-vital-coral bg-vital-coral/10 px-2.5 py-1 rounded-full">
                82% recall
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-vital-ink mb-2">
              Heart Disease Risk Check
            </h3>
            <p className="font-body text-sm text-vital-ink/50 mb-5 leading-relaxed">
              Estimate your heart disease risk using cholesterol, smoking history, and more.
            </p>
            <div className="flex items-center gap-1.5 text-vital-coral font-body text-sm font-medium">
              Start check
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <Link
          to="/history"
          className="group flex items-center justify-between bg-white rounded-2xl p-6 shadow-sm border border-vital-ink/5
                     hover:shadow-lg hover:border-vital-deep/20 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="bg-vital-deep/5 w-12 h-12 rounded-xl flex items-center justify-center
                            group-hover:bg-vital-deep/10 transition-colors">
              <HistoryIcon className="text-vital-deep" size={20} />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-vital-ink">
                View your health history
              </h3>
              <p className="font-body text-sm text-vital-ink/50">
                See all your past risk checks and trends
              </p>
            </div>
          </div>
          <ArrowRight size={18} className="text-vital-ink/30 group-hover:translate-x-1 group-hover:text-vital-deep transition-all" />
        </Link>
      </div>
      </PageBackground>
  );
}



export default Dashboard;