import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { Link } from "react-router-dom";

export const CostPerNutrient: React.FC = () => {
  const [pricePerTon, setPricePerTon] = useState<string>("");
  const [nutrientPercentage, setNutrientPercentage] = useState<string>("");

  const calculateCost = () => {
    const price = parseFloat(pricePerTon);
    const percentage = parseFloat(nutrientPercentage);

    if (isNaN(price) || isNaN(percentage) || percentage <= 0) return null;

    // A ton is 2000 lbs.
    const lbsOfNutrientPerTon = 2000 * (percentage / 100);
    const costPerLb = price / lbsOfNutrientPerTon;

    return costPerLb.toFixed(3);
  };

  const cost = calculateCost();

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      <Seo title="Cost Per Nutrient Calculator" description="Calculate the actual cost of a specific nutrient (N, P, or K) based on the bulk fertilizer price." url="/cost" />
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cost Per Pound of Nutrient</h1>
        <p className="mt-2 text-slate-500">Calculate the actual cost of a specific nutrient (N, P, or K) based on the bulk fertilizer price to make economically sound purchasing decisions.</p>
      </header>

      <div className="bg-white border border-slate-200 shadow-sm ring-1 ring-slate-900/5 grid md:grid-cols-12">
        <div className="p-6 md:col-span-7 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="pricePerTon" className="block text-[10px] font-bold uppercase tracking-widest text-[#8B7355] mb-1">Fertilizer Price ($ / Ton)</label>
              <div className="relative border border-slate-300 bg-white shadow-sm focus-within:ring-1 focus-within:ring-slate-800 focus-within:border-slate-800 overflow-hidden flex">
                 <div className="pointer-events-none flex items-center pl-3 pr-2 bg-slate-50 border-r border-slate-300">
                  <span className="text-slate-500 sm:text-sm">$</span>
                </div>
                <input
                  id="pricePerTon"
                  type="number"
                  value={pricePerTon}
                  onChange={(e) => setPricePerTon(e.target.value)}
                  className="block w-full border-none py-2 px-3 focus:outline-none sm:text-sm font-mono min-h-[44px]"
                  placeholder="e.g. 500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="nutrientPercentage" className="block text-[10px] font-bold uppercase tracking-widest text-[#8B7355] mb-1">Nutrient Content (%)</label>
              <div className="relative border border-slate-300 bg-white shadow-sm focus-within:ring-1 focus-within:ring-slate-800 focus-within:border-slate-800 flex overflow-hidden">
                <input
                  id="nutrientPercentage"
                  type="number"
                  value={nutrientPercentage}
                  onChange={(e) => setNutrientPercentage(e.target.value)}
                  className="block w-full border-none py-2 px-3 focus:outline-none sm:text-sm font-mono min-h-[44px]"
                  placeholder="e.g. 46"
                />
                <div className="pointer-events-none flex items-center pr-3 pl-2 bg-slate-50 border-l border-slate-300">
                  <span className="text-slate-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-6 flex flex-col items-center justify-center text-center border-b-4 border-[#8B7355] md:col-span-5" aria-live="polite">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Actual Cost Per Pound of Nutrient</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-slate-900 font-mono tracking-tight">
              {cost !== null ? `$${cost}` : "$0.000"}
            </span>
            <span className="text-[10px] font-bold uppercase text-slate-400">/ lb</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Logic & Formulas</h2>
          <div className="prose prose-sm text-slate-600">
            <p>This calculator determines the cost of the actual nutrient rather than the bulk product.</p>
            <ul>
              <li><strong>Pounds per Ton:</strong> 2,000 lbs × (Nutrient % ÷ 100)</li>
              <li><strong>Cost per Pound:</strong> Bulk Price per Ton ÷ Pounds of Nutrient per Ton</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
             <div>
              <h4 className="text-sm font-bold text-slate-800">Why calculate cost per pound?</h4>
              <p className="text-sm text-slate-600 mt-1">Different fertilizers have different concentrations. Comparing the cost per actual pound of nutrient provides an accurate "apples-to-apples" economic comparison.</p>
            </div>
          </div>
        </section>
      </div>
      
      <section className="bg-slate-50 p-6 border border-slate-200 mt-8">
          <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">Related Tools</h2>
          <div className="flex flex-wrap gap-4">
             <Link to="/compare" className="text-sm text-[#4C7C44] font-medium hover:underline">Compare Products</Link>
             <Link to="/recommend" className="text-sm text-[#4C7C44] font-medium hover:underline">NPK Fertilizer Calculator</Link>
          </div>
      </section>

      <footer className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
        <p><strong>Disclaimer:</strong> This calculator provides estimates for agricultural planning purposes only. Verify prices and product labels with your local supplier.</p>
      </footer>
    </div>
  );
};
