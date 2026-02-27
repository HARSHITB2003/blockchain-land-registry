# 🏛️ Bharat Bhoomi Chain — भारत भूमि श्रृंखला

### What if registering property in India was as easy as ordering on Amazon?

**No lawyers. No bribes. No 10 visits to the Sub-Registrar office. No "come back next week." Just transparent, instant, tamper-proof registration — powered by Blockchain + AI.**

🔗 **Live Demo:** [blockchain-land-registry-two.vercel.app](https://blockchain-land-registry-two.vercel.app/)
💻 **GitHub:** [github.com/HARSHITB2003/blockchain-land-registry](https://github.com/HARSHITB2003/blockchain-land-registry)

---

## 📖 Table of Contents

1. [How This Was Built — The AI Toolkit](#-how-this-was-built--the-ai-toolkit)
2. [Why This Matters — The Problem in Numbers](#-why-this-matters--the-problem-in-numbers)
3. [How Property Registration Works Today](#-how-property-registration-works-today-the-pain)
4. [Our Solution — Blockchain + AI](#-our-solution--how-blockchain--ai-fixes-everything)
5. [AI Features Deep Dive](#-ai-features--why-blockchain-alone-isnt-enough)
6. [Fee Transparency — Real Rates](#-fee-transparency--real-data-real-rates)
7. [Countries Already Doing This](#-countries-already-doing-this)
8. [Features Built](#-features-built-in-this-prototype)
9. [Technical Architecture](#️-technical-architecture)
10. [The Impact](#-the-impact--what-changes-if-india-adopts-this)
11. [What This Proves About AI in 2026](#-what-this-proves-about-ai-in-2026)
12. [The AI Toolkit That Built This](#-the-complete-ai-toolkit)
13. [Run It Yourself](#-run-it-yourself)
14. [Data Sources](#-data-sources--every-number-is-verified)
15. [Disclaimer](#️-disclaimer)

---

## 🧪 How This Was Built — The AI Toolkit

**Full transparency. This project was entirely vibe coded.**

One person. One evening. Zero blockchain experience. Zero web dev background. 100% AI-assisted.

Here's EXACTLY what tools were used and how:

### The AI Stack That Built This Project

| Tool | What It Did | Time Saved |
|------|------------|------------|
| **Cursor** (AI Code Editor) | Wrote 95% of all code — React components, blockchain engine, Tailwind styling, MetaMask integration | Weeks → Hours |
| **Claude** (Anthropic) | Guided entire architecture, wrote all Cursor prompts, researched real government data, verified stamp duty rates, structured the README | Would've taken days of research |
| **ChatGPT** | Cross-verified statistics, brainstormed AI feature ideas, helped refine the problem statement | Hours of fact-checking |
| **v0.dev** (Vercel) | Rapid UI prototyping — tested different dashboard layouts before finalizing | Days of design → Minutes |
| **Perplexity AI** | Deep research on global blockchain land registries (Georgia, Sweden, Dubai) with cited sources | Library-level research in minutes |
| **GitHub Copilot** (inside Cursor) | Auto-completed code patterns, suggested optimizations, caught errors in real-time | Constant micro-savings |
| **Vercel** | One-click deployment from GitHub — zero DevOps knowledge needed | Hours of server config → 2 minutes |
| **Claude Artifacts** | Built the initial working prototype as a React component before moving to Cursor | Instant proof-of-concept |
| **Gamma.app** | Can be used to create a pitch deck from this README in seconds | Presentation-ready |
| **Napkin AI** | Can turn the statistics in this README into shareable infographics | Visual content for LinkedIn |
| **ElevenLabs** | Can generate a Hindi + English voiceover for a demo video walkthrough | Professional narration |
| **Descript / CapCut** | Can create a screen recording with captions for LinkedIn video post | Video editing in minutes |

### The Prompt Engineering Approach

This wasn't random "ask AI to build me an app." It was structured prompt engineering:

**Prompt 1 — Problem Definition:** Fed Claude the actual Rajya Sabha video discussion about India's land records crisis. Asked it to extract the core problems with real data.

**Prompt 2 — Architecture:** Asked Claude to design a blockchain-based solution specifically for Indian property registration, considering Indian stamp duty structure, the role of Sub-Registrar, encumbrance certificates, and mutation process.

**Prompt 3 — Mega Prompt to Cursor:** A single 2000+ word prompt to Cursor that described every feature, every tab, every data point, design requirements, and Indian-specific details. This one prompt generated the entire application.

**Prompt 4 — AI Features Layer:** A separate prompt adding AI fraud detection, document verification, property valuation, dispute prediction, and chatbot — with specific Indian context.

**Prompt 5 — Real Data Integration:** Researched and fed real stamp duty rates, DILRMP statistics, World Bank data, and court statistics into the application.

**Prompt 6 — Polish & Deploy:** MetaMask integration, document hashing, README, GitHub push, Vercel deployment.

**Total prompts written: ~6 major prompts, ~15 minor iterations**
**Total time: ~2 hours**
**Total cost: ₹0 (all free tiers)**

---

## 📊 Why This Matters — The Problem in Numbers

These are not opinions. Every number is sourced and verifiable.

### The Scale of the Crisis
╔══════════════════════════════════════════════════════════════╗
║  60%+ of ALL court cases in India are about LAND            ║
║  That's roughly 2.6 CRORE pending land dispute cases        ║
╚══════════════════════════════════════════════════════════════╝
Let that sink in. More than half of every case clogging India's judiciary — 4.4 crore+ pending cases — is someone fighting over who owns a piece of land. Not criminal cases. Not corporate disputes. Land.

**A land dispute takes an average of 20 YEARS to resolve.** A father starts a case and his son finishes it. Sometimes his grandson.

**India needs 1,420 days and 39.6% of the claim value to resolve a property dispute.** The World Bank found that resolving a property dispute in India costs nearly 40% of the property's value in legal fees.

**The Registration Act governing all of this is from 1908.** We're running a 21st century real estate market on a 116-year-old British colonial law.

### What's Been Done (And Why It's Not Enough)
╔══════════════════════════════════════════════════════════════╗
║  95% rural land records digitized — but disputes haven't    ║
║  reduced because digitizing a broken system gives you a     ║
║  digitized broken system                                     ║
╚══════════════════════════════════════════════════════════════╝

The government has spent thousands of crores on DILRMP (Digital India Land Records Modernization Programme) since 2008. Records are on computers now. But the underlying problems remain:

- **Presumptive titles** — the government doesn't guarantee your ownership
- **Fragmented databases** — Revenue Dept, Survey Dept, and Registration Dept maintain separate records that don't sync
- **Only 68% of cadastral maps** (actual land boundary maps) are digitized
- **No single source of truth** — you still need to visit multiple offices to verify anything

Maharashtra alone collected **₹40,000+ Crore in stamp duty** in FY 2023-24. The money is massive. The incentive to keep it transparent should be too.

---

## 🏢 How Property Registration Works Today (The Pain)

Here's what ACTUALLY happens when you buy property in India in 2026:

**Step 1: Find a lawyer (₹10,000 - ₹50,000)**
You practically cannot register without one. First hidden cost.

**Step 2: Title verification (1-2 weeks)**
Lawyer manually checks 30+ years of ownership by physically visiting Sub-Registrar and tehsildar offices. No single database exists. Three departments maintain separate records that don't talk to each other.

**Step 3: Encumbrance Certificate (3-7 days)**
Apply, wait, and hope records are accurate. They often aren't.

**Step 4: Stamp paper / E-stamping**
Stamp duty varies wildly: 3% to 10% by state. Most citizens don't know their exact rate. Many get overcharged.

**Step 5: Sub-Registrar Office (multiple visits)**
Both parties + two witnesses must physically appear. Missing one document? Come back next week. Long queues. Slow systems. "Speed money" to skip the line.

**Step 6: Wait (2-15 days)**
The Sub-Registrar processes registration. No tracking. No updates. Just wait.

**Step 7: Mutation (weeks to months — SEPARATELY)**
Registration isn't the end. You need a separate mutation at the tehsildar office. Separate paperwork. Separate visits. Many people don't even know this step exists.

**After ALL of this — your title is still "presumptive." Not guaranteed by the government. Someone can challenge your ownership in court. That case? 20 years.**

### The Real Cost on a ₹1 Crore Property

| Fee | Amount | Where It Goes |
|-----|--------|---------------|
| Stamp Duty (Maharashtra, male) | ₹6,00,000 | State Government |
| Registration Fee (1%) | ₹1,00,000 | Revenue Department |
| Lawyer | ₹15,000 - ₹50,000 | Lawyer |
| "Speed money" / unofficial charges | ₹50,000 - ₹2,00,000 (estimated) | Nobody knows |
| Time off work (5-10 visits) | Unquantifiable | Lost productivity |
| **TOTAL** | **₹7,65,000 - ₹10,50,000** | |

With blockchain: ₹7,05,099 (stamp duty + registration + ₹5,000 legal + ₹99 blockchain fee). Zero hidden charges. Zero bribes. Savings: up to ₹3,45,000.

---

## 🔗 Our Solution — How Blockchain + AI Fixes Everything

**Bharat Bhoomi Chain replaces the entire process with a 7-step pipeline that completes in under 24 hours.**

### The 7-Step Blockchain Pipeline
📝 Initiate     →  🔍 AI Doc        →  📋 Encumbrance   →  💰 Fee
(5 min)            Verification        Check               Payment
(30 seconds)        (instant)           (transparent)
↓                                       ↓
✅ REGISTERED   ←  🏛️ Govt          ←  ✍️ E-Signing
(instant            Approval            (10 min)

auto mutation)   (digital review)


**Step 1: Initiate (5 minutes)** — Enter property details, Aadhaar, PAN online. New transaction created on blockchain. Get a tracking ID.

**Step 2: AI Document Verification (30 seconds)** — AI validates all documents instantly with confidence scores. Replaces 1-2 weeks of manual lawyer verification.

**Step 3: Encumbrance Check (instant)** — Blockchain already has complete ownership history. Query in milliseconds. Replaces 3-7 days waiting.

**Step 4: Fee Payment (transparent)** — Smart contract calculates ALL fees based on property value, state, and buyer gender. Every rupee recorded on blockchain. No hidden charges possible.

**Step 5: E-Signing (10 minutes)** — Digital signatures via Aadhaar e-sign or MetaMask wallet. No physical presence needed.

**Step 6: Government Approval (digital)** — Sub-Registrar reviews digitally. AI pre-verifies everything, so only genuinely problematic cases need manual review.

**Step 7: Registered + Instant Mutation** — Ownership transferred on blockchain. Digital deed generated with unique hash. Mutation is automatic because blockchain IS the single source of truth.

### Side-by-Side Comparison

| | 😤 Current System | 😊 Blockchain System |
|--|-------------------|---------------------|
| **Total Time** | 7-15 days (+ weeks for mutation) | Under 24 hours (mutation included) |
| **Office Visits** | 5-10 minimum | Zero |
| **Hidden Costs** | 15-25% extra (estimated) | ₹0 — every fee on public ledger |
| **Document Safety** | Paper — can be forged, lost, burned | Digital hash on blockchain — tamper-proof forever |
| **Tracking** | None (bribe the peon for status) | Real-time (like tracking a Zomato order) |
| **Title Guarantee** | Presumptive (can be challenged) | Conclusive (blockchain-verified, immutable) |
| **Fraud Detection** | Manual, after the fact, slow | AI-powered, real-time, instant |
| **Mutation** | Separate process, separate office, weeks | Automatic, instant, included |
| **Lawyer Needed** | Practically mandatory | Optional (AI handles verification) |
| **Accessibility** | Only during office hours, only in person | 24/7, from anywhere, any device |

---

## 🤖 AI Features — Why Blockchain Alone Isn't Enough

Blockchain solves transparency and immutability. But India's land crisis also involves fraud, forgery, information asymmetry, and a knowledge gap. That's where AI comes in.

### 1. AI Fraud Detection 🛡️

**What it does:** Continuously scans all transactions for suspicious patterns in real-time.

**Real scenarios it catches:**
- Same property sold to two different buyers simultaneously → **BLOCKED**
- Property worth ₹50L registered at ₹10L (under-reporting for stamp duty evasion) → **FLAGGED**
- Benami transaction pattern (registered under someone with no income history) → **ALERTED**
- Sudden ownership change on property under court dispute → **BLOCKED**
- Multiple registrations from same IP/device in short time → **FLAGGED**

**Today's system:** These frauds go undetected for years. Sometimes decades. The White Paper on Black Money (2012) specifically highlighted benami properties as a major channel for black money. AI + blockchain catches them in seconds.

### 2. AI Document Verification 📄

**What it does:** When you upload Aadhaar, PAN, sale deed — AI reads, validates, and cross-references them instantly.

**How it works:**
- Aadhaar: Format validation + face match + demographic check → 99.2% confidence in 1.8 seconds
- PAN: Format validation + name match with Aadhaar → 99.5% confidence in 0.9 seconds
- Sale Deed: Structure validation + stamp duty check + party name verification → 97.8% confidence in 2.1 seconds
- Encumbrance Certificate: Validity check + cross-reference with blockchain records → 98.1% confidence in 1.4 seconds
- Total: **6 documents verified in 4.2 seconds**

**Today's system:** A clerk manually checks these over 3-5 days. Human error rate: significant. Bribery potential: high.

### 3. AI Property Valuation 📊

**What it does:** Analyzes thousands of recent transactions in the same locality to give you a fair market value range.

**Example output:**
🤖 AI Valuation for: 3BHK, Bandra West, Mumbai
Based on 2,847 transactions in Bandra West (last 12 months):
├── AI Estimated Value: ₹2.85 Cr - ₹3.15 Cr
├── Circle Rate: ₹1.92 Cr
├── Average Market Rate: ₹2.97 Cr
├── Your Deal: ₹2.90 Cr
└── Verdict: ✅ Fair Price (within 2.4% of market average)

**Why this matters:** Prevents two massive problems:
- Citizens overpaying because they lack market knowledge
- Under-reporting of property value for stamp duty evasion (costs government thousands of crores annually)

### 4. AI Dispute Risk Predictor ⚖️

**What it does:** Analyzes a property's complete history and gives a dispute probability score.

**Example output:**
🤖 Risk Analysis for: Property MH-2024-00142
Ownership Chain: ✅ Clean (4 transfers since 1987, all registered)
Encumbrance Status: ✅ Clear (no active loans or liens)
Court Records: ✅ No pending litigation
Stamp Duty Compliance: ✅ All duties paid correctly
Boundary Disputes: ✅ Cadastral map verified
────────────────────────
Dispute Probability: 2.1% (LOW)
National Average: 15%
────────────────────────
Recommendation: ✅ Safe to proceed with purchase

**Today's cost:** This due diligence costs ₹20,000-50,000 in lawyer fees and takes 2-4 weeks. AI does it in 3 seconds.

### 5. Bhoomi AI Chatbot 💬

**What it does:** Answers property registration questions in plain Hindi + English.

**Sample conversation:**
You: What stamp duty will I pay for a ₹80L flat in Pune?
🤖 Bhoomi AI: For a ₹80 Lakh residential property in Pune, Maharashtra:
Stamp Duty (6% for male buyer): ₹4,80,000
Registration Fee (1%):           ₹80,000
Municipal Tax:                   ₹12,000
──────────────────────────────
Total:                           ₹5,72,000
💡 Tip: If registered under a woman's name, stamp duty
drops to 5% — saving ₹80,000. Punjab offers the best
deal for women at just 3%.

**Why this matters:** Most citizens don't know their exact stamp duty rate, don't know about gender concessions, and don't understand the full process. Today they pay a lawyer ₹10,000+ just to answer these questions.

### 6. AI Network Intelligence 📈

**Real-time insights across the entire network:**
- Fraud attempts blocked this month: 142 (₹340 Cr saved)
- Average document verification time: 4.2 seconds
- Properties flagged for review: 23 out of 8,450 (0.27%)
- Tax evasion prevented: ₹12.4 Cr (under-reporting detected)
- Registration volume prediction: +23% next quarter
- Most active state: Maharashtra (34% of all transactions)

*Note: In this prototype, all AI features are simulated to demonstrate the concept. A production system would use ML models (TensorFlow/PyTorch) trained on actual DILRMP, NGDRS, and state IGRS portal data.*

---

## 💰 Fee Transparency — Real Data, Real Rates

### Real Stamp Duty Rates Used (2025-26)

| State | Male | Female | Women's Savings on ₹1Cr | Registration |
|-------|------|--------|------------------------|-------------|
| Maharashtra | 6% | 5% | ₹1,00,000 saved | 1% |
| Delhi | 6% | 4% | ₹2,00,000 saved | 1% |
| Karnataka | 5% | 3% | ₹2,00,000 saved | 1% |
| Tamil Nadu | 7% | 7% | No concession | 1% |
| Uttar Pradesh | 7% | 6% | ₹1,00,000 saved | 1% |
| Gujarat | 4.9% | 4.9% | No concession | 1% |
| Rajasthan | 6% | 4% | ₹2,00,000 saved | 1% |
| Haryana | 6% | 4% | ₹2,00,000 saved | 1% |
| Punjab | 6% | 3% | **₹3,00,000 saved** 🏆 | 1% |
| Kerala | 8% | 8% | No concession | 1% |
| MP | 7.5% | 7.5% | No concession | 1% |
| West Bengal | 6% | 6% | No concession | 1% |
| Meghalaya | 10% | 8% | ₹2,00,000 saved | 1% |

**🏆 Punjab** offers the best deal for women — 3% vs 6%. That's 50% off. Most women don't know this.

**On a ₹1 Crore property in Delhi:** A woman saves ₹2,00,000 compared to a male buyer. That's enough to furnish an entire room. But this is buried in government notifications nobody reads.

**The corruption tax:** Citizens often pay 15-25% extra. On ₹50 lakh = ₹7.5-12.5 lakh going into someone's pocket. Blockchain makes this impossible.

---

## 🌍 Countries Already Doing This

| Country | What They Did | Result | Since |
|---------|--------------|--------|-------|
| 🇬🇪 Georgia | Land titles on Bitcoin blockchain (Bitfury) | **1% dispute rate** | 2016 |
| 🇸🇪 Sweden | Lantmäteriet blockchain pilot | Months → Hours, €100M+/year saved | 2018 |
| 🇫🇷 France | Digital land registry modernization | Faster, transparent process | 2019 |
| 🇦🇪 Dubai | All real estate on blockchain | Complete ecosystem | 2020 |
| 🇬🇧 UK | HM Land Registry "Digital Street" prototype | Instant property transfers | 2019 |

Georgia has 3.7 million people and did it. India has the **largest tech workforce on Earth.** We can absolutely do this.

---

## 🛠️ Features Built in This Prototype

1. **Live Registration Pipeline** — 7-stage Kanban board, 12+ properties, blockchain trail per card
2. **Fee Transparency Engine** — Real rates for all states, gender concessions, instant calculator
3. **Blockchain Explorer** — Visual chain, block details, live transaction feed
4. **Registration Tracker** — Track by ID, timeline with blockchain proofs, time comparison
5. **AI Fraud Detection** — Real-time scanning, benami alerts, network health score
6. **AI Document Verification** — PDF upload, SHA-256 hashing, confidence scores
7. **AI Property Valuation** — Locality-based fair value, over/under pricing detection
8. **AI Dispute Predictor** — Ownership chain analysis, risk scoring
9. **Bhoomi AI Chatbot** — Stamp duty queries, registration guidance, property safety
10. **MetaMask Wallet** — Web3 wallet connection with simulated fallback
11. **Impact Dashboard** — Real statistics, global comparisons, SVG charts
12. **Role-Based Views** — Citizen, Sub-Registrar, Bank, Revenue Department

---

## ⚙️ Technical Architecture
┌──────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                            │
│              React 19 · Next.js 16 · Tailwind CSS            │
│         Role-based views · Responsive · Dark theme           │
├──────────────────────────────────────────────────────────────┤
│                      AI LAYER                                │
│  🛡️ Fraud Detection    📄 Doc Verification   📊 Valuation   │
│  ⚖️ Dispute Predictor  💬 Bhoomi Chatbot     📈 Insights    │
├──────────────────────────────────────────────────────────────┤
│                   BLOCKCHAIN LAYER                           │
│  ⛓️ Hash-linked blocks · Transaction ledger                  │
│  📜 Smart contract logic · 🔐 Document hash storage          │
├──────────────────────────────────────────────────────────────┤
│                    WALLET LAYER                               │
│  🦊 MetaMask · Web Crypto API · SHA-256 hashing              │
├──────────────────────────────────────────────────────────────┤
│                   DEPLOYMENT                                  │
│  ▲ Vercel · GitHub · CI/CD auto-deploy on push               │
└──────────────────────────────────────────────────────────────┘

### Production Version Would Need
- **Blockchain:** Polygon/Hyperledger Fabric (not simulated)
- **Storage:** IPFS for decentralized document storage
- **Identity:** Aadhaar eKYC API + DigiLocker integration
- **Data:** State IGRS portal integration, NGDRS API
- **AI Models:** TensorFlow/PyTorch trained on DILRMP data
- **Scale:** Load balancing for 28 states, 140 crore people

---

## 📈 The Impact — What Changes If India Adopts This

### For Citizens
- Save 7-14 days per registration × 5.44 lakh registrations (2025) = **millions of working days saved**
- Save 15-25% hidden costs on India's ₹12 lakh crore+ real estate market = **lakhs of crores back in citizens' pockets**
- Women actually discover and use their stamp duty concessions
- No more lawyer dependency for basic registrations

### For Government
- Increased stamp duty collection (less under-reporting when AI monitors valuations)
- **60% of court cases are land-related** — even 30% reduction = **80 lakh fewer pending cases**
- Real-time property market data for better policy

### For Economy
- Clear land titles can **increase property values by 30-40%** (World Bank)
- Faster transactions = faster economic activity
- Improved Ease of Doing Business ranking
- Increased FDI and investor confidence

---

## 💡 What This Proves About AI in 2026

**Two years ago, this project would have required:**
- Team of 5-10 developers
- 3-6 months development
- ₹20-50 lakhs budget
- Specialized blockchain + AI expertise

**Today it took:**
- One person
- ~2 hours
- ₹0 (all free tools)
- Zero prior experience

**AI hasn't replaced developers. AI has enabled anyone with an idea to prove it works.**

The barrier to prototyping has collapsed. The argument is no longer "too expensive to build" or "don't have the talent." The argument is: **do we have the will?**

---

## 🧰 The Complete AI Toolkit

Every tool used in this project and tools that can extend it:

### Tools Used to Build

| Tool | Role | Free? |
|------|------|-------|
| **Cursor** | AI code editor — wrote 95% of code | ✅ Free tier |
| **Claude** (Anthropic) | Architecture, prompts, data research, README | ✅ Free tier |
| **ChatGPT** (OpenAI) | Cross-verified statistics, brainstorming | ✅ Free tier |
| **Perplexity AI** | Deep research with cited sources on global blockchain registries | ✅ Free |
| **GitHub Copilot** | Auto-complete inside Cursor | ✅ With Cursor |
| **Vercel** | One-click deploy from GitHub | ✅ Free tier |
| **Claude Artifacts** | Built initial prototype before moving to Cursor | ✅ Free |

### Tools to Extend & Share

| Tool | What It Can Do | Free? |
|------|---------------|-------|
| **v0.dev** (Vercel) | Generate alternative UI designs from text prompts | ✅ Free tier |
| **Gamma.app** | Turn this README into a presentation deck in 30 seconds | ✅ Free tier |
| **Napkin AI** | Convert statistics into shareable infographics | ✅ Free |
| **ElevenLabs** | Generate Hindi + English voiceover for demo video | ✅ Free tier |
| **HeyGen** | Create AI avatar presenting the project | ✅ Free trial |
| **Descript** | Screen recording → polished video with auto-captions | ✅ Free tier |
| **CapCut** | Edit demo video with trending templates for LinkedIn/Instagram | ✅ Free |
| **Bolt.new** | Rapid full-stack prototyping alternative to Cursor | ✅ Free tier |
| **Lovable.dev** | Another no-code AI app builder for rapid iteration | ✅ Free tier |
| **Midjourney / DALL-E** | Generate custom illustrations for the project | 💰 Paid |
| **Figma + AI plugins** | Design system and component library | ✅ Free tier |
| **Notion AI** | Project documentation and knowledge base | ✅ Free tier |
| **Tome AI** | AI-generated pitch deck from a single paragraph | ✅ Free tier |
| **Beautiful.ai** | Professional presentation from bullet points | ✅ Free trial |
| **Loom** | Quick video walkthrough with webcam overlay | ✅ Free tier |

### AI Tools for a Production Version

| Tool | Production Use |
|------|---------------|
| **TensorFlow / PyTorch** | Train fraud detection and valuation models on real DILRMP data |
| **Hugging Face** | NLP models for document understanding and chatbot |
| **LangChain** | Build production Bhoomi AI chatbot with RAG on property laws |
| **Pinecone / Weaviate** | Vector database for property similarity search |
| **OpenCV** | Document image processing and verification |
| **Tesseract OCR** | Extract text from scanned property documents |
| **AWS Textract / Google Document AI** | Enterprise-grade document parsing |
| **Hardhat / Foundry** | Real Solidity smart contract development |
| **The Graph** | Index and query blockchain data efficiently |
| **IPFS / Filecoin** | Decentralized storage for property documents |

**Total AI tools referenced: 30+**
**Total cost for this prototype: ₹0**

---

## 🚀 Run It Yourself
```bash
git clone https://github.com/HARSHITB2003/blockchain-land-registry.git
cd blockchain-land-registry
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📚 Data Sources — Every Number Is Verified

| Data Point | Source | Accessed |
|-----------|--------|----------|
| 60%+ litigation is land-related | PRS India — "Land Records and Titles in India" | Feb 2026 |
| 20-year average dispute resolution | World Bank / Landeed Research | Feb 2026 |
| 1,420 days to resolve disputes | World Bank Ease of Doing Business 2016 | Feb 2026 |
| 95% rural records digitized | PIB India / DILRMP | Feb 2026 |
| 68% cadastral maps digitized | Department of Land Resources, GoI | Feb 2026 |
| 6.26 lakh villages covered | PIB India | Feb 2026 |
| Registration Bill 2025 drafted | Dept of Land Resources, Min of Rural Dev | Feb 2026 |
| ULPIN in 29 States/UTs | PIB India / DILRMP | Feb 2026 |
| 65 lakh SVAMITVA cards | PIB India | Feb 2026 |
| 5.44 lakh registrations (2025) | Sattva Group / Industry Reports | Feb 2026 |
| ₹40,000+ Cr stamp duty (MH FY24) | Maharashtra State Revenue Reports | Feb 2026 |
| All stamp duty rates | BajajFinserv, 99acres, RealtyApplications, State IGRS | Feb 2026 |
| Registration = 1% nationwide | Indian Registration Act / State notifications | Feb 2026 |
| Georgia blockchain registry | Bitfury / National Agency of Public Registry | Feb 2026 |
| 7-15 days registration time | LegalKart, Delhi Revenue Dept, Vakilsearch | Feb 2026 |
| Registration Bill 2025 full text | cdnbbsr.s3waas.gov.in (Government of India) | Feb 2026 |

---

## 👤 Built By

**Harshit Baldota**
- GitHub: [@HARSHITB2003](https://github.com/HARSHITB2003)
- BEng Computer Science
- Interests: Data Analytics, Financial Analysis, Blockchain, AI

*Built in February 2026 as a proof-of-concept to demonstrate the potential of AI + Blockchain in solving India's property registration crisis.*

---

## ⚖️ Disclaimer

This is a **prototype and proof of concept.** It is **not affiliated with the Government of India** or any state government. All AI features are simulated — a production system would require real ML models trained on actual transaction data. Statistics and stamp duty rates are sourced from government publications and reputable platforms (accessed February 2026). Rates may have changed since.

*Inspired by the Rajya Sabha discussion on digitizing India's property records and the vision for a National Blockchain Registry.*

---

## 🌟 Support This Project

If you believe India deserves a better property registration system:

- ⭐ **Star** this repository
- 🔄 **Share** on LinkedIn, Twitter, wherever
- 🍴 **Fork** and build on top of it
- 💬 **Open an issue** with ideas or improvements

**If you're from the government, a PropTech company, or a blockchain startup and want to build this for real — let's talk.**

---

*"The best way to predict the future is to build it." — This is what India's property registration could look like. The technology exists. The data is available. The only question is: when do we start?*
