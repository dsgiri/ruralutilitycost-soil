import React from "react";
import { Seo } from "../components/Seo";

export const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-in fade-in duration-500 bg-white p-8 border border-slate-200 shadow-sm ring-1 ring-slate-900/5">
      <Seo title="About" description="Learn about the Rural Ops Tools soil fertility hub." url="/about" />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-b border-slate-200 pb-4">About Soil</h1>
      
      <div className="prose prose-slate max-w-none prose-p:leading-relaxed">
        <p>
          <strong>Soil</strong> is part of the Rural Ops Tools ecosystem. This hub is designed specifically to help farmers, agronomists, and rural land managers interpret soil tests, plan fertilizer applications, compare nutrient products, estimate nutrient removal, and make better fertility decisions.
        </p>

        <p>
          Crop nutrition is one of the most significant input costs in any agricultural operation. Understanding your exact needs, converting complex lab data into actionable application rates, and finding the most cost-effective bulk nutrient sources is critical to farm profitability and environmental stewardship.
        </p>

        <p>
          Our goal is to help you make practical crop nutrition decisions with clear, easy-to-use calculators. Whether you're planning a top-dress application of nitrogen, evaluating lime needs, or comparing liquid versus granular sources, Soil provides the structured data models you need.
        </p>
      </div>
    </div>
  );
};
