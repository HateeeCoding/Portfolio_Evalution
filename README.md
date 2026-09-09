# SuperInvesting Portfolio Evaluation & Health Scorecard

A production-ready, high-converting Portfolio Assessment and Evaluation platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**, designed for zero-config deployment on **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HateeeCoding/Portfolio_Evalution)

---

## The Problem with Current Portfolio Evaluation
Traditional portfolio views and generic AI chat tools often present:
- A single vague score (e.g. `60/100 GOOD`) with obscure raw ratios (`PE: 59.98`, `Beta: 0.34`) that users don't easily understand.
- **Hidden, catastrophic risks**: A portfolio showing `+152%` gains can have `97%` of all profits concentrated in a single speculative micro-cap stock (e.g. Midwest Gold at `59.7%` weight), while half of the remaining blue-chip holdings are sitting in deep losses (`-20%` to `-51%`).
- Dense walls of text in chat responses that users don't read and cannot act upon.

---

## The Solution: Multi-Pillar 100-Point Assessment Cards
This application replaces the wall of text with **6 intuitive, parameter-level cards**, each scored transparently out of **100**:

| Assessment Pillar | Score | Status | Key Insight Explained to User |
| :--- | :---: | :---: | :--- |
| **1. Diversification & Concentration** | `26 / 100` | 🔴 **Critical Risk** | Top stock occupies **59.7%** of portfolio. Safe threshold is `< 15%`. |
| **2. Downside & Volatility Risk** | `38 / 100` | 🟠 **High Volatility** | A 30% drop in your top stock wipes out **-17.9% (~₹6.75L)** of your entire net worth. |
| **3. Portfolio Win-Rate & Breadth** | `44 / 100` | 🔴 **Hidden Drag** | **8 of 16 stocks (50%) are negative**. Persistent drag from chronic losers. |
| **4. Valuation & Quality** | `52 / 100` | 🟡 **Stretched P/E** | Blended P/E of **59.98x** vs NIFTY benchmark **~22.4x**. High vulnerability to growth misses. |
| **5. Sector Balance & Macro Resilience** | `46 / 100` | 🟡 **High Skew** | **61%** concentrated in Metals/Mining; severely underweight structural IT & Banking anchors. |
| **6. Benchmark Alpha Attribution** | `78 / 100` | 🟢 **Exceptional Gain** | **+152%** total return vs NIFTY (+18%). High raw return, but dependent on 1 lottery stock. |

---

## Core Features

### 1. Master Portfolio Health Index & Critical Alerts
- Composite health score with visual status badges (`Fragile & Unbalanced`, `Needs Attention`, `Robust`).
- Instant alert banner detailing single-stock profit concentration.

### 2. Prescriptive Actionable Suggestions Engine
- 🛡️ **Profit Lock-in Alert**: Concrete recommendation to trim Midwest Gold from 60% to 18% to bank ₹15 Lakhs in profits and protect downside.
- ✂️ **Tax-Loss Harvesting**: Identifies chronic underperformers (e.g. HDFC Bank, Tata Motors CV, ITC) to harvest capital loss deductions against profitable trims.
- ⚖️ **Sector Rotation**: Shift capital from cyclical metals into defensive IT, Banking, and FMCG.
- 🚀 **AI Basket Deployment**: Reinvest freed funds through curated thematic baskets.

### 3. Interactive "What-If" Rebalance Simulator
- Sliders allowing users to simulate trimming their top holding and reallocating into NIFTY ETF or AI Baskets.
- Dynamic calculation showing the **Health Score jump from 54 → 84/100** in real time, with capital protected from market drawdowns.

### 4. Interactive Holdings Matrix & Sector Comparison
- Full 16-stock breakdown with Rupee P/L attribution, % Return, individual AI scores, and action tags (`TRIM`, `HOLD`, `ACCUMULATE`, `REVIEW / HARVEST`).
- Visual bar comparison of user's sector weights vs NIFTY 50 benchmark weights.

### 5. Custom Portfolio Uploader & PDF Export
- Evaluate any custom portfolio via JSON input or predefined benchmarks.
- Clean printable layout for one-click PDF export and client reports.

---

## Local Development & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HateeeCoding/Portfolio_Evalution.git
   cd Portfolio_Evalution
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Deploy to Vercel

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete portfolio evaluation dashboard with 100-point parameter cards and rebalancer"
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the `Portfolio_Evalution` repository.
4. Click **Deploy**. Vercel will automatically detect Next.js and build your app in under a minute!
