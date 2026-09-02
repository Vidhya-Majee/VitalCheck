import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Weight, Droplet, Cigarette, Footprints, HeartPulse, CalendarClock, Loader2 } from 'lucide-react';
import api from '../api/axiosInstance';
import YesNoToggle from '../components/YesNoToggle';
import NumberField from '../components/NumberField';
import RiskSummary from '../components/RiskSummary';
import PageBackground from '../components/PageBackground';

function HeartForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    HighBP: 0, HighChol: 0, CholCheck: 1, BMI: 25, Smoker: 0,
    Stroke: 0, Diabetes: 0, PhysActivity: 1, Fruits: 1,
    Veggies: 1, HvyAlcoholConsump: 0, AnyHealthcare: 1, NoDocbcCost: 0,
    GenHlth: 2, MentHlth: 0, PhysHlth: 0, DiffWalk: 0, Sex: 1,
    Age: 5, Education: 4, Income: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/health/submit', {
        diseaseType: 'heart',
        inputData: formData,
      });
      navigate('/result', { state: { result: res.data.result } });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const factors = [
    { label: 'High Blood Pressure', active: formData.HighBP === 1 },
    { label: 'High Cholesterol', active: formData.HighChol === 1 },
    { label: 'Has Diabetes', active: formData.Diabetes === 1 },
    { label: 'Smoker', active: formData.Smoker === 1 },
    { label: 'Difficulty Walking', active: formData.DiffWalk === 1 },
    { label: 'General Health rated Poor', active: formData.GenHlth >= 4 },
  ];

  return (
    <PageBackground>
      <div className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-vital-ink/50 hover:text-vital-ink
                                            font-body text-sm mb-6 transition-colors">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
            <div className="bg-white rounded-2xl shadow-sm border border-vital-ink/5 overflow-hidden">
              <div className="bg-gradient-to-br from-vital-coral to-vital-red px-7 py-6">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                  <Heart className="text-white" size={22} />
                </div>
                <h2 className="font-display text-2xl font-semibold text-white">
                  Heart Disease Risk Check
                </h2>
                <p className="font-body text-white/70 text-sm mt-1">
                  Answer a few questions for an instant AI-powered estimate
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-7 space-y-8">
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wide text-vital-ink/40 mb-4">
                    Body & Vitals
                  </p>
                  <div className="space-y-5">
                    <NumberField
                      label="BMI (Body Mass Index)"
                      name="BMI"
                      value={formData.BMI}
                      onChange={handleChange}
                      icon={Weight}
                      hint="18.5–24.9 is normal, 25–29.9 overweight, 30+ obese"
                    />
                    <NumberField
                      label="General Health"
                      name="GenHlth"
                      value={formData.GenHlth}
                      onChange={handleChange}
                      min={1} max={5}
                      icon={HeartPulse}
                      hint="1 = Excellent, 5 = Poor"
                    />
                    <NumberField
                      label="Age Bracket"
                      name="Age"
                      value={formData.Age}
                      onChange={handleChange}
                      min={1} max={13}
                      icon={CalendarClock}
                      hint="1 = 18–24, 5 = 38–42, 9 = 58–62, 13 = 80+"
                    />
                  </div>
                </div>

                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wide text-vital-ink/40 mb-4">
                    Lifestyle & Medical History
                  </p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <YesNoToggle label="High Blood Pressure?" name="HighBP" value={formData.HighBP} onChange={handleChange} icon={Droplet} />
                    <YesNoToggle label="High Cholesterol?" name="HighChol" value={formData.HighChol} onChange={handleChange} icon={Droplet} />
                    <YesNoToggle label="Have Diabetes?" name="Diabetes" value={formData.Diabetes} onChange={handleChange} icon={HeartPulse} />
                    <YesNoToggle label="Smoker?" name="Smoker" value={formData.Smoker} onChange={handleChange} icon={Cigarette} />
                    <YesNoToggle label="Difficulty Walking?" name="DiffWalk" value={formData.DiffWalk} onChange={handleChange} icon={Footprints} />
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
                  className="w-full flex items-center justify-center gap-2 bg-vital-coral text-white font-body font-medium py-3.5 rounded-xl
                             shadow-lg shadow-vital-coral/25 hover:bg-vital-coral/90 hover:shadow-xl
                             active:scale-[0.98] transition-all duration-200
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Analyzing your data...
                    </>
                  ) : (
                    'Check My Risk'
                  )}
                </button>
              </form>
            </div>

            <RiskSummary factors={factors} color="coral" />
          </div>
        </div>
      </div>
    </PageBackground>
  );
}

export default HeartForm;