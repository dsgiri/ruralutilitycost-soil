import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Seo } from "../components/Seo";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  pricePerTon: string;
  nutrientPercent: string;
}

export const ProductComparison: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Urea", pricePerTon: "450", nutrientPercent: "46" },
    { id: "2", name: "UAN 32%", pricePerTon: "350", nutrientPercent: "32" },
  ]);

  const addProduct = () => {
    setProducts([...products, { id: Date.now().toString(), name: "", pricePerTon: "", nutrientPercent: "" }]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in duration-500">
      <Seo title="Product Comparison Calculator" description="Compare the actual cost per pound of nutrient across different bulk fertilizer sources." url="/compare" />
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fertilizer Product Compare</h1>
        <p className="mt-2 text-slate-500">Compare the actual cost per pound of nutrient across multiple bulk fertilizer sources simultaneously to identify the most economical option.</p>
      </header>

      <div className="border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Product Name</th>
                <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Price ($ / Ton)</th>
                <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Nutrient (%)</th>
                <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#8B7355]">Cost/Lb</th>
                <th scope="col" className="px-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white" aria-live="polite">
              {products.map((p) => {
                const price = parseFloat(p.pricePerTon);
                const percent = parseFloat(p.nutrientPercent);
                let costPerLb = "--";
                if (!isNaN(price) && !isNaN(percent) && percent > 0) {
                   costPerLb = "$" + (price / (2000 * (percent / 100))).toFixed(3);
                }

                return (
                  <tr key={p.id}>
                    <td className="px-4 py-3 min-w-[150px]">
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => updateProduct(p.id, "name", e.target.value)}
                        className="block w-full rounded-none border border-slate-300 bg-white px-2 py-1.5 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm min-h-[44px]"
                        placeholder="e.g. Urea"
                        aria-label={`Product name for row ${p.id}`}
                      />
                    </td>
                    <td className="px-4 py-3 min-w-[120px]">
                      <input
                        type="number"
                        value={p.pricePerTon}
                        onChange={(e) => updateProduct(p.id, "pricePerTon", e.target.value)}
                        className="block w-full rounded-none border border-slate-300 bg-white px-2 py-1.5 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
                        placeholder="0"
                        aria-label={`Price per ton for ${p.name || 'product'}`}
                      />
                    </td>
                    <td className="px-4 py-3 min-w-[120px]">
                      <input
                        type="number"
                        value={p.nutrientPercent}
                        onChange={(e) => updateProduct(p.id, "nutrientPercent", e.target.value)}
                        className="block w-full rounded-none border border-slate-300 bg-white px-2 py-1.5 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 sm:text-sm font-mono min-h-[44px]"
                        placeholder="0"
                        aria-label={`Nutrient percentage for ${p.name || 'product'}`}
                      />
                    </td>
                    <td className="px-4 py-3 text-lg font-bold text-slate-900 font-mono min-w-[100px]">
                      {costPerLb}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => removeProduct(p.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                        aria-label={`Remove ${p.name || 'product'}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-[#F4F5F2] border-t border-slate-200 px-4 py-3">
          <button
            onClick={addProduct}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase transition-colors hover:bg-slate-700 min-h-[44px]"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Logic & Formulas</h2>
          <div className="prose prose-sm text-slate-600">
            <p>Compares multiple fertilizers based on the cost of their actual nutrient content.</p>
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
              <h4 className="text-sm font-bold text-slate-800">Is price the only factor to consider?</h4>
              <p className="text-sm text-slate-600 mt-1">No. Agronomic fit, product availability, salt index, equipment capabilities, and formulation (granular vs. liquid) also factor heavily into product selection.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Can I compare mixed fertilizers (e.g. 18-46-0)?</h4>
              <p className="text-sm text-slate-600 mt-1">This basic tool evaluates cost per unit of a single primary nutrient. For mixed blends, more complex valuation is required to allocate cost across multiple nutrients.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-slate-50 p-6 border border-slate-200 mt-8">
          <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider text-[10px]">Related Tools</h2>
          <div className="flex flex-wrap gap-4">
             <Link to="/cost" className="text-sm text-[#4C7C44] font-medium hover:underline">Cost Per Nutrient (Single)</Link>
             <Link to="/recommend" className="text-sm text-[#4C7C44] font-medium hover:underline">NPK Fertilizer Calculator</Link>
          </div>
      </section>

      <footer className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
        <p><strong>Disclaimer:</strong> Prices and calculations are estimates for planning purposes only. Verify with your local agronomist and supplier before purchasing.</p>
      </footer>
    </div>
  );
};
