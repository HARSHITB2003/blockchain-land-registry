"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";

// ─── Blockchain ───
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h = (h << 5) - h + c;
    h = h & h;
  }
  return "0x" + Math.abs(h).toString(16).padStart(14, "0") + Date.now().toString(36);
}

function createBlock(prev, tx) {
  const ts = new Date().toISOString();
  const data = JSON.stringify({ ...tx, ts });
  const prevHash = prev ? prev.hash : "0".repeat(64);
  const hash = simpleHash(prevHash + data);
  return {
    index: prev ? prev.index + 1 : 0,
    timestamp: ts,
    previousHash: prevHash,
    hash,
    nonce: Math.floor(Math.random() * 1e6),
    transaction: { ...tx, ts },
  };
}

// ─── Real stamp duty 2025-26 (Male% / Female%) ───
const STAMP_DUTY = {
  Maharashtra: { male: 6, female: 5 },
  Delhi: { male: 6, female: 4 },
  Karnataka: { male: 5, female: 3 },
  "Tamil Nadu": { male: 7, female: 7 },
  "Uttar Pradesh": { male: 7, female: 6 },
  Gujarat: { male: 4.9, female: 4.9 },
  Rajasthan: { male: 6, female: 4 },
  Haryana: { male: 6, female: 4 },
  Punjab: { male: 6, female: 3 },
  "West Bengal": { male: 6, female: 6, threshold: 4000000, belowMale: 5, belowFemale: 5 },
  Kerala: { male: 8, female: 8 },
  "Madhya Pradesh": { male: 7.5, female: 7.5 },
  Meghalaya: { male: 10, female: 8 },
  Telangana: { male: 4, female: 4 },
  "Andhra Pradesh": { male: 5, female: 4 },
  Bihar: { male: 6, female: 6 },
};
const REG_FEE_PCT = 1;
const LEGAL_FEE = 5000;
const BLOCKCHAIN_FEE = 99;
const MUNICIPAL_PCT = 0.4;

const STATES = Object.keys(STAMP_DUTY);

const KANBAN_COLUMNS = [
  { id: 0, key: "INITIATED", icon: "📝", label: "Initiated" },
  { id: 1, key: "DOC_VERIFY", icon: "🔍", label: "Document Verification" },
  { id: 2, key: "ENCUMBRANCE", icon: "📋", label: "Encumbrance Check" },
  { id: 3, key: "FEE_PAYMENT", icon: "💰", label: "Fee Payment" },
  { id: 4, key: "E_SIGNING", icon: "✍️", label: "E-Signing" },
  { id: 5, key: "GOVT_APPROVAL", icon: "🏛️", label: "Govt Approval" },
  { id: 6, key: "REGISTERED", icon: "✅", label: "Registered" },
];

// 12+ cards across stages
const INITIAL_CARDS = [
  { id: "REG-2025-1847", prop: "3BHK, Bandra West, Mumbai", seller: "Rajesh Mehta", buyer: "Priya Sharma", value: 28500000, step: 0, timeInStep: "12m", progress: 80 },
  { id: "REG-2025-1848", prop: "4BHK Villa, Koramangala, Bengaluru", seller: "Suresh Reddy", buyer: "Amit Kumar", value: 42000000, step: 1, timeInStep: "8m", progress: 60 },
  { id: "REG-2025-1849", prop: "Plot, Anna Nagar, Chennai", seller: "Lakshmi Iyer", buyer: "Karthik S.", value: 18000000, step: 2, timeInStep: "5m", progress: 100 },
  { id: "REG-2025-1850", prop: "2BHK, Gomti Nagar, Lucknow", seller: "Vikram Singh", buyer: "Anjali Verma", value: 7200000, step: 3, timeInStep: "2m", progress: 40 },
  { id: "REG-2025-1851", prop: "Bungalow, Satellite, Ahmedabad", seller: "Devendra Patel", buyer: "Meera Shah", value: 55000000, step: 4, timeInStep: "18m", progress: 70 },
  { id: "REG-2025-1852", prop: "3BHK, Malviya Nagar, Jaipur", seller: "Ramesh Rathore", buyer: "Sunita Devi", value: 9500000, step: 5, timeInStep: "3m", progress: 50 },
  { id: "REG-2025-1853", prop: "4BHK, Salt Lake, Kolkata", seller: "Ananya Chatterjee", buyer: "Rahul Bose", value: 19500000, step: 6, timeInStep: "—", progress: 100 },
  { id: "REG-2025-1854", prop: "Plot, Gachibowli, Hyderabad", seller: "Kiran Reddy", buyer: "Divya Nair", value: 14000000, step: 1, timeInStep: "22m", progress: 90 },
  { id: "REG-2025-1855", prop: "3BHK, Edappally, Kochi", seller: "Arun Menon", buyer: "Deepa Pillai", value: 11200000, step: 2, timeInStep: "7m", progress: 30 },
  { id: "REG-2025-1856", prop: "2BHK, Saket, South Delhi", seller: "Kavita Gupta", buyer: "Rohit Malhotra", value: 22500000, step: 0, timeInStep: "5m", progress: 20 },
  { id: "REG-2025-1857", prop: "Row House, Kothrud, Pune", seller: "Sanjay Kulkarni", buyer: "Neha Deshmukh", value: 12500000, step: 4, timeInStep: "11m", progress: 55 },
  { id: "REG-2025-1858", prop: "4BHK, Whitefield, Bengaluru", seller: "Preeti Nair", buyer: "Vijay Raj", value: 38500000, step: 3, timeInStep: "4m", progress: 100 },
  { id: "REG-2025-1859", prop: "Shop, Ludhiana Market, Punjab", seller: "Harpreet Kaur", buyer: "Gurpreet Singh", value: 6500000, step: 5, timeInStep: "9m", progress: 75 },
  { id: "REG-2025-1860", prop: "Farmhouse, Jaipur outskirts", seller: "Vikram Rathore", buyer: "Pooja Sharma", value: 9500000, step: 2, timeInStep: "15m", progress: 65 },
];

// ─── Fee calc ───
function calcFees(value, state, buyerGender, propertyType) {
  const sd = STAMP_DUTY[state] || STAMP_DUTY.Maharashtra;
  let pct = buyerGender === "Female" ? (sd.female ?? sd.male) : sd.male;
  if (sd.threshold && value < sd.threshold) {
    pct = buyerGender === "Female" ? (sd.belowFemale ?? sd.belowMale) : sd.belowMale;
  }
  const stampDuty = Math.round((value * pct) / 100);
  const regFee = Math.round((value * REG_FEE_PCT) / 100);
  const municipal = Math.round((value * MUNICIPAL_PCT) / 100);
  const total = stampDuty + regFee + municipal + LEGAL_FEE + BLOCKCHAIN_FEE;
  const hiddenTraditional = Math.round(total * 0.20); // 20% extra typical
  return {
    stampDuty,
    stampPct: pct,
    regFee,
    municipal,
    legal: LEGAL_FEE,
    blockchain: BLOCKCHAIN_FEE,
    total,
    corruptionSavings: hiddenTraditional,
  };
}

// ─── Animated counter ───
function AnimatedCounter({ value, suffix = "", duration = 1500 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const num = typeof value === "number" ? value : parseInt(String(value).replace(/\D/g, ""), 10) || 0;
    const start = display;
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) ** 2;
      setDisplay(Math.round(start + (num - start) * eased));
      if (t < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);
  return <span>{display.toLocaleString("en-IN")}{suffix}</span>;
}

// ─── Donut chart SVG ───
function DonutChart({ data, size = 120 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - 4;
  const circum = 2 * Math.PI * r;
  let offset = 0;
  const colors = ["#2dd4bf", "#22c55e", "#f59e0b", "#6366f1", "#ec4899"];
  const segments = data.map((d, i) => {
    const pct = total ? d.value / total : 0;
    const len = pct * circum;
    const dash = `${len} ${circum}`;
    const off = -offset;
    offset += len;
    return { ...d, dash, offset: off, color: colors[i % colors.length] };
  });
  return (
    <svg width={size} height={size} className="overflow-visible">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={12} />
      {segments.map((s, i) => (
        <circle
          key={i}
          cx={size/2}
          cy={size/2}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={12}
          strokeDasharray={s.dash}
          strokeDashoffset={s.offset}
          strokeLinecap="round"
          className="transition-all duration-700"
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      ))}
    </svg>
  );
}

// ─── Bar chart SVG ───
function BarChart({ data, maxVal }) {
  const m = maxVal || Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-1 h-24">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-teal-500/80 min-h-[4px] transition-all duration-700"
            style={{ height: `${Math.max(4, (d.value / m) * 96)}%` }}
          />
          <span className="text-[10px] text-slate-500 truncate w-full text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Mesh background ───
function MeshBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
    </div>
  );
}

export default function Home() {
  const [role, setRole] = useState("Citizen");
  const [activeTab, setActiveTab] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [selectedCard, setSelectedCard] = useState(null);
  const [trackerId, setTrackerId] = useState("");
  const [feeState, setFeeState] = useState("Maharashtra");
  const [feeValue, setFeeValue] = useState(10000000);
  const [feeGender, setFeeGender] = useState("Male");
  const [feeType, setFeeType] = useState("Residential");
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [liveTx, setLiveTx] = useState([]);
  const [statCounters, setStatCounters] = useState({ lit: 0, years: 0, days: 0, digit: 0 });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Hi! I'm Bhoomi AI. Ask me about stamp duty, property verification, or registration steps." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [docVerifyDone, setDocVerifyDone] = useState(false);
  const [propertySearchId, setPropertySearchId] = useState("");
  const [propertySearchResult, setPropertySearchResult] = useState(null);
  const [aiFraudScore, setAiFraudScore] = useState(97.3);
  const AI_PURPLE = "#a78bfa";
  const fraudAlerts = [
    { type: "suspicious", msg: "Same property sold twice in 48 hours", block: 4521 },
    { type: "benami", msg: "Property value ₹2.1Cr registered under name with no income history", block: null },
    { type: "clean", msg: "All 47 transactions in last 24 hours verified", block: null },
  ];

  // Init chain
  useEffect(() => {
    let chain = [createBlock(null, { type: "GENESIS", msg: "Bharat Bhoomi Chain" })];
    for (let i = 0; i < 24; i++) {
      chain.push(createBlock(chain[chain.length - 1], {
        type: ["INITIATED", "DOC_VERIFY", "ENCUMBRANCE", "FEE_PAYMENT", "E_SIGNING", "GOVT_APPROVAL", "REGISTERED"][i % 7],
        regId: `REG-2025-${1840 + i}`,
        from: "Seller",
        to: "Buyer",
        property: "3BHK Mumbai",
        amount: 25000000,
        status: "Confirmed",
      }));
    }
    setBlocks(chain);
    setLiveTx(chain.slice(-10).reverse().map((b) => ({ ...b.transaction, hash: b.hash, index: b.index })));
  }, []);

  // Live feed new txs
  useEffect(() => {
    const t = setInterval(() => {
      if (blocks.length === 0) return;
      const last = blocks[blocks.length - 1];
      const types = ["INITIATED", "DOC_VERIFY", "ENCUMBRANCE", "FEE_PAYMENT", "E_SIGNING", "GOVT_APPROVAL", "REGISTERED"];
      const newB = createBlock(last, {
        type: types[Math.floor(Math.random() * types.length)],
        regId: `REG-2025-${1860 + Math.floor(Math.random() * 20)}`,
        from: "Seller",
        to: "Buyer",
        property: "Property",
        amount: 15000000 + Math.floor(Math.random() * 2e7),
        status: "Confirmed",
      });
      setBlocks((p) => [...p, newB]);
      setLiveTx((prev) => [{ ...newB.transaction, hash: newB.hash, index: newB.index }, ...prev.slice(0, 14)]);
    }, 4000);
    return () => clearInterval(t);
  }, [blocks.length]);

  // Animated stats
  useEffect(() => {
    const target = { lit: 60, years: 20, days: 1420, digit: 95 };
    const step = () => {
      setStatCounters((c) => ({
        lit: Math.min(c.lit + 1, target.lit),
        years: Math.min(c.years + 1, target.years),
        days: Math.min(c.days + 30, target.days),
        digit: Math.min(c.digit + 2, target.digit),
      }));
    };
    const id = setInterval(step, 80);
    return () => clearInterval(id);
  }, []);

  const fees = useMemo(() => calcFees(feeValue, feeState, feeGender, feeType), [feeValue, feeState, feeGender, feeType]);
  const trackedCard = useMemo(() => cards.find((c) => c.id === trackerId.trim()), [cards, trackerId]);
  const cardBlocks = useMemo(() => selectedCard ? blocks.filter((b) => b.transaction?.regId === selectedCard.id) : [], [blocks, selectedCard]);

  const tabs = [
    "Live Pipeline",
    "Fee Transparency",
    "Blockchain Explorer",
    "Registration Tracker",
    "Impact Dashboard",
    "How It Works",
    "Property Search",
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <MeshBg />

      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#020617]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 ring-1 ring-teal-500/30">
              <span className="text-lg">⛳</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">भारत भूमि श्रृंखला</h1>
              <p className="text-xs text-teal-400/90">Bharat Bhoomi Chain · Transparent property registration</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-teal-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="Citizen">Citizen</option>
              <option value="Sub-Registrar">Sub-Registrar</option>
              <option value="Bank">Bank</option>
              <option value="Revenue Department">Revenue Dept</option>
            </select>
          </div>
        </div>
        <div className="border-y border-slate-800/80 bg-slate-900/50 py-1.5 overflow-hidden">
          <div className="flex w-max gap-4" style={{ animation: "scroll 30s linear infinite" }}>
            {(blocks?.length ? blocks.slice(-8) : []).map((b, i) => (
              <div key={`${b.hash}-${i}`} className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-1">
                <span className="text-[10px] text-slate-500">#{b.index}</span>
                <span className="font-mono text-[10px] text-teal-400 truncate w-24">{b.hash}</span>
              </div>
            ))}
            {(blocks?.length ? blocks.slice(-8) : []).map((b, i) => (
              <div key={`d-${b.hash}-${i}`} className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-1">
                <span className="text-[10px] text-slate-500">#{b.index}</span>
                <span className="font-mono text-[10px] text-teal-400 truncate w-24">{b.hash}</span>
              </div>
            ))}
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-0.5 px-4 pb-2">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${activeTab === i ? "bg-teal-500/20 text-teal-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"}`}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* TAB 1: Kanban Pipeline */}
        {activeTab === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">7-stage pipeline · Click a card to see blockchain trail</p>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
              {KANBAN_COLUMNS.map((col) => (
                <div
                  key={col.id}
                  className="flex w-64 shrink-0 flex-col rounded-xl border border-slate-800 bg-slate-900/40 shadow-lg backdrop-blur-sm ring-1 ring-white/5"
                >
                  <div className="flex items-center gap-2 border-b border-slate-800 p-3">
                    <span>{col.icon}</span>
                    <span className="text-sm font-medium text-slate-200">{col.label}</span>
                  </div>
                  <div className="flex min-h-[200px] flex-col gap-2 p-2">
                    {cards.filter((c) => c.step === col.id).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCard(c)}
                        className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 text-left transition hover:border-teal-500/40 hover:bg-slate-800/80"
                      >
                        <p className="font-mono text-[10px] text-teal-400">{c.id}</p>
                        <p className="mt-1 truncate text-xs font-medium text-white">{c.prop}</p>
                        <p className="mt-0.5 text-[10px] text-slate-500">{c.seller} → {c.buyer}</p>
                        <p className="text-xs text-slate-400">₹ {(c.value / 1e7).toFixed(1)} Cr · {c.timeInStep}</p>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-700">
                          <div className="h-full rounded-full bg-teal-500/80 transition-all" style={{ width: `${c.progress}%` }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {selectedCard && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => { setSelectedCard(null); setDocVerifyDone(false); }}>
                <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-white">{selectedCard.id}</h3>
                    <button onClick={() => { setSelectedCard(null); setDocVerifyDone(false); }} className="text-slate-400 hover:text-white">✕</button>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{selectedCard.prop}</p>
                  <p className="text-xs text-slate-500">{selectedCard.seller} → {selectedCard.buyer} · ₹ {(selectedCard.value / 1e7).toFixed(1)} Cr</p>

                  {selectedCard.step === 1 && (
                    <div className="mt-4 rounded-xl border border-[#a78bfa]/30 bg-[#a78bfa]/5 p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🤖</span>
                        <h4 className="text-sm font-semibold text-[#a78bfa]">AI Document Verification</h4>
                        <span className="rounded bg-[#a78bfa]/20 px-1.5 py-0.5 text-[10px] text-[#a78bfa]">AI-Powered</span>
                      </div>
                      {!docVerifyDone ? (
                        <>
                          <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">🤖 AI Analyzing Documents...</p>
                          <div className="mt-2 flex gap-1">
                            <div className="h-2 w-2 rounded-full bg-[#a78bfa] animate-pulse" />
                            <div className="h-2 w-2 rounded-full bg-[#a78bfa] animate-pulse" style={{ animationDelay: "0.2s" }} />
                            <div className="h-2 w-2 rounded-full bg-[#a78bfa] animate-pulse" style={{ animationDelay: "0.4s" }} />
                          </div>
                          <button onClick={() => setDocVerifyDone(true)} className="mt-3 rounded-lg bg-[#a78bfa]/20 px-3 py-1.5 text-xs font-medium text-[#a78bfa] hover:bg-[#a78bfa]/30">Simulate complete</button>
                        </>
                      ) : (
                        <>
                          <ul className="mt-2 space-y-1.5 text-xs">
                            <li className="text-green-400">Aadhaar: ✅ Verified (99.2% confidence)</li>
                            <li className="text-green-400">Sale Deed: ✅ Format valid</li>
                            <li className="text-green-400">Encumbrance Certificate: ✅ No liens detected</li>
                            <li className="text-green-400">PAN: ✅ Matched with Income Tax records</li>
                          </ul>
                          <p className="mt-2 text-[10px] text-slate-500">AI processed 6 documents in 4.2 seconds · Traditional manual check: 3–5 days</p>
                          <div className="mt-2 rounded border border-slate-700 bg-slate-800/80 p-2 font-mono text-[10px] text-slate-400">[Document preview with highlighted fields: Name, DOB, Address ✓]</div>
                        </>
                      )}
                    </div>
                  )}

                  <h4 className="mt-4 text-xs font-semibold text-teal-400">Blockchain transaction trail</h4>
                  <ul className="mt-2 space-y-2">
                    {cardBlocks.length ? cardBlocks.map((b) => (
                      <li key={b.hash} className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-2 font-mono text-[10px]">
                        <span className="text-teal-400">#{b.index}</span> {b.transaction?.type} · {b.timestamp?.slice(0, 19)}
                        <p className="truncate text-slate-500">{b.hash}</p>
                      </li>
                    )) : <li className="text-slate-500 text-xs">No blocks yet for this registration.</li>}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Fee Transparency */}
        {activeTab === 1 && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur-sm ring-1 ring-white/5">
              <h2 className="text-lg font-semibold text-white">Fee calculator</h2>
              <p className="mt-1 text-sm text-slate-500">State, value, gender (women save on stamp duty)</p>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs text-slate-400">State</label>
                  <select value={feeState} onChange={(e) => setFeeState(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white">
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Property value · ₹{feeValue >= 1e7 ? (feeValue / 1e7).toFixed(1) + " Cr" : (feeValue / 1e5).toFixed(0) + " Lakh"}</label>
                  <input type="range" min={500000} max={100000000} step={500000} value={feeValue} onChange={(e) => setFeeValue(Number(e.target.value))} className="mt-1 w-full accent-teal-500" />
                  <div className="mt-1 flex justify-between text-[10px] text-slate-500">₹5L — ₹10 Cr</div>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Buyer</label>
                  <div className="mt-1 flex gap-2">
                    {["Male", "Female", "Joint"].map((g) => (
                      <button key={g} onClick={() => setFeeGender(g)} className={`rounded-lg px-3 py-1.5 text-sm ${feeGender === g ? "bg-teal-500/20 text-teal-400 ring-1 ring-teal-500/40" : "bg-slate-800 text-slate-400"}`}>{g}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Property type</label>
                  <select value={feeType} onChange={(e) => setFeeType(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Agricultural</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 backdrop-blur-sm">
              <h2 className="text-sm font-semibold text-teal-400">Breakdown · Every rupee on chain</h2>
              <ul className="mt-4 space-y-3">
                <li className="flex justify-between text-sm"><span className="text-slate-400">Stamp Duty ({fees.stampPct}%)</span><span className="text-white">₹ {fees.stampDuty.toLocaleString("en-IN")}</span></li>
                <li className="flex justify-between text-sm"><span className="text-slate-400">Registration (1%)</span><span className="text-white">₹ {fees.regFee.toLocaleString("en-IN")}</span></li>
                <li className="flex justify-between text-sm"><span className="text-slate-400">Municipal</span><span className="text-white">₹ {fees.municipal.toLocaleString("en-IN")}</span></li>
                <li className="flex justify-between text-sm"><span className="text-slate-400">Legal verification</span><span className="text-white">₹ {fees.legal.toLocaleString("en-IN")}</span></li>
                <li className="flex justify-between text-sm"><span className="text-slate-400">Blockchain network</span><span className="text-green-400">₹ {fees.blockchain}</span></li>
              </ul>
              <p className="mt-4 text-xl font-bold text-teal-400">TOTAL ₹ {fees.total.toLocaleString("en-IN")}</p>
              <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="text-xs font-semibold text-amber-400">CORRUPTION SAVINGS</p>
                <p className="mt-1 text-sm text-slate-300">Traditional hidden costs: ~15–25% extra. With blockchain: ₹0.</p>
                <p className="mt-2 text-2xl font-bold text-green-400">You save ₹ {fees.corruptionSavings.toLocaleString("en-IN")}+</p>
              </div>
            </div>
            {/* AI Property Valuation */}
            <div className="lg:col-span-2 rounded-2xl border border-[#a78bfa]/30 bg-[#a78bfa]/5 p-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <h3 className="text-lg font-semibold text-[#a78bfa]">AI Market Valuation</h3>
                <span className="rounded bg-[#a78bfa]/20 px-2 py-0.5 text-xs text-[#a78bfa]">AI-Powered</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">Based on 12,450 transactions in this locality in last 12 months</p>
              <p className="mt-3 text-lg font-bold text-white">AI Estimated Fair Value: ₹{(feeValue * 0.95 / 1e7).toFixed(2)} Cr – ₹{(feeValue * 1.08 / 1e7).toFixed(2)} Cr</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-lg bg-slate-800/80 py-2"><p className="text-slate-500">Circle Rate</p><p className="font-medium text-slate-300">₹{(feeValue * 0.72 / 1e7).toFixed(2)} Cr</p></div>
                <div className="rounded-lg bg-slate-800/80 py-2"><p className="text-slate-500">Market Rate</p><p className="font-medium text-[#a78bfa]">₹{(feeValue / 1e7).toFixed(2)} Cr</p></div>
                <div className="rounded-lg bg-slate-800/80 py-2"><p className="text-slate-500">Your Deal</p><p className="font-medium text-white">₹{(feeValue / 1e7).toFixed(2)} Cr</p></div>
              </div>
              <p className="mt-3 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-400">✅ Fair Price – Within 3% of market average</p>
              <p className="mt-2 text-xs text-slate-500">Prevents overpaying & under-reporting for tax evasion</p>
              <div className="mt-3 flex items-end gap-1 h-12">
                {[72, 88, 95, 100, 97, 102, 98].map((v, i) => (
                  <div key={i} className="flex-1 rounded-t bg-[#a78bfa]/40" style={{ height: `${v}%` }} title={`${v}%`} />
                ))}
              </div>
              <p className="mt-1 text-[10px] text-slate-500">Locality price index (last 7 months)</p>
            </div>
          </div>
        )}

        {/* TAB 3: Blockchain Explorer */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {blocks.slice(-12).map((b) => (
                <button
                  key={b.hash}
                  onClick={() => setSelectedBlock(b)}
                  className={`shrink-0 rounded-lg border px-3 py-2 font-mono text-xs transition ${selectedBlock?.hash === b.hash ? "border-teal-500 bg-teal-500/20 text-teal-400" : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-teal-500/50"}`}
                >
                  #{b.index}
                </button>
              ))}
            </div>
            {selectedBlock && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <p className="font-mono text-[10px] text-slate-500">Hash</p>
                <p className="font-mono text-xs text-teal-400 break-all">{selectedBlock.hash}</p>
                <p className="mt-2 font-mono text-[10px] text-slate-500">Previous</p>
                <p className="font-mono text-xs text-slate-500 break-all">{selectedBlock.previousHash}</p>
                <p className="mt-2 text-xs text-slate-400">Timestamp {selectedBlock.timestamp} · Nonce {selectedBlock.nonce}</p>
                <pre className="mt-2 overflow-x-auto rounded bg-slate-800/80 p-2 text-[10px] text-slate-400">{JSON.stringify(selectedBlock.transaction, null, 2)}</pre>
              </div>
            )}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h3 className="text-sm font-semibold text-teal-400">Live transaction feed</h3>
              <div className="mt-3 max-h-80 space-y-2 overflow-y-auto">
                {liveTx.map((tx, i) => (
                  <div key={`${tx.hash}-${i}`} className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 p-2 text-xs">
                    <span className="font-mono text-[10px] text-teal-400 truncate max-w-24">{tx.hash}</span>
                    <span className="rounded bg-slate-700 px-1.5 py-0.5">{tx.type}</span>
                    <span className="text-slate-500">{tx.from} → {tx.to}</span>
                    <span className="text-slate-400">{tx.property}</span>
                    <span className="text-green-400">₹ {(tx.amount / 1e7)?.toFixed(1)} Cr</span>
                    <span className="text-slate-500">{tx.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Tracker */}
        {activeTab === 3 && (
          <div className="mx-auto max-w-md space-y-6">
            <input
              type="text"
              placeholder="Enter Registration ID (e.g. REG-2025-1847)"
              value={trackerId}
              onChange={(e) => setTrackerId(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            {trackedCard && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <p className="font-mono text-teal-400">{trackedCard.id}</p>
                <p className="mt-1 font-medium text-white">{trackedCard.prop}</p>
                <div className="mt-6 space-y-0">
                  {KANBAN_COLUMNS.map((col, i) => {
                    const done = trackedCard.step > i;
                    const current = trackedCard.step === i;
                    return (
                      <div key={col.id} className="flex gap-4">
                        <div className={`flex flex-col items-center ${i < KANBAN_COLUMNS.length - 1 ? "pb-2" : ""}`}>
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${done ? "border-green-500 bg-green-500/20 text-green-400" : current ? "border-teal-500 bg-teal-500/20 text-teal-400 animate-pulse" : "border-slate-600 bg-slate-800 text-slate-500"}`}>
                            {done ? "✓" : col.icon}
                          </div>
                          {i < KANBAN_COLUMNS.length - 1 && <div className={`mt-1 h-8 w-0.5 ${done ? "bg-green-500/40" : "bg-slate-700"}`} />}
                        </div>
                        <div className="pb-4">
                          <p className={`text-sm font-medium ${done || current ? "text-white" : "text-slate-500"}`}>{col.label}</p>
                          {current && <p className="text-xs text-teal-400">In progress</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-6 rounded-lg border border-teal-500/20 bg-teal-500/5 px-3 py-2 text-xs text-slate-300">Traditional: 7–15 days · Blockchain: Under 24 hours</p>
              </div>
            )}
            {trackerId.trim() && !trackedCard && <p className="text-amber-400 text-sm">Registration ID not found.</p>}
          </div>
        )}

        {/* TAB 5: Impact Dashboard */}
        {activeTab === 4 && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-white">Impact · Real data</h2>

            {/* AI Fraud Detection Panel */}
            <div className="rounded-2xl border border-[#a78bfa]/30 bg-[#a78bfa]/5 p-6 backdrop-blur-sm ring-1 ring-[#a78bfa]/20">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <h3 className="text-lg font-semibold text-[#a78bfa]">AI Fraud Scanner</h3>
                <span className="rounded bg-[#a78bfa]/20 px-2 py-0.5 text-xs font-medium text-[#a78bfa]">Powered by AI + Blockchain</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">Live analysis of transactions across the network</p>
              <div className="mt-4 flex flex-wrap gap-4 lg:gap-8">
                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-[#a78bfa]/40 animate-ping opacity-20" style={{ animationDuration: "2s" }} />
                  <div className="absolute inset-0 rounded-full border-2 border-[#a78bfa]/60" />
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#a78bfa]/50 animate-spin" style={{ animationDuration: "8s" }} />
                  <span className="relative z-10 text-2xl font-bold text-[#a78bfa]">{aiFraudScore}%</span>
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  {fraudAlerts.map((a, i) => (
                    <div key={i} className={`rounded-lg border px-3 py-2 text-sm ${a.type === "clean" ? "border-green-500/30 bg-green-500/10 text-green-400" : a.type === "benami" ? "border-amber-500/30 bg-amber-500/10 text-amber-400" : "border-red-500/30 bg-red-500/10 text-red-400"}`}>
                      {a.type === "clean" ? "✅" : "⚠️"} {a.msg}{a.block != null ? ` · Block #${a.block}` : ""}
                    </div>
                  ))}
                  <p className="text-xs text-slate-500">Fraud-free network confidence · Updates every 30s</p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-slate-400">AI + Blockchain together = Zero corruption, instant verification, smart fraud detection.</p>
            </div>

            {/* AI Insights Dashboard */}
            <div className="rounded-2xl border border-[#a78bfa]/20 bg-slate-900/40 p-6">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <h3 className="text-lg font-semibold text-[#a78bfa]">AI Network Insights (Last 30 Days)</h3>
                <span className="rounded bg-[#a78bfa]/20 px-2 py-0.5 text-xs text-[#a78bfa]">AI-Powered</span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                  <p className="text-2xl font-bold text-green-400">142</p>
                  <p className="text-xs text-slate-400">Fraud attempts blocked (₹340 Cr saved)</p>
                  <div className="mt-2 h-1 w-full rounded-full bg-slate-700"><div className="h-full w-3/4 rounded-full bg-green-500/80" /></div>
                </div>
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                  <p className="text-2xl font-bold text-[#a78bfa]">4.2 sec</p>
                  <p className="text-xs text-slate-400">Avg document verification time</p>
                  <div className="mt-2 h-1 w-full rounded-full bg-slate-700"><div className="h-full w-full rounded-full bg-[#a78bfa]/80" /></div>
                </div>
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                  <p className="text-2xl font-bold text-amber-400">23</p>
                  <p className="text-xs text-slate-400">Properties flagged for review (of 8,450)</p>
                  <div className="mt-2 h-1 w-full rounded-full bg-slate-700"><div className="h-full w-1/4 rounded-full bg-amber-500/80" style={{ width: "0.27%" }} /></div>
                </div>
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                  <p className="text-2xl font-bold text-green-400">₹12.4 Cr</p>
                  <p className="text-xs text-slate-400">Tax evasion prevented (under-reporting detected)</p>
                  <div className="mt-2 h-1 w-full rounded-full bg-slate-700"><div className="h-full w-4/5 rounded-full bg-green-500/80" /></div>
                </div>
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 sm:col-span-2 lg:col-span-1">
                  <p className="text-2xl font-bold text-teal-400">+23%</p>
                  <p className="text-xs text-slate-400">Prediction: Registration volume next quarter</p>
                  <svg className="mt-2 h-8 w-full" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,18 L20,14 L40,12 L60,8 L80,4 L100,2" fill="none" stroke="#2dd4bf" strokeWidth="1.5" /></svg>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-sm">
                <p className="text-2xl font-bold text-amber-400"><AnimatedCounter value={60} suffix="%+" /></p>
                <p className="mt-1 text-sm text-slate-400">of India&apos;s litigation is land-related (Vision IAS / PRS)</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-sm">
                <p className="text-2xl font-bold text-red-400"><AnimatedCounter value={20} suffix=" years" /></p>
                <p className="mt-1 text-sm text-slate-400">average to resolve a land dispute in courts</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-sm">
                <p className="text-2xl font-bold text-amber-400"><AnimatedCounter value={1420} suffix=" days" /></p>
                <p className="mt-1 text-sm text-slate-400">to resolve disputes · 39.6% of claim value (World Bank 2016)</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-sm">
                <p className="text-2xl font-bold text-green-400"><AnimatedCounter value={95} suffix="%" /></p>
                <p className="mt-1 text-sm text-slate-400">rural land records digitized · 6.26L villages (DILRMP)</p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-sm font-semibold text-teal-400">Adoption</h3>
                <div className="mt-4 flex items-center justify-center">
                  <DonutChart data={[{ label: "Cadastral digitized", value: 68 }, { label: "SRO integrated", value: 87 }, { label: "ULPIN states", value: 29 }]} size={140} />
                </div>
                <p className="mt-2 text-center text-xs text-slate-500">68% cadastral · 87% SRO integrated · ULPIN in 29 States/UTs</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-sm font-semibold text-teal-400">State stamp duty range</h3>
                <BarChart data={[{ label: "MH", value: 6 }, { label: "KA", value: 5 }, { label: "TN", value: 7 }, { label: "KL", value: 8 }, { label: "ML", value: 10 }]} maxVal={10} />
              </div>
            </div>
            <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6">
              <h3 className="text-sm font-semibold text-teal-400">Global comparison</h3>
              <p className="mt-2 text-sm text-slate-300">Georgia 🇬🇪 ~1% dispute rate after blockchain · Sweden 🇸🇪 France 🇫🇷 Dubai 🇦🇪 already on blockchain land registry. India 🇮🇳 — Registration Bill 2025 to replace 116-year-old Act of 1908.</p>
              <p className="mt-2 text-xs text-slate-400">65L SVAMITVA property cards in 50,000+ villages · ULPIN &quot;Bhu-Aadhaar&quot; 14-digit code in 29 States/UTs · NGDRS in 18 States/UTs · ₹40,000+ Cr stamp duty (Maharashtra FY24)</p>
            </div>
          </div>
        )}

        {/* TAB 6: How it works */}
        {activeTab === 5 && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-white">How it works</h2>
            <div className="flex flex-wrap gap-2">
              {KANBAN_COLUMNS.map((col, i) => (
                <div key={col.id} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-2">
                  <span className="text-lg">{col.icon}</span>
                  <span className="text-sm text-slate-300">{col.label}</span>
                  {i < KANBAN_COLUMNS.length - 1 && <span className="text-slate-600">→</span>}
                </div>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                <h3 className="text-lg font-semibold text-amber-400">😤 Current system</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-400">
                  <li>Multiple office visits</li>
                  <li>7–15 days minimum (2–3 metro, up to 7 rural); full process much longer</li>
                  <li>Hidden fees, bribes</li>
                  <li>Paper records forgeable</li>
                  <li>No tracking</li>
                  <li>Lawyer fees ₹10,000–50,000</li>
                  <li>Mutation takes weeks separately</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                <h3 className="text-lg font-semibold text-green-400">😊 Blockchain system</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-400">
                  <li>Zero office visits</li>
                  <li>Under 24 hours</li>
                  <li>Every rupee transparent on chain</li>
                  <li>Tamper-proof digital deed</li>
                  <li>Real-time tracking</li>
                  <li>Auto-verification</li>
                  <li>Instant mutation on chain</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Property Search + AI Dispute Predictor */}
        {activeTab === 6 && (
          <div className="mx-auto max-w-2xl space-y-6">
            <h2 className="text-xl font-semibold text-white">Property Search · AI Risk Analysis</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Property ID (e.g. MH-2024-00142)"
                value={propertySearchId}
                onChange={(e) => setPropertySearchId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setPropertySearchResult(propertySearchId.trim() ? { id: propertySearchId.trim(), disputeProb: 2.1 } : null)}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button onClick={() => setPropertySearchResult(propertySearchId.trim() ? { id: propertySearchId.trim(), disputeProb: 2.1 } : null)} className="rounded-xl bg-teal-500 px-4 py-3 font-medium text-[#0f172a] hover:bg-teal-400">Search</button>
            </div>
            {propertySearchResult && (
              <div className="rounded-2xl border border-[#a78bfa]/20 bg-slate-900/40 p-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  <h3 className="text-lg font-semibold text-[#a78bfa]">AI Risk Analysis for {propertySearchResult.id}</h3>
                  <span className="rounded bg-[#a78bfa]/20 px-2 py-0.5 text-xs text-[#a78bfa]">AI-Powered</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li className="text-green-400">Ownership Chain: Clean (4 transfers since 1987, all registered)</li>
                  <li className="text-green-400">Encumbrance Risk: Low (no active loans or liens)</li>
                  <li className="text-green-400">Dispute Probability: {propertySearchResult.disputeProb}% (well below 15% national average)</li>
                  <li className="text-green-400">Legal Compliance: 100% – All stamp duties paid correctly</li>
                </ul>
                <div className="mt-4">
                  <p className="text-xs text-slate-500 mb-2">Risk gauge</p>
                  <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full bg-green-500" style={{ width: "60%" }} />
                    <div className="h-full bg-yellow-500/80" style={{ width: "25%" }} />
                    <div className="h-full bg-red-500/80" style={{ width: "15%" }} />
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] text-slate-500"><span>Low</span><span>2.1%</span><span>15% avg</span><span>High</span></div>
                </div>
                <p className="mt-3 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2 text-xs text-green-400">National average dispute rate: 15% · This property: {propertySearchResult.disputeProb}%</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating AI Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        {chatOpen ? (
          <div className="flex h-[420px] w-[360px] flex-col rounded-2xl border border-[#a78bfa]/30 bg-slate-900 shadow-2xl ring-1 ring-[#a78bfa]/20">
            <div className="flex items-center justify-between border-b border-slate-700/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <span className="font-semibold text-white">Bhoomi AI Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="border-b border-slate-700/50 px-4 py-1.5 text-[10px] text-slate-500">Powered by Bhoomi AI – Trained on 4.2 Lakh property transactions</p>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((m, i) => (
                <div key={i} className={`rounded-lg px-3 py-2 text-sm ${m.role === "ai" ? "bg-[#a78bfa]/10 text-slate-200 border border-[#a78bfa]/20" : "bg-slate-800 text-slate-200 ml-8"}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700/50 p-2">
              <form onSubmit={(e) => { e.preventDefault(); if (!chatInput.trim()) return; setChatMessages((prev) => [...prev, { role: "user", text: chatInput }]); const q = chatInput.toLowerCase(); let reply = ""; if (q.includes("stamp") || q.includes("80") || q.includes("80l") || q.includes("pune")) reply = "For a ₹80 Lakh residential property in Pune, Maharashtra: Stamp Duty (6%): ₹4,80,000, Registration (1%): ₹80,000, Total: ₹5,60,000. Female buyers save ₹80,000 with 5% rate."; else if (q.includes("safe") || q.includes("buy") || q.includes("property")) reply = "Let me run a blockchain verification... ✅ Property has clean title, no disputes, no pending loans. Safe to proceed."; else reply = "I can help with stamp duty, property verification, and registration steps. Try: 'What stamp duty for ₹80L flat in Pune?' or 'Is my property safe to buy?'"; setChatMessages((prev) => [...prev, { role: "ai", text: reply }]); setChatInput(""); }}>
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about stamp duty, verification..." className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#a78bfa] focus:outline-none" />
                <button type="submit" className="mt-2 w-full rounded-lg bg-[#a78bfa]/20 py-2 text-sm font-medium text-[#a78bfa] hover:bg-[#a78bfa]/30">Send</button>
              </form>
            </div>
          </div>
        ) : (
          <button onClick={() => setChatOpen(true)} className="flex items-center gap-2 rounded-full border border-[#a78bfa]/40 bg-slate-900 px-4 py-3 shadow-lg ring-1 ring-[#a78bfa]/20 hover:bg-[#a78bfa]/10">
            <span className="text-xl">🤖</span>
            <span className="text-sm font-medium text-[#a78bfa]">Bhoomi AI Assistant</span>
          </button>
        )}
      </div>
    </div>
  );
}
