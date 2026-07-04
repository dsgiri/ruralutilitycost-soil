import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { Link } from "react-router-dom";

export const FertilizerCalculator: React.FC = () => {
  const [nutrientNeeded, setNutrientNeeded] = useState<string>("");
  const [fertilizerGrade, setFertilizerGrade] = useState<string>("");
  const [area, setArea] = useState<string>("1");

  const calculateProductNeeded = () => {
    const target = parseFloat(nutrientNeeded);
    const grade = parseFloat(fertilizerGrade);
    const acres = parseFloat(area);

    if (isNaN(target) || isNaN(grade) || isNaN(acres) || grade <= 0) return null;

    const ratePerAcre = target / (grade / 100);
    const totalProduct = ratePerAcre * acres;

    return {
      ratePerAcre: ratePerAcre.toFixed(1),
      totalProduct: totalProduct.toFixed(1),
    };
  };

  const results = calculateProductNeeded();

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      <Seo title="Fertilizer Calculator" description="Calculate actual fertilizer product required to meet a nutrient recommendation." url="/recommend" />
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">NPK Fertilizer Calculator</h1>
        <p className="mt-2 text-slate-500">Calculate the actual fertilizer product required to meet a nutrient recommendation for a specific area.</p>
      </header>

      <div className="bg-white border border-slate-200 shadow-sm ring-1 ring-slate-900/5 grid md:grid-cols-12">
        <div className="p-6 md:col-span-7 space-y-4">
          <div>
            <label htmlFor="nutrientNeeded" className="block text-[10px] font-bold uppercase tracking-widest text-[#34657F] mb-1">Nutrient Need (lbs/acre)</label>
            <input
              id="nutrientNeeded"
              type="number"
              value={nutrientNeeded}
              onChange={(e) => setNutrientNeeded(e.target.value)}
              className="mt-1 block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
              placeholder="e.g. 50"
            />
          </div>
          <div>
            <label htmlFor="fertilizerGrade" className="block text-[10px] font-bold uppercase tracking-widest text-[#34657F] mb-1">Fertilizer Grade (%)</label>
            <input
              id="fertilizerGrade"
              type="number"
              value={fertilizerGrade}
              onChange={(e) => setFertilizerGrade(e.target.value)}
              className="mt-1 block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
              placeholder="e.g. 46 (for Urea)"
            />
          </div>
          <div>
            <label htmlFor="area" className="block text-[10px] font-bold uppercase tracking-widest text-[#34657F] mb-1">Area (Acres)</label>
            <input
              id="area"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-1 block w-full rounded-none border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
              placeholder="e.g. 1"
            />
          </div>
        </div>

        <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 md:col-span-5 flex flex-col justify-center p-6" aria-live="polite">
          {results ? (
            <div className="space-y-8">
              <div className="border-b-4 border-[#34657F] pb-4">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Application Rate</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900 font-mono tracking-tight">{results.ratePerAcre}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">lbs / acre</span>
                </div>
              </div>
              <div className="border-b-4 border-slate-300 pb-4">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Product Needed</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900 font-mono tracking-tight">{results.totalProduct}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">lbs</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 text-sm">
              Enter target nutrient need and fertilizer grade to see results.
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Logic & Formulas</h2>
          <div className="prose prose-sm text-slate-600">
            <p>Fertilizers are sold by their bulk weight, but recommendations are given in terms of actual nutrients. This calculator bridges that gap.</p>
            <ul>
              <li><strong>Application Rate:</strong> Target Nutrient Need (lbs) ÷ (Fertilizer Grade % ÷ 100)</li>
              <li><strong>Total Product:</strong> Application Rate × Total Acres</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
             <div>
              <h4 className="text-sm font-bold text-slate-800">What is fertilizer grade?</h4>
              <p className="text-sm text-slate-600 mt-1">The three numbers on a fertilizer bag (e.g., 46-0-0) represent the percentage of Nitrogen (N), Phosphate (P₂O₅), and Potash (K₂O) by weight.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-slate-50 p-6 border border-slate-200 mt-8">
          <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">Related Tools</h2>
          <div className="flex flex-wrap gap-4">
             <Link to="/cost" className="text-sm text-[#34657F] font-medium hover:underline">Cost Per Nutrient</Link>
             <Link to="/compare" className="text-sm text-[#34657F] font-medium hover:underline">Compare Products</Link>
          </div>
      </section>

      <footer className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
        <p><strong>Disclaimer:</strong> This calculator provides estimates for agricultural planning purposes only. Verify equipment calibration and product labels before application.</p>
      </footer>
    </div>
  );
};
