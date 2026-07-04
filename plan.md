### Plan for Updating Calculator Pages to Universal Standards

I will update all calculator pages to adhere strictly to the `CALCULATOR_TEMPLATE.md` standards.

**Files to modify:**
1. `src/pages/CostPerNutrient.tsx`
2. `src/pages/FertilizerCalculator.tsx`
3. `src/pages/LimePlanner.tsx`
4. `src/pages/NutrientRemoval.tsx`
5. `src/pages/ProductComparison.tsx`
6. `src/pages/SoilTestConverter.tsx`

**Key updates for each page:**
- **Layout:** Re-structure the calculator module into a two-column grid on desktop (`md:grid-cols-2` or `lg:grid-cols-12` split), with input controls on the left and real-time results displayed prominently on the right. Both will stack into a single column on mobile.
- **Accessibility:** Add explicit `aria-label` or `aria-labelledby` attributes to dynamic result containers (e.g., `aria-live="polite"`). Ensure all inputs have clear, linked `<label>` tags.
- **Additional Sections:**
  - Add a **Logic/Formulas** section explicitly detailing the math behind the calculation to provide transparency.
  - Add a brief **FAQ** section relevant to each specific calculator.
  - Add a standard **Disclaimer footer** stating these tools are estimates for planning purposes.
  - Include a **Related Tools** section linking to other calculators in the ecosystem.
- **Styling:** Ensure inputs and touch targets are mobile-friendly (min-height for inputs), maintaining the existing brand style and Tailwind utility classes. No external dependencies will be added.

I will implement these changes sequentially, validating after edits. Please approve this plan.
