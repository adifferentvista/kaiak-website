import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Clock, TrendingUp, Zap, Database, Menu, X, 
  FileText, Moon, Sun, MapPin, Mail, ChevronLeft, LayoutGrid
} from 'lucide-react';

// --- CONFIGURATION (Update these later with real links) ---
const CONFIG = {
  calendlyUrl: "https://calendly.com/your-link", 
  stripePaymentLink: "https://buy.stripe.com/your-link",
};

// --- LOGO ---
const KaiakLogo = ({ className = "h-10 w-auto", isDark }) => {
  const fill = isDark ? "#F8FAFC" : "#0F172A"; 
  const base = isDark ? "#334155" : "#94A3B8";
  return (
    <svg viewBox="0 0 260 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="12" height="60" fill={fill}/> 
      <path d="M28 50 L48 20 L62 20 L38 55 L62 80 L48 80 L28 55" fill={fill}/> 
      <text x="85" y="80" textAnchor="middle" fill={fill} fontFamily="Space Mono, monospace" fontWeight="bold" fontSize="64">A</text>
      <rect x="122" y="15" width="16" height="45" fill="#EA580C"/>
      <rect x="122" y="65" width="16" height="15" fill={base}/> 
      <text x="175" y="80" textAnchor="middle" fill={fill} fontFamily="Space Mono, monospace" fontWeight="bold" fontSize="64">A</text>
      <g transform="translate(260, 0) scale(-1, 1)">
          <rect x="10" y="20" width="12" height="60" fill={fill}/> 
          <path d="M28 50 L48 20 L62 20 L38 55 L62 80 L48 80 L28 55" fill={fill}/> 
      </g>
    </svg>
  );
};

// --- COMPONENTS ---
const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all active:scale-95 duration-200 font-mono text-sm";
  const styles = {
    primary: `bg-[#EA580C] text-white hover:opacity-90 shadow-sm hover:shadow-orange-500/20`,
    outline: `bg-transparent border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800`,
  };
  return <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>{children}</button>;
};

const Badge = ({ children, color = 'slate' }) => {
  const colorMap = {
    orange: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-100 dark:border-orange-800',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };
  return <span className={`inline-block px-3 py-1 rounded-md border text-xs font-mono uppercase tracking-wider ${colorMap[color]}`}>{children}</span>;
};

const BentoCard = ({ children, className = '', title, icon: Icon }) => (
  <div className={`bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-800 hover:-translate-y-1 ${className}`}>
    {(title || Icon) && (
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className={`w-5 h-5 text-[#EA580C]`} />}
        {title && <h3 className={`font-mono tracking-tighter font-bold text-lg text-slate-900 dark:text-white`}>{title}</h3>}
      </div>
    )}
    <div className="flex-1 text-slate-600 dark:text-slate-300">{children}</div>
  </div>
);

// --- LEAD CAPTURE (Simplified - No AI) ---
const LeadCapture = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: Hook this up to your email service (ConvertKit, Beehiiv, etc.)
    console.log("Email captured:", email);
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-900 dark:bg-black text-white rounded-2xl p-8 shadow-xl border border-slate-700">
      <h3 className="font-mono font-bold text-lg mb-4">Get the Free Workflow Checklist</h3>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com" 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:outline-none focus:border-orange-500"
            required
          />
          <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-500 transition-colors flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Send Me The PDF
          </button>
        </form>
      ) : (
        <div className="bg-green-900/30 border border-green-800 p-4 rounded-lg text-center">
          <p className="text-green-200">Check your email! 📬</p>
        </div>
      )}
    </div>
  );
};

// --- LOGIC GRID ---
const LogicGrid = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          {['Solution', 'Speed', 'Ownership', 'Cost'].map(h => <th key={h} className="p-4 text-xs font-mono text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">{h}</th>)}
        </tr>
      </thead>
      <tbody className="text-sm font-mono">
        <tr className="bg-orange-50/50 dark:bg-orange-900/10">
          <td className="p-4 font-bold text-[#EA580C] flex items-center gap-2"><Zap className="w-4 h-4"/> KAIAK</td>
          <td className="p-4 text-slate-700 dark:text-slate-200">2 Weeks</td>
          <td className="p-4 text-slate-700 dark:text-slate-200">100% Yours</td>
          <td className="p-4 text-slate-700 dark:text-slate-200">$0/mo</td>
        </tr>
        <tr><td className="p-4 font-bold text-slate-500">Hire VA</td><td className="p-4 text-slate-500">6 Weeks</td><td className="p-4 text-slate-500">None</td><td className="p-4 text-slate-500">$3k/mo</td></tr>
        <tr><td className="p-4 font-bold text-slate-500">DIY</td><td className="p-4 text-slate-500">Forever</td><td className="p-4 text-slate-500">Yours</td><td className="p-4 text-slate-500">Sanity</td></tr>
      </tbody>
    </table>
  </div>
);

// --- ROI CALCULATOR ---
const ROICalculator = () => {
  const [hours, setHours] = useState(10);
  const saved = (hours * 150 * 52) / 1000;

  return (
    <BentoCard title="Time-to-Value" icon={Clock} className="border-orange-100 dark:border-orange-900/30 border-2">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 font-mono">
            Admin Hours / Week: <span className="text-slate-900 dark:text-white font-bold">{hours}h</span>
          </label>
          <input 
            type="range" 
            min="1" 
            max="40" 
            value={hours} 
            onChange={(e) => setHours(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#EA580C]"
          />
        </div>
        <div className="text-center pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-400 mb-1 font-mono uppercase">Annual Savings</p>
          <p className="text-5xl font-mono font-bold text-[#EA580C]">${saved.toFixed(1)}k</p>
        </div>
      </div>
    </BentoCard>
  );
};

// --- PAGES ---
const HomePage = ({ navigate, isDark }) => (
  <div className="space-y-24 pb-24">
    <section className="pt-12 md:pt-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <Badge color="slate">System V 1.0</Badge>
        <h1 className="font-mono tracking-tight text-4xl md:text-6xl font-bold leading-[1.1] text-slate-900 dark:text-white">
          AI Workflow Automation for <span className="text-slate-400 dark:text-slate-500">Overwhelmed Professionals.</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigate('booking')}>Book Audit <ArrowRight className="ml-2 w-4 h-4" /></Button>
          <Button variant="outline" onClick={() => navigate('resources')}>Free Resources</Button>
        </div>
      </div>
      <div className="relative h-[400px] bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm flex items-center justify-center">
         <div className="text-6xl">🚀</div>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6">
      <div className="mb-12 text-center"><h2 className="font-mono text-3xl font-bold mb-4 text-slate-900 dark:text-white">The Logic</h2></div>
      <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden"><LogicGrid /></div>
    </section>

    <section className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-6">
        <ROICalculator />
        <BentoCard title="No Subscriptions">You own the code. No monthly fees beyond your API costs ($5-20/mo).</BentoCard>
        <BentoCard title="2-Week Delivery">We build, you own. No endless retainers.</BentoCard>
      </div>
    </section>
  </div>
);

const BookingPage = ({ isDark }) => (
  <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
    <div className="flex justify-center mb-12"><KaiakLogo className="h-12 w-auto" isDark={isDark} /></div>
    <div className="text-center space-y-6">
      <Badge color="orange">3 Spots Remaining</Badge>
      <h1 className="font-mono text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">90-Minute Friction Audit</h1>
    </div>

    <LeadCapture />

    <div className="bg-[#0F172A] text-white rounded-2xl p-8 text-center space-y-8">
      <div><div className="text-5xl font-mono font-bold">$500</div><div className="text-xs text-slate-400 uppercase mt-2">Fully Credited</div></div>
      <button onClick={() => window.open(CONFIG.calendlyUrl, '_blank')} className="px-12 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold font-mono rounded-lg">
        Book Your Audit
      </button>
    </div>
  </div>
);

const ResourcesPage = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
    <h1 className="font-mono text-4xl font-bold text-slate-900 dark:text-white">Free Resources</h1>
    <LeadCapture />
    <div className="grid md:grid-cols-3 gap-6">
      {['Notion Templates', 'Automation Guides', 'Tool Comparisons'].map((t, i) => (
        <BentoCard key={i} title={t}>Coming soon - join the newsletter to get notified.</BentoCard>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---
const App = () => {
  const [page, setPage] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');`}</style>

        {/* HEADER */}
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button onClick={() => setPage('home')}><KaiakLogo className="h-8 w-auto" isDark={isDark} /></button>
            <div className="hidden md:flex items-center gap-8">
              {['home', 'booking', 'resources'].map(p => (
                <button key={p} onClick={() => setPage(p)} className="font-mono text-sm hover:text-orange-500 capitalize">{p}</button>
              ))}
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                {isDark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
              </button>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* MAIN */}
        <main className="animate-in fade-in duration-500">
          {page === 'home' && <HomePage navigate={setPage} isDark={isDark} />}
          {page === 'booking' && <BookingPage isDark={isDark} />}
          {page === 'resources' && <ResourcesPage />}
        </main>

        {/* FOOTER */}
        <footer className="bg-white dark:bg-[#0F172A] border-t border-gray-200 dark:border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <KaiakLogo className="h-6 w-auto mx-auto mb-4 opacity-50" isDark={isDark} />
            <div className="text-xs text-slate-400 font-mono">© 2024 KAIAK Automation</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;