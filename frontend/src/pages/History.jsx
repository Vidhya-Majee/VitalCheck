import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Activity, Heart, Inbox } from 'lucide-react';
import api from '../api/axiosInstance';
import PageBackground from '../components/PageBackground';

function History() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/health/history');
        setRecords(res.data.history);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <PageBackground>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-vital-ink/50 hover:text-vital-ink
                                          font-body text-sm mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <h2 className="font-display text-2xl font-semibold text-vital-ink mb-1">
          Your Health History
        </h2>
        <p className="font-body text-vital-ink/50 mb-8">
          Every risk check you've done, in one place
        </p>

        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-vital-ink/5 p-10 text-center">
            <p className="font-body text-vital-ink/50">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-vital-red/10 border border-vital-red/20 rounded-xl px-4 py-3">
            <p className="font-body text-sm text-vital-red">{error}</p>
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-vital-ink/5 p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-vital-ink/5 flex items-center justify-center mx-auto mb-4">
              <Inbox className="text-vital-ink/30" size={26} />
            </div>
            <p className="font-body text-vital-ink/60 mb-4">No records yet</p>
            <Link
              to="/dashboard"
              className="inline-block bg-vital-deep text-white font-body font-medium text-sm px-5 py-2.5 rounded-xl
                         hover:bg-vital-deep/90 transition-all"
            >
              Go check your risk
            </Link>
          </div>
        )}

        {!loading && !error && records.length > 0 && (
          <div className="space-y-3">
            {records.map((r) => {
              const isHighRisk = r.category === 'High Risk';
              const isDiabetes = r.diseaseType === 'diabetes';
              return (
                <div
                  key={r._id}
                  className="bg-white rounded-2xl shadow-sm border border-vital-ink/5 p-5 flex items-center justify-between
                             hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0
                                    ${isDiabetes ? 'bg-vital-teal/10' : 'bg-vital-coral/10'}`}>
                      {isDiabetes ? (
                        <Activity className="text-vital-teal" size={20} />
                      ) : (
                        <Heart className="text-vital-coral" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-vital-ink capitalize">
                        {r.diseaseType} Check
                      </p>
                      <p className="font-body text-xs text-vital-ink/40">
                        {new Date(r.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-body text-sm font-semibold ${isHighRisk ? 'text-vital-red' : 'text-vital-teal'}`}>
                      {r.category}
                    </p>
                    <p className="font-mono text-xs text-vital-ink/40">
                      {(r.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageBackground>
  );
}

export default History;