## React All Input

Reusable Input component that renders every form control (text, number, textarea, dropdowns, React Select, React Picky, radio/checkbox groups, ranges, search/autocomplete, etc.) from a single configuration object.

### Installation

```bash
npm install @amrit981/react-all-input
```

```tsx
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

### Demo app

A full playground lives in `demo/`, built with Vite + React. Every supported `type` is showcased: text, number, textarea, select (single/multiple), React Select multiselect, React Picky multiselect, radio group, checkbox group, single checkbox with eye toggle, search/autocomplete, string ranges, and numeric ranges.

```
cd demo
npm install
npm run dev   # open http://localhost:5173
```

Run `npm run build` inside `demo/` to produce a static bundle (output in `demo/dist`).


