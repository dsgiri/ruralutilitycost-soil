import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { Link } from "react-router-dom";

export const LimePlanner: React.FC = () => {
  const [currentpH, setCurrentpH] = useState<string>("");
  const [targetpH, setTargetpH] = useState<string>("6.5");
  const [bufferpH, setBufferpH] = useState<string>("");
  const [ecc, setEcc] = useState<string>("100"); // Effective Calcium Carbonate

  const calculateLimeRecommendation = () => {
    const cpH = parseFloat(currentpH);
    const tpH = parseFloat(targetpH);
    const bpH = parseFloat(bufferpH);
    const e = parseFloat(ecc);

    if (isNaN(cpH) || isNaN(tpH) || isNaN(bpH) || isNaN(e) || e <= 0 || cpH >= tpH) return null;

    // A simplified generic buffer pH formula (varies heavily by state/lab SMP vs Sikora)
    // Here we use a generic estimate placeholder: approx 1.2 tons/acre per 0.1 drop in buffer pH below 7.0
    // (This is highly stylized, user should verify with local lab equations)
    // Formula: (7.0 - Buffer pH) * 1.2 = Tons of 100% ECCE Lime
    
    let tonsPure = (7.0 - bpH) * 1.2;
    if (tonsPure < 0) tonsPure = 0;
    
    // Adjust for target pH (if target is less than 7, usually less lime needed)
    // Very simplified adjustment
    if (tpH < 6.8) {
      tonsPure = tonsPure * 0.8;
    }

    // Adjust for ECC
    const tonsActual = tonsPure / (e / 100);

    return tonsActual.toFixed(1);
  };

  const recommendedLime = calculateLimeRecommendation();

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      <Seo title="Lime Requirement Planner" description="Estimate lime needs based on soil pH, buffer pH, and neutralizing value." url="/lime" />
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Lime Requirement Estimator</h1>
        <p className="mt-2 text-slate-500">Estimate lime needs based on soil pH, buffer pH, and neutralizing value to correct soil acidity.</p>
      </header>

      <div className="bg-white border border-slate-200 shadow-sm ring-1 ring-slate-900/5 grid md:grid-cols-12">
        <div className="p-6 md:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="currentpH" className="block text-[10px] font-bold uppercase tracking-widest text-[#8B7355] mb-1">Current Soil pH</label>
              <input
                id="currentpH"
                type="number"
                step="0.1"
                value={currentpH}
                onChange={(e) => setCurrentpH(e.target.value)}
                className="block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
                placeholder="e.g. 5.5"
              />
            </div>
            <div>
              <label htmlFor="targetpH" className="block text-[10px] font-bold uppercase tracking-widest text-[#8B7355] mb-1">Target Soil pH</label>
              <input
                id="targetpH"
                type="number"
                step="0.1"
                value={targetpH}
                onChange={(e) => setTargetpH(e.target.value)}
                className="block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
                placeholder="e.g. 6.5"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="bufferpH" className="block text-[10px] font-bold uppercase tracking-widest text-[#8B7355] mb-1">Buffer pH (SMP)</label>
              <input
                id="bufferpH"
                type="number"
                step="0.1"
                value={bufferpH}
                onChange={(e) => setBufferpH(e.target.value)}
                className="block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
                placeholder="e.g. 6.6"
              />
            </div>
            <div>
              <label htmlFor="ecc" className="block text-[10px] font-bold uppercase tracking-widest text-[#8B7355] mb-1">Effectiveness (ECCE %)</label>
              <input
                id="ecc"
                type="number"
                value={ecc}
                onChange={(e) => setEcc(e.target.value)}
                className="block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
                placeholder="e.g. 100"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-6 flex flex-col items-center justify-center border-b-4 border-slate-300 md:col-span-5" aria-live="polite">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">Estimated Ag Lime Rate</h3>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold text-slate-900 font-mono tracking-tight">
              {recommendedLime !== null ? recommendedLime : "--"}
            </span>
            <span className="text-[10px] font-bold uppercase text-slate-400">tons / acre</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Logic & Formulas</h2>
          <div className="prose prose-sm text-slate-600">
            <p>This is a simplified generic buffer pH formula (varies heavily by state/lab SMP vs Sikora).</p>
            <ul>
              <li><strong>Base Estimate:</strong> ~1.2 tons/acre of 100% pure lime per 0.1 drop in buffer pH below 7.0</li>
              <li><strong>ECCE Adjustment:</strong> Base Estimate ÷ (ECCE % ÷ 100)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
             <div>
              <h4 className="text-sm font-bold text-slate-800">What is Buffer pH?</h4>
              <p className="text-sm text-slate-600 mt-1">While regular soil pH measures active acidity, Buffer pH measures reserve acidity. It indicates how much lime is actually required to raise the soil pH.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">What is ECCE?</h4>
              <p className="text-sm text-slate-600 mt-1">Effective Calcium Carbonate Equivalent. It represents the purity and fineness of the lime material. Lower ECCE requires more tons per acre to achieve the same result.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-slate-50 p-6 border border-slate-200 mt-8">
          <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">Related Tools</h2>
          <div className="flex flex-wrap gap-4">
             <Link to="/test" className="text-sm text-slate-600 font-medium hover:underline">Soil Test Interpreter</Link>
          </div>
      </section>

      <footer className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
        <p><strong>Disclaimer:</strong> This calculator provides generic estimates for planning purposes only. Lime requirement equations vary significantly by state and testing lab. Always refer to your official soil test report for accurate rates.</p>
      </footer>
    </div>
  );
};
