import React from "react";
import { Seo } from "../components/Seo";

export const License: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-in fade-in duration-500 bg-white p-8 border border-slate-200 shadow-sm ring-1 ring-slate-900/5">
      <Seo title="License" description="Open-source license information for the Rural Utility Cost Soil tools." url="/license" />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-b border-slate-200 pb-4">License</h1>
      <p className="text-slate-600">
        The Rural Utility Cost Soil tools are provided under an open-source license. Please refer to our GitHub repository for the full Apache-2.0 or MIT licensing terms.
      </p>
    </div>
  );
};
