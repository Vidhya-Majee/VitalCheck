import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Shield, Sparkles, Activity } from 'lucide-react';
import api from '../api/axiosInstance';
import PulseLine from '../components/PulseLine';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT — Brand panel (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-vital-deep overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-40"
             style={{
               background: 'radial-gradient(circle at 30% 20%, #2DD4B4 0%, transparent 50%), radial-gradient(circle at 80% 80%, #FF6B5E 0%, transparent 50%)',
             }} />
        <div className="absolute inset-0 opacity-[0.07]"
             style={{
               backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
               backgroundSize: '24px 24px',
             }} />

        <div className="relative z-10">
          <h1 className="font-display text-3xl font-semibold text-white tracking-tight">
            Vital<span className="text-vital-coral">Check</span>
          </h1>
        </div>

        <div className="relative z-10">
          <h2 className="font-display text-5xl font-semibold text-white leading-tight mb-4">
            Your health data,<br />finally useful.
          </h2>
          <p className="font-body text-white/60 text-lg max-w-md mb-10">
            Create an account to track your diabetes and heart disease risk over time.
          </p>

          <PulseLine glow color="#2DD4B4" className="h-16 w-full max-w-md" />

          <div className="space-y-4 mt-10">
            <div className="flex items-center gap-3 text-white/80">
              <div className="bg-white/10 rounded-lg p-2"><Shield size={18} className="text-vital-teal" /></div>
              <span className="font-body text-sm">Your data is encrypted and private</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="bg-white/10 rounded-lg p-2"><Activity size={18} className="text-vital-coral" /></div>
              <span className="font-body text-sm">Track your risk trends over time</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="bg-white/10 rounded-lg p-2"><Sparkles size={18} className="text-white" /></div>
              <span className="font-body text-sm">Powered by real trained ML models</span>
            </div>
          </div>
        </div>

        <p className="relative z-10 font-body text-white/40 text-xs">
          Not a medical diagnosis. Always consult a doctor.
        </p>
      </div>

      {/* RIGHT — Form panel */}
      <div className="flex-1 flex items-center justify-center bg-vital-bg px-6 py-12">
        <div className="w-full max-w-md animate-fade-up">

          {/* Mobile header band */}
          <div className="lg:hidden mb-8 -mx-6 -mt-12 px-6 pt-10 pb-8 relative overflow-hidden bg-vital-deep">
            <div className="absolute inset-0 opacity-40"
                 style={{
                   background: 'radial-gradient(circle at 30% 20%, #2DD4B4 0%, transparent 50%), radial-gradient(circle at 80% 80%, #FF6B5E 0%, transparent 50%)',
                 }} />
            <div className="relative z-10 text-center">
              <h1 className="font-display text-3xl font-semibold text-white tracking-tight">
                Vital<span className="text-vital-coral">Check</span>
              </h1>
              <p className="font-body text-white/60 text-sm mt-1 mb-4">
                Create your free account
              </p>
              <PulseLine glow color="#2DD4B4" className="h-10 w-40 mx-auto" />
            </div>
          </div>

          <h2 className="font-display text-3xl font-semibold text-vital-ink mb-2">
            Create your account
          </h2>
          <p className="font-body text-vital-ink/50 mb-8">
            Start tracking your health risk today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body text-sm font-medium text-vital-ink/70 mb-1.5">
                Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vital-ink/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-vital-ink/10 bg-white
                             font-body text-vital-ink placeholder:text-vital-ink/30 shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-vital-teal/40 focus:border-vital-teal
                             transition-all"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-vital-ink/70 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vital-ink/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-vital-ink/10 bg-white
                             font-body text-vital-ink placeholder:text-vital-ink/30 shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-vital-teal/40 focus:border-vital-teal
                             transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-vital-ink/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vital-ink/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-vital-ink/10 bg-white
                             font-body text-vital-ink placeholder:text-vital-ink/30 shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-vital-teal/40 focus:border-vital-teal
                             transition-all"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            {error && (
              <div className="bg-vital-red/10 border border-vital-red/20 rounded-xl px-4 py-3">
                <p className="font-body text-sm text-vital-red">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-vital-deep text-white font-body font-medium py-3.5 rounded-xl
                         shadow-lg shadow-vital-deep/20
                         hover:bg-vital-deep/90 hover:shadow-xl hover:shadow-vital-deep/30
                         active:scale-[0.98] transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-center font-body text-sm text-vital-ink/60 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-vital-teal font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;