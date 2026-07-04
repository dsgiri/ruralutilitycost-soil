import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { Link } from "react-router-dom";

// Standard approximate removal rates (lbs per unit of yield)
const CROP_REMOVAL_DATA = [
  { crop: "Corn", unit: "bu", n: 0.67, p2o5: 0.35, k2o: 0.25 },
  { crop: "Soybeans", unit: "bu", n: 3.3, p2o5: 0.73, k2o: 1.2 },
  { crop: "Wheat", unit: "bu", n: 1.2, p2o5: 0.5, k2o: 0.3 },
  { crop: "Alfalfa", unit: "ton", n: 56.0, p2o5: 13.0, k2o: 50.0 }, // N usually fixed by alfalfa
];

export const NutrientRemoval: React.FC = () => {
  const [selectedCropIndex, setSelectedCropIndex] = useState<number>(0);
  const [yieldValue, setYieldValue] = useState<string>("150");

  const crop = CROP_REMOVAL_DATA[selectedCropIndex];
  const yieldNum = parseFloat(yieldValue) || 0;

  const removal = {
    n: (crop.n * yieldNum).toFixed(1),
    p2o5: (crop.p2o5 * yieldNum).toFixed(1),
    k2o: (crop.k2o * yieldNum).toFixed(1),
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      <Seo title="Nutrient Removal Calculator" description="Estimate how much N, P, and K are removed from the field by harvested crops." url="/removal" />
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Crop Nutrient Removal Calculator</h1>
        <p className="mt-2 text-slate-500">Estimate how much Nitrogen (N), Phosphorus (P₂O₅), and Potassium (K₂O) are removed from the field by harvested crops to plan maintenance fertilizer applications.</p>
      </header>

      <div className="bg-white border border-slate-200 shadow-sm ring-1 ring-slate-900/5 grid md:grid-cols-12">
        <div className="p-6 md:col-span-4 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="cropSelect" className="block text-[10px] font-bold uppercase tracking-widest text-[#34657F] mb-1">Crop Type</label>
              <select
                id="cropSelect"
                value={selectedCropIndex}
                onChange={(e) => setSelectedCropIndex(Number(e.target.value))}
                className="mt-1 block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm min-h-[44px]"
              >
                {CROP_REMOVAL_DATA.map((c, i) => (
                  <option key={c.crop} value={i}>{c.crop}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="yieldValue" className="block text-[10px] font-bold uppercase tracking-widest text-[#34657F] mb-1">Yield Goal ({crop.unit}/Acre)</label>
              <input
                id="yieldValue"
                type="number"
                value={yieldValue}
                onChange={(e) => setYieldValue(e.target.value)}
                className="mt-1 block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
                placeholder="e.g. 150"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-8 grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-t md:border-t-0 md:border-l border-slate-200" aria-live="polite">
          <div className="bg-slate-50 p-6 flex flex-col items-center justify-center text-center group hover:bg-white transition-colors">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nitrogen (N)</h4>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">{removal.n}</span>
            </div>
            <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">lbs / acre</div>
            {crop.crop === "Alfalfa" || crop.crop === "Soybeans" ? (
              <div className="text-[10px] text-slate-400 mt-2">Legumes fix most N.</div>
            ) : null}
          </div>
          <div className="bg-slate-50 p-6 flex flex-col items-center justify-center text-center group hover:bg-white transition-colors">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phosphorus (P₂O₅)</h4>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">{removal.p2o5}</span>
            </div>
            <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">lbs / acre</div>
          </div>
          <div className="bg-slate-50 p-6 flex flex-col items-center justify-center text-center group hover:bg-white transition-colors">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Potassium (K₂O)</h4>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">{removal.k2o}</span>
            </div>
            <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">lbs / acre</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Logic & Formulas</h2>
          <div className="prose prose-sm text-slate-600">
            <p>Calculates the physical amount of nutrients leaving the field in harvested grain or forage.</p>
            <ul>
              <li><strong>Formula:</strong> Estimated Yield × Per-Unit Nutrient Removal Factor</li>
              <li>Removal rates vary based on crop genetics, environmental conditions, and soil fertility levels.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
             <div>
              <h4 className="text-sm font-bold text-slate-800">Why does this matter?</h4>
              <p className="text-sm text-slate-600 mt-1">To maintain soil test levels over time, nutrients removed by the harvest must be replaced by fertilizers or manure. This is called a "maintenance" or "replacement" strategy.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Why are soybeans and alfalfa different for Nitrogen?</h4>
              <p className="text-sm text-slate-600 mt-1">They are legumes. Although they remove large amounts of Nitrogen, they fix most of it from the atmosphere via symbiotic bacteria, meaning you don't typically need to apply N fertilizer to replace it.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-slate-50 p-6 border border-slate-200 mt-8">
          <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">Related Tools</h2>
          <div className="flex flex-wrap gap-4">
             <Link to="/recommend" className="text-sm text-[#34657F] font-medium hover:underline">NPK Fertilizer Calculator</Link>
             <Link to="/test" className="text-sm text-[#34657F] font-medium hover:underline">Soil Test Interpreter</Link>
          </div>
      </section>

      <footer className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
        <p><strong>Disclaimer:</strong> This calculator provides estimates based on standard university removal rates. Actual removal may vary based on local conditions.</p>
      </footer>
    </div>
  );
};
