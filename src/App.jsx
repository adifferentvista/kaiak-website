import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, ArrowRight, CheckCircle, Clock, TrendingUp, Zap, Database, Menu, X, 
  FileText, ShieldCheck, Moon, Sun, MapPin, 
  ChevronRight, PlayCircle, Lock, Calendar, CreditCard, Mail, Sparkles,
  ChevronLeft, Hash, Share2, Bell
} from 'lucide-react';

// --- 📝 YOUR CONTENT ENGINE ---
const BLOG_DB = [
  {
    id: 'nyc-agencies-ai',
    title: 'Why NYC Agencies are Ditching VAs for AI',
    date: 'Oct 12, 2025',
    readTime: '4 min',
    tag: 'Opinion',
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed">The virtual assistant model is broken. For years, "High-Functioning" executives have been told that the solution to overwhelm is to hire cheap labor overseas. But labor requires management, and management requires executive function—the very resource you are low on.</p>
        <h3 className="text-xl font-bold mb-4 font-mono">The Friction of Humans</h3>
        <p className="mb-6 text-lg leading-relaxed">When you hire a VA, you aren't just buying time; you are buying a communication overhead. You have to explain the task, review the work, and correct mistakes. AI doesn't need sleep, doesn't misunderstand clear instructions, and scales infinitely.</p>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border-l-4 border-orange-500 mb-6">
            <p className="font-mono text-sm text-orange-800 dark:text-orange-200">"Automation is not about replacing humans. It's about replacing the robot inside the human."</p>
        </div>
        <p className="mb-6 text-lg leading-relaxed">We are seeing boutique agencies in Brooklyn replace 3-person admin teams with a single Make.com scenario. The result isn't just cost savings; it's speed. Client onboarding happens in 4 seconds, not 4 hours.</p>
      </>
    )
  },
  {
    id: 'notion-automation-guide',
    title: 'The Austin Executive\'s Guide to Notion Automation',
    date: 'Nov 01, 2025',
    readTime: '12 min',
    tag: 'Tutorial',
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed">Notion is usually a graveyard for ADHD ideas. We build "Dashboards" that we never look at again. The secret to making Notion work is ensuring you never have to input data manually.</p>
        <h3 className="text-xl font-bold mb-4 font-mono">Step 1: The Capture Layer</h3>
        <p className="mb-6 text-lg leading-relaxed">Stop typing into Notion. Use Tally Forms or Apple Shortcuts to capture ideas on the fly. This bypasses the friction of "opening the app and finding the right page."</p>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-slate-600 dark:text-slate-300">
            <li>Use Tally.so for client intake.</li>
            <li>Use Make.com to route emails directly to databases.</li>
            <li>Use AI to tag and sort the entries automatically.</li>
        </ul>
      </>
    )
  },
  {
    id: 'invoice-automation',
    title: 'How to Automate Invoicing for Coaches',
    date: 'Nov 15, 2025',
    readTime: '6 min',
    tag: 'Guide',
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed">Chasing money is the ultimate dopamine killer. If you are manually creating invoices in 2025, you are setting money on fire.</p>
        <p className="mb-6 text-lg leading-relaxed">The stack we recommend is Stripe + Zapier + Slack. When a client signs a contract (DocuSign), Stripe should automatically create a subscription, and Slack should notify you with a "Ca-Ching" sound. No human touch required.</p>
      </>
    )
  }
];

// --- CONFIGURATION (Update these with your real links later) ---
const CONFIG = {
  calendlyUrl: "https://calendly.com/your-link", 
  stripePaymentLink: "https://buy.stripe.com/your-link",
};

// --- ASSETS ---
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

// --- MODALS ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-mono text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const LeadMagnetModal = ({ isOpen, onClose, isExitIntent }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={isExitIntent ? "Wait! One Quick Thing..." : "Get the ADHD Workflow Checklist"}>
    <div className="space-y-6">
      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg flex items-start gap-4">
        <FileText className="w-8 h-8 text-orange-500 shrink-0" />
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">The 10-Point Protocol</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Stop fighting your brain. Use the exact checklist I use to enter deep work instantly.</p>
        </div>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Hook this up to ConvertKit/Beehiiv!"); onClose(); }}>
        <div>
          <label className="block text-xs font-mono text-slate-500 uppercase mb-1">Where should we send it?</label>
          <input type="email" placeholder="you@company.com" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900 dark:text-white" />
        </div>
        <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" /> Send Me The PDF
        </button>
      </form>
      <p className="text-[10px] text-center text-slate-400">We respect your inbox. No spam, just systems.</p>
    </div>
  </Modal>
);

const BookingModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Secure Your Audit">
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Total: $500</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">100% credited toward future implementation.</p>
      </div>
      <div className="space-y-3">
        <button onClick={() => window.open(CONFIG.stripePaymentLink, '_blank')} className="w-full py-4 bg-[#635BFF] hover:bg-[#5851E0] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all">
          <Zap className="w-4 h-4" /> Pay via Stripe
        </button>
        <div className="text-xs text-slate-400 font-mono">or</div>
        <button onClick={() => window.open(CONFIG.calendlyUrl, '_blank')} className="w-full py-4 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800">
          <Calendar className="w-4 h-4" /> View Availability First
        </button>
      </div>
    </div>
  </Modal>
);

// --- UI COMPONENTS ---
const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all active:scale-95 duration-200 font-mono text-sm";
  const styles = {
    primary: `bg-[#EA580C] text-white hover:opacity-90 shadow-sm hover:shadow-orange-500/20`,
    outline: `bg-transparent border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800`,
    ghost: `bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white`,
  };
  return <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>{children}</button>;
};

const Badge = ({ children, color = 'blue' }) => {
  const colorMap = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800',
    orange: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-100 dark:border-orange-800',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    green: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800',
  };
  return <span className={`inline-block px-3 py-1 rounded-md border text-xs font-mono uppercase tracking-wider ${colorMap[color] || colorMap.slate}`}>{children}</span>;
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

// --- LEAD CAPTURE (Replaces AI Audit) ---
const LeadCapture = ({ openLeadModal }) => {
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
    <div className="bg-slate-900 dark:bg-black text-white rounded-2xl p-8 shadow-xl border border-slate-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-orange-400" />
          <h3 className="font-mono font-bold text-lg">Get the Free Workflow Checklist</h3>
        </div>
        
        {!submitted ? (
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">The exact 10-point protocol I use before starting any deep work session. Stop fighting your brain.</p>
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
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-900/30 border border-green-800 p-4 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-200 font-mono">Check your inbox! 📬</p>
            </div>
            <button 
              onClick={() => document.getElementById('pricing-anchor')?.scrollIntoView({behavior: 'smooth'})} 
              className="text-orange-400 hover:text-orange-300 text-sm font-bold flex items-center gap-1"
            >
              Ready for the full system? <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- FUNCTIONAL MODULES ---
const LogicGrid = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          {['The Solution', 'Speed', 'Asset Ownership', 'Recurring Cost'].map(h => <th key={h} className="p-4 text-xs font-mono text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">{h}</th>)}
        </tr>
      </thead>
      <tbody className="text-sm font-mono">
        <tr className="bg-orange-50/50 dark:bg-orange-900/10">
          <td className="p-4 font-bold text-[#EA580C] flex items-center gap-2"><Zap className="w-4 h-4"/> KAIAK</td>
          <td className="p-4 text-slate-700 dark:text-slate-200">2 Weeks</td>
          <td className="p-4 text-slate-700 dark:text-slate-200">100% Yours</td>
          <td className="p-4 text-slate-700 dark:text-slate-200">$0</td>
        </tr>
        <tr><td className="p-4 font-bold text-slate-500">Hiring VA</td><td className="p-4 text-slate-500">6 Weeks</td><td className="p-4 text-slate-500">None</td><td className="p-4 text-slate-500">$3k/mo</td></tr>
        <tr><td className="p-4 font-bold text-slate-500">DIY</td><td className="p-4 text-slate-500">Infinite Loop</td><td className="p-4 text-slate-500">Yours</td><td className="p-4 text-slate-500">Your Sanity</td></tr>
      </tbody>
    </table>
  </div>
);

const SocialProof = () => (
  <div className="w-full overflow-hidden py-8 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1221]">
    <div className="flex gap-8 min-w-max">
      {[{ name: 'Agency Owner', res: 'Recovered 12hrs/week' }, { name: 'Coach', res: 'Saved $4k/mo' }, { name: 'Founder', res: '0 to $10k MRR' }, { name: 'Architect', res: 'Eliminated Data Entry' }].map((item, i) => (
        <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-800 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="font-bold text-slate-900 dark:text-white text-sm font-mono">{item.res}</span>
          <span className="text-xs text-slate-400 border-l border-slate-200 dark:border-slate-600 pl-3">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const ROICalculator = ({ setGlobalSavings }) => {
  const [hours, setHours] = useState(10);
  const saved = (hours * 150 * 52) / 1000; 
  useEffect(() => { if(setGlobalSavings) setGlobalSavings(saved); }, [saved, setGlobalSavings]);

  return (
    <BentoCard title="Time-to-Value" icon={Clock} className="border-orange-100 dark:border-orange-900/30 border-2 relative overflow-hidden group">
       <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-orange-100 dark:bg-orange-900/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
      <div className="space-y-6 relative z-10">
        <div>
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 font-mono">Admin Hours / Week: <span className="text-slate-900 dark:text-white font-bold">{hours}h</span></label>
          <input type="range" min="1" max="40" value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#EA580C]"/>
        </div>
        <div className="text-center pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-400 mb-1 font-mono uppercase">Potential Annual Savings</p>
          <p className="text-5xl font-mono font-bold text-[#EA580C] tracking-tight">${saved.toFixed(1)}k</p>
        </div>
      </div>
    </BentoCard>
  );
};

const FrictionCalculator = () => {
  const [rate, setRate] = useState(150);
  const [hours, setHours] = useState(8);
  const burned = rate * hours;
  const daysToROI = Math.ceil((500 / (burned / 30))); 

  return (
    <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-xl p-8 max-w-md mx-auto my-8 shadow-lg shadow-slate-100 dark:shadow-none">
      <h3 className="font-mono text-xl mb-6 flex items-center gap-2 text-slate-900 dark:text-white"><Zap className="w-5 h-5 text-orange-500" /> The Cost of Chaos</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1 uppercase">Hourly Rate ($)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:border-orange-500 text-slate-900 dark:text-white"/>
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1 uppercase">Hours Wasted / Month</label>
          <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:border-orange-500 text-slate-900 dark:text-white"/>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-2"><span className="text-slate-500 font-mono text-xs uppercase">Monthly Burn</span><span className="text-3xl font-mono text-slate-900 dark:text-white font-bold">${burned.toLocaleString()}</span></div>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/50 rounded-lg p-3 text-center mt-4"><p className="text-sm text-orange-900 dark:text-orange-200">Audit ROI in <span className="font-bold underline decoration-orange-500">{daysToROI === Infinity ? '-' : daysToROI} days</span>.</p></div>
        </div>
      </div>
    </div>
  );
};

// --- BLOG READER ---
const BlogReader = ({ post, onBack, openLeadModal }) => {
  useEffect(() => { window.scrollTo(0,0); }, []);
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={onBack} className="group flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-orange-500 mb-8 transition-colors"><ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Field Notes</button>
        <article>
            <header className="mb-12 space-y-6">
                <div className="flex gap-2"><Badge color="orange">{post.tag}</Badge><Badge color="slate">{post.readTime}</Badge></div>
                <h1 className="font-mono text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">{post.title}</h1>
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-6"><span className="text-sm font-mono text-slate-400">{post.date}</span><div className="flex gap-4"><button className="text-slate-400 hover:text-orange-500"><Share2 className="w-4 h-4" /></button><button className="text-slate-400 hover:text-orange-500"><Hash className="w-4 h-4" /></button></div></div>
            </header>
            <div className="prose prose-slate dark:prose-invert max-w-none font-sans text-lg text-slate-600 dark:text-slate-300">{post.content}</div>
            
            <div className="mt-16 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="text-center space-y-4">
                    <h3 className="font-mono text-xl font-bold text-slate-900 dark:text-white">Want these systems in your inbox?</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Join 5,000+ founders getting our weekly protocols.</p>
                    <Button onClick={openLeadModal}>Subscribe Free</Button>
                </div>
            </div>
        </article>
    </div>
  );
};

// --- PAGE COMPONENTS ---

const HomePage = ({ navigate, isDark, setGlobalSavings, openLeadModal }) => (
  <div className="space-y-24 pb-24">
    <section className="pt-12 md:pt-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 order-2 md:order-1">
        <Badge color="slate">System V 6.2</Badge>
        <h1 className="font-mono tracking-tight text-4xl md:text-6xl font-bold leading-[1.1] text-slate-900 dark:text-white">AI Workflow Automation for <span className="text-slate-400 dark:text-slate-500">Overwhelmed Professionals.</span></h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigate('friction')} className="shadow-xl shadow-orange-500/20">Book Friction Finder <ArrowRight className="ml-2 w-4 h-4" /></Button>
          <Button variant="outline" onClick={openLeadModal}>Get The Checklist</Button>
        </div>
      </div>
      <div className="order-1 md:order-2 relative h-[400px] bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm flex items-center justify-center group cursor-pointer">
         <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-50 rounded-3xl"></div>
         <PlayCircle className="w-16 h-16 text-orange-500 fill-orange-100 dark:fill-orange-900 z-10" />
      </div>
    </section>

    <section className="border-y border-gray-100 dark:border-slate-800 bg-white dark:bg-[#0F172A] py-10 overflow-hidden">
       <div className="max-w-7xl mx-auto px-6 text-center"><p className="text-[10px] font-mono text-slate-400 mb-8 uppercase tracking-[0.2em]">The Tech Stack We Master</p><div className="flex justify-center gap-8 flex-wrap grayscale opacity-50">{['Notion', 'Make', 'OpenAI', 'Slack'].map(t => <span key={t} className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">{t}</span>)}</div></div>
    </section>

    <section className="max-w-4xl mx-auto px-6"><div className="mb-12 text-center"><h2 className="font-mono text-3xl font-bold mb-4 text-slate-900 dark:text-white">The Logic</h2></div><div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden"><LogicGrid /></div></section>

    <section className="max-w-7xl mx-auto px-6">
      <div className="mb-12 md:text-center"><h2 className="font-mono text-3xl font-bold mb-4 text-slate-900 dark:text-white">The Entropy Problem</h2></div>
      <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 md:h-[600px]">
        <div className="md:col-span-1 md:row-span-2"><BentoCard className="h-full bg-[#0F172A] dark:bg-[#0F172A] text-white border-slate-800 dark:border-slate-700" title="The ADHD Tax"><p className="text-slate-300 mt-2">Late fees. Subscriptions. Mental energy.</p><div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10"><div className="text-4xl font-mono font-bold text-orange-500 mb-1">15h</div><div className="text-xs text-slate-400 font-mono uppercase">Lost per week</div></div></BentoCard></div>
        <div className="md:col-span-2 md:row-span-1"><BentoCard className="h-full relative overflow-hidden min-h-[250px] bg-gray-50 dark:bg-[#1E293B]" title="Browser Bankruptcy"><div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-slate-900/60"><div className="bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg shadow-sm font-mono text-xs font-bold">47 Tabs Open</div></div></BentoCard></div>
        <div className="md:col-span-1 md:row-span-1"><ROICalculator setGlobalSavings={setGlobalSavings} /></div>
        <div className="md:col-span-1 md:row-span-1"><BentoCard className="h-full flex items-center justify-center bg-white dark:bg-[#1E293B] border-slate-200 dark:border-slate-700"><blockquote className="font-mono text-lg text-slate-800 dark:text-slate-200 font-bold text-center">"<span className="text-orange-500">I'm not broken</span>, my system is."</blockquote></BentoCard></div>
      </div>
    </section>
  </div>
);

const FrictionFinderPage = ({ isDark, openBooking, globalSavings, openLeadModal }) => (
  <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
    <div className="flex justify-center mb-12"><KaiakLogo className="h-12 w-auto" isDark={isDark} /></div>
    <div className="text-center space-y-6">
      <Badge color="orange">3 Spots Remaining</Badge>
      <h1 className="font-mono text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">90 Minutes to Fix Your Workflow.</h1>
      {globalSavings && <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 inline-flex items-center gap-2 px-4 py-2 rounded-full"><span className="text-sm font-mono text-green-800 dark:text-green-300">Recover ${globalSavings.toFixed(1)}k/yr potential savings</span></div>}
    </div>
    
    <LeadCapture openLeadModal={openLeadModal} />
    
    <div id="pricing-anchor" className="bg-[#0F172A] text-white rounded-2xl overflow-hidden shadow-2xl dark:border dark:border-slate-700">
        <SocialProof /> 
        <div className="p-8 text-center space-y-8 relative z-10">
            <div className="flex flex-col items-center gap-2"><div className="text-5xl font-mono font-bold text-white">$500</div><div className="text-xs text-slate-400 uppercase tracking-widest">Fully Credited Deposit</div></div>
            <button onClick={openBooking} className="w-full md:w-auto mt-8 px-12 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold font-mono rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto shadow-lg shadow-orange-900/20"><Zap className="w-5 h-5" /> Secure Your Audit</button>
        </div>
    </div>
    <FrictionCalculator />
  </div>
);

const CaseStudiesPage = () => (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <h1 className="font-mono text-4xl font-bold text-slate-900 dark:text-white">System Architectures</h1>
        <div className="grid md:grid-cols-2 gap-6">
            {['Agency Onboarding', 'School Enrollment', 'Content Engine', 'Finance Sync'].map((t, i) => (
                <div key={i} className="group bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-orange-500 transition-all cursor-pointer"><h3 className="font-bold text-lg text-slate-900 dark:text-white">{t}</h3><div className="mt-4 text-green-600 font-mono text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Recovered 12hrs/week</div></div>
            ))}
        </div>
    </div>
);

const AboutPage = () => (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        <h1 className="font-mono text-4xl font-bold text-slate-900 dark:text-white">From Burnout to Blueprint.</h1>
        <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-16">
            {[
              { year: '2019', title: 'Head of School', desc: 'Managing 40 staff members. Working 60hr weeks. Drowning in email, compliance, and scheduling.' },
              { year: '2020', title: 'The Crash', desc: 'Diagnosed with adult ADHD. Realized that standard productivity advice is useless for neurodivergent brains.' },
              { year: '2022', title: 'The Discovery', desc: 'Started connecting Notion API to OpenAI. Built a "Second Brain" that handled the boring stuff automatically.' },
              { year: 'Now', title: 'KAIAK', desc: 'We engineer that same freedom for other founders. No fluff. Just calm code.' }
            ].map((item, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-orange-500 rounded-full"></div>
                  <span className="font-mono text-orange-500 font-bold block mb-2">{item.year}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
           <BentoCard title="Anti-Hype" icon={ShieldCheck}>We don't use AI because it's cool. We use it if it saves time. If a spreadsheet is faster, we use a spreadsheet.</BentoCard>
           <BentoCard title="Ownership" icon={Database}>You own the API keys. You own the data. We build the car, but you hold the title.</BentoCard>
        </div>
    </div>
);

const ResourcesPage = ({ onReadPost, openLeadModal }) => (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="bg-[#0F172A] dark:bg-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white space-y-2">
                <Badge color="orange">Newsletter</Badge>
                <h2 className="font-mono text-3xl font-bold">The ADHD Workflow Checklist</h2>
                <p className="text-slate-400 max-w-md">The exact 10-point protocol I use before starting any deep work session. Join 5,000+ founders.</p>
            </div>
            <div className="w-full md:w-auto bg-white dark:bg-slate-900 p-6 rounded-xl space-y-4 min-w-[320px]">
                <div className="font-mono text-xs text-slate-400 uppercase">Get the PDF</div>
                <div className="flex gap-2">
                    <input type="email" placeholder="Email..." className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-white" />
                    <button className="bg-orange-500 text-white px-4 py-2 rounded font-mono text-sm hover:bg-orange-600">Send</button>
                </div>
            </div>
        </div>

        <div className="space-y-6"><h3 className="font-mono text-xl font-bold text-slate-900 dark:text-white">Blueprint Library</h3><div className="grid md:grid-cols-3 gap-6">{[{t:'Inbox Zero', type:'Make'}, {t:'Onboarding', type:'Notion'}, {t:'Content', type:'GPT-4'}].map((item, i) => (<div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl"><Badge color="green">{item.type}</Badge><h4 className="font-bold mt-2 text-slate-900 dark:text-white">{item.t}</h4></div>))}</div></div>
        
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 dark:border-slate-700 pb-4 gap-4">
                <div>
                    <h3 className="font-mono text-xl font-bold text-slate-900 dark:text-white">Field Notes (Blog)</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-sans mt-1">Weekly strategies on automation & ADHD.</p>
                </div>
                <Button variant="outline" className="text-xs h-8" onClick={openLeadModal}><Bell className="w-3 h-3 mr-2"/> Subscribe</Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">{BLOG_DB.map((post, i) => (<div key={i} onClick={() => onReadPost(post)} className="group cursor-pointer"><div className="bg-slate-100 dark:bg-slate-800 h-48 rounded-xl mb-4 flex items-center justify-center"><PlayCircle className="w-12 h-12 text-slate-300" /></div><h4 className="font-bold text-lg text-slate-900 dark:text-white">{post.title}</h4></div>))}</div>
        </div>
    </div>
);

const StickyMobileCTA = ({ onBook }) => (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <button onClick={onBook} className="w-full bg-[#0F172A] text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex items-center justify-between"><div className="text-left"><div className="text-xs text-slate-400 font-mono uppercase">Fee is credited</div><div className="font-bold text-white">Book Audit ($500)</div></div><div className="bg-orange-600 p-2 rounded-lg"><ArrowRight className="w-5 h-5 text-white" /></div></button>
    </div>
);

// --- MAIN APP ---
const App = () => {
  const [page, setPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLeadModalOpen, setLeadModalOpen] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const [globalSavings, setGlobalSavings] = useState(null);
  const [showSticky, setShowSticky] = useState(false);
  const [activePost, setActivePost] = useState(null);

  // EXIT INTENT LOGIC
  useEffect(() => {
    const handleExit = (e) => {
      if (e.clientY <= 0) {
        if (!localStorage.getItem('kaiak_exit_seen')) {
           setExitModalOpen(true);
           localStorage.setItem('kaiak_exit_seen', 'true');
        }
      }
    };
    document.addEventListener('mouseleave', handleExit);
    return () => document.removeEventListener('mouseleave', handleExit);
  }, []);

  useEffect(() => { 
      window.scrollTo(0, 0);
      const handleScroll = () => { if (window.scrollY > 600) setShowSticky(true); else setShowSticky(false); };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll); 
  }, [page, activePost]);
  
  const toggleTheme = () => setIsDark(!isDark);
  const handleNav = (target) => { setPage(target); setActivePost(null); setMobileMenuOpen(false); };
  const handleReadPost = (post) => { setActivePost(post); window.scrollTo(0, 0); };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 pb-20">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap'); .scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button onClick={() => handleNav('home')}><KaiakLogo className="h-8 w-auto" isDark={isDark} /></button>
            <div className="hidden md:flex items-center gap-8">
              {['home', 'about', 'case-studies'].map(p => <button key={p} onClick={() => handleNav(p)} className="font-mono text-sm hover:text-orange-500 capitalize text-slate-700 dark:text-slate-300">{p.replace('-', ' ')}</button>)}
              <button onClick={() => handleNav('resources')} className="font-mono text-sm hover:text-orange-500 text-slate-700 dark:text-slate-300">Field Notes</button>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                {isDark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
              </button>
              <Button onClick={() => handleNav('friction')} className="h-10 text-xs">Book Audit</Button>
            </div>
            <div className="flex items-center gap-4 md:hidden">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                {isDark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700 dark:text-slate-300">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-slate-800 p-6 flex flex-col gap-6 shadow-xl">
              {['home', 'about', 'case-studies', 'resources'].map(p => <button key={p} onClick={() => handleNav(p)} className="text-left font-mono capitalize text-slate-700 dark:text-slate-300">{p.replace('-', ' ')}</button>)}
              <Button onClick={() => handleNav('friction')}>Book Audit</Button>
            </div>
          )}
        </nav>

        <main>
          {activePost ? (
              <BlogReader post={activePost} onBack={() => setActivePost(null)} openLeadModal={() => setLeadModalOpen(true)} />
          ) : (
              <>
                {page === 'home' && <HomePage navigate={handleNav} isDark={isDark} setGlobalSavings={setGlobalSavings} openLeadModal={() => setLeadModalOpen(true)} />}
                {page === 'friction' && <FrictionFinderPage isDark={isDark} openBooking={() => setBookingModalOpen(true)} globalSavings={globalSavings} openLeadModal={() => setLeadModalOpen(true)} />}
                {page === 'case-studies' && <CaseStudiesPage />}
                {page === 'about' && <AboutPage />}
                {page === 'resources' && <ResourcesPage onReadPost={handleReadPost} openLeadModal={() => setLeadModalOpen(true)} />}
              </>
          )}
        </main>

        {showSticky && page !== 'friction' && (<StickyMobileCTA onBook={() => handleNav('friction')} />)}
        
        <LeadMagnetModal isOpen={isLeadModalOpen} onClose={() => setLeadModalOpen(false)} />
        <LeadMagnetModal isOpen={isExitModalOpen} onClose={() => setExitModalOpen(false)} isExitIntent={true} /> 
        <BookingModal isOpen={isBookingModalOpen} onClose={() => setBookingModalOpen(false)} />

        <footer className="bg-white dark:bg-[#0F172A] border-t border-gray-200 dark:border-slate-800 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-start gap-4"><KaiakLogo className="h-6 w-auto opacity-50 grayscale hover:grayscale-0 transition-all" isDark={isDark} /><div className="text-xs text-slate-400 font-mono">© 2024 KAIAK Automation.</div></div>
            <div className="flex items-center gap-4 bg-[#F5F5F7] dark:bg-slate-800 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700"><span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">We build in YOUR stack</span><div className="flex gap-2 opacity-40 text-slate-600 dark:text-slate-400"><Database className="w-3 h-3" /><LayoutGrid className="w-3 h-3" /><Zap className="w-3 h-3" /></div></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
