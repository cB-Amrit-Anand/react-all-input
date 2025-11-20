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

### Library scripts

```
npm run build   # builds dist/ (CJS, ESM, and d.ts)
```

### Publishing to npm

Use these steps when you are ready to publish the package for the first time (or release an update):

1. `npm install` (root) – ensure dependencies are fresh, then run `npm run build` so `dist/` is up to date.
2. `cd demo && npm install && npm run build` (optional) – confirm the example still works.
3. `npm pack` – inspect the generated tarball to verify the files that will ship.
4. `npm version <patch|minor|major>` – bumps the semver and creates a git tag.
5. `npm publish --access public` – publishes `@amrit981/react-all-input` to npm (make sure `npm whoami` shows the right user).

If this is the first time publishing under the `@amrit981` scope, run `npm login` and ensure the package name is available before step 5.
