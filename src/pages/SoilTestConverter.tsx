import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { Link } from "react-router-dom";

export const SoilTestConverter: React.FC = () => {
  const [ppmValue, setPpmValue] = useState<string>("");
  const [depthInches, setDepthInches] = useState<string>("6");
  const [status, setStatus] = useState<"Filing Complete" | "Pending Human Verification">("Pending Human Verification");

  // Basic conversion: lbs/acre = ppm * 2 (for 6-inch depth)
  // Formula: lbs/acre = ppm * (depth / 3) approximately, assuming bulk density ~1.47 g/cm3
  const calculateLbsPerAcre = () => {
    const ppm = parseFloat(ppmValue);
    const depth = parseFloat(depthInches);
    if (isNaN(ppm) || isNaN(depth)) return null;
    return (ppm * depth * 0.3333).toFixed(1);
  };

  const lbsResult = calculateLbsPerAcre();

  // Highlight threshold violation if Nitrates were high, etc., for the "Red Flag" requirement
  // Let's assume a generic threshold for demonstration purposes: > 50 ppm requires verification.
  const isHighAlert = parseFloat(ppmValue) > 50;

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      <Seo title="Soil Test Converter Calculator" description="Convert lab report parts per million (ppm) to pounds per acre." url="/test" />
      <header className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Soil Test Interpreter</h1>
          <p className="mt-2 text-slate-500">Convert lab report parts per million (ppm) to actual pounds per acre based on sampling depth.</p>
        </div>
        <div className="flex shrink-0 border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5 items-center">
           <div className="bg-slate-100 px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 h-full flex flex-col justify-center min-h-[44px]">
             Verification
           </div>
           <button 
             onClick={() => setStatus(s => s === "Pending Human Verification" ? "Filing Complete" : "Pending Human Verification")}
             className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors h-full min-h-[44px] ${
               status === "Filing Complete" ? "bg-[#4C7C44] text-white" : "bg-[#F4F5F2] text-slate-500 hover:bg-slate-100"
             }`}
           >
             {status}
           </button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
        {isHighAlert && (
          <div className="border-l-4 border-red-600 bg-red-50 p-4" aria-live="assertive">
             <div className="flex">
               <div className="flex-shrink-0">
                 <span className="text-red-600 font-bold">!</span>
               </div>
               <div className="ml-3">
                 <h3 className="text-xs font-bold text-red-800 uppercase tracking-widest">Threshold Violation Alert</h3>
                 <div className="mt-1 text-xs text-red-700">
                   <p>Excessive concentration detected. Ensure verification chain is properly documented.</p>
                 </div>
               </div>
             </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-12">
          <div className="p-6 md:col-span-6 space-y-4">
            <div>
              <label htmlFor="ppm" className="block text-[10px] font-bold uppercase tracking-widest text-[#4C7C44] mb-1">
                Lab Result Conc. (ppm)
              </label>
              <input
                type="number"
                id="ppm"
                min="0"
                step="0.1"
                value={ppmValue}
                onChange={(e) => setPpmValue(e.target.value)}
                className="block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
                placeholder="e.g. 25.0"
              />
            </div>
            <div>
              <label htmlFor="depth" className="block text-[10px] font-bold uppercase tracking-widest text-[#4C7C44] mb-1">
                Sampling Depth (inches)
              </label>
              <input
                type="number"
                id="depth"
                min="0"
                step="1"
                value={depthInches}
                onChange={(e) => setDepthInches(e.target.value)}
                className="block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
                placeholder="e.g. 6"
              />
            </div>
          </div>

          <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-6 flex flex-col justify-center border-b-4 border-[#4C7C44] md:col-span-6" aria-live="polite">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Calculated Equivalent Rate</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-slate-900 font-mono tracking-tight">
                {lbsResult !== null ? lbsResult : "--"}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">lbs / acre</span>
            </div>
            <p className="mt-4 text-[10px] text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
              Standard 6-inch furrow slice assumes ~2 million lbs of soil mass per acre.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Logic & Formulas</h2>
          <div className="prose prose-sm text-slate-600">
            <p>Soil test results are typically reported in parts per million (ppm). To use these values in fertilizer calculations, they must be converted to pounds per acre.</p>
            <ul>
              <li><strong>Standard Assumption:</strong> 1 acre of soil, 6 inches deep, weighs approximately 2,000,000 lbs.</li>
              <li><strong>Formula:</strong> 1 ppm × 2 = 2 lbs/acre (for a 6-inch depth).</li>
              <li><strong>Adjusted Formula:</strong> lbs/acre = ppm × (Depth in inches ÷ 3)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
             <div>
              <h4 className="text-sm font-bold text-slate-800">Why does depth matter?</h4>
              <p className="text-sm text-slate-600 mt-1">If you sample to 8 inches instead of 6 inches, there is more soil mass per acre. The calculation adjusts the multiplier to account for the additional weight.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">What if my lab reports mg/kg?</h4>
              <p className="text-sm text-slate-600 mt-1">Milligrams per kilogram (mg/kg) is exactly equivalent to parts per million (ppm). You can enter the value directly.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-slate-50 p-6 border border-slate-200 mt-8">
          <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">Related Tools</h2>
          <div className="flex flex-wrap gap-4">
             <Link to="/recommend" className="text-sm text-[#4C7C44] font-medium hover:underline">NPK Fertilizer Calculator</Link>
             <Link to="/lime" className="text-sm text-[#4C7C44] font-medium hover:underline">Lime Requirement Estimator</Link>
          </div>
      </section>

      <footer className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
        <p><strong>Disclaimer:</strong> This calculator provides mathematical estimates assuming a standard soil bulk density. Extreme soil types (like peat/muck or highly compacted soils) may vary.</p>
      </footer>
    </div>
  );
};
