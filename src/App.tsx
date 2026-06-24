/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SoilTestConverter } from "./pages/SoilTestConverter";
import { FertilizerCalculator } from "./pages/FertilizerCalculator";
import { NutrientRemoval } from "./pages/NutrientRemoval";
import { CostPerNutrient } from "./pages/CostPerNutrient";
import { ProductComparison } from "./pages/ProductComparison";
import { LimePlanner } from "./pages/LimePlanner";
import { Favorites } from "./pages/Favorites";
import { About } from "./pages/About";
import { License } from "./pages/MiscPages";
import { NotFound } from "./pages/NotFound";
import { RouteChangeTracker } from "./components/RouteChangeTracker";

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <RouteChangeTracker />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="test" element={<SoilTestConverter />} />
            <Route path="recommend" element={<FertilizerCalculator />} />
            <Route path="removal" element={<NutrientRemoval />} />
            <Route path="cost" element={<CostPerNutrient />} />
            <Route path="compare" element={<ProductComparison />} />
            <Route path="lime" element={<LimePlanner />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="about" element={<About />} />
            <Route path="license" element={<License />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}
