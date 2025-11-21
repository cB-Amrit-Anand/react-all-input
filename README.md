## React All Input

Reusable Input component that renders every form control (text, number, textarea, dropdowns, React Select, React Picky, radio/checkbox groups, ranges, search/autocomplete, etc.) from a single configuration object.

### Installation

```bash
npm install @amrit981/react-all-input
```

```tsx
import "@amrit981/react-all-input/dist/index.css";
import { InputField } from "@amrit981/react-all-input";

export const Example = () => (
  <InputField
    title="Job title"
    name="jobTitle"
    placeholder="Enter a job title"
    type="select multiple"
    options={[
      { label: "Engineer", value: "eng" },
      { label: "Designer", value: "design" }
    ]}
    onChange={(value) => console.log(value)}
  />
);
```

### Custom styling

The component exposes several hooks for your own CSS:

- `className` applies to the actual input/select/search control.
- `sectionClass` applies to the outer wrapper that contains the label and field.
- `style` and `divClass` let you pass inline overrides.

Usage example (mirrors the demo in `demo/src/customTheme.css`):

```tsx
import "@amrit981/react-all-input/dist/index.css";
import "./customTheme.css";

export const NeonInput = () => (
  <InputField
    title="Neon themed input"
    name="custom"
    placeholder="Type here"
    sectionClass="custom-section-demo"
    className="custom-input-demo"
  />
);
```

You can skip importing `dist/index.css` if you truly want to provide 100% of the styling yourself—just supply `className`/`sectionClass` and style the generated markup.

### Demo app

A full playground lives in `demo/`, built with Vite + React. Every supported `type` is showcased: text, number, textarea, select (single/multiple), React Select multiselect, React Picky multiselect, radio group, checkbox group, single checkbox with eye toggle, search/autocomplete, string ranges, numeric ranges, plus full form/filter scenarios that combine multiple fields.

```
cd demo
npm install
npm run dev   # open http://localhost:5173
```

Run `npm run build` inside `demo/` to produce a static bundle (output in `demo/dist`).
