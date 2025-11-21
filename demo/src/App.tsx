import React, { useMemo, useState } from "react";
import InputField, {
  OptionItem
} from "@react-all-input/components/customInput";
import "./App.css";
import "./customTheme.css";

const basicOptions: OptionItem[] = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma" }
];

const statusOptions: OptionItem[] = [
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" }
];

const technologyOptions = [
  { id: "react", name: "React" },
  { id: "angular", name: "Angular" },
  { id: "vue", name: "Vue" },
  { id: "svelte", name: "Svelte" }
];

const searchDirectory: OptionItem[] = [
  { id: 1, value: "AP", label: "Apple" },
  { id: 2, value: "OR", label: "Orange" },
  { id: 3, value: "BN", label: "Banana" },
  { id: 4, value: "MG", label: "Mango" }
];

const jobRoleOptions: OptionItem[] = [
  { value: "frontend", label: "Frontend Engineer" },
  { value: "backend", label: "Backend Engineer" },
  { value: "design", label: "Product Designer" },
  { value: "pm", label: "Product Manager" }
];

const filterStatusOptions: OptionItem[] = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "archived", label: "Archived" }
];

const App: React.FC = () => {
  const [textValue, setTextValue] = useState("Hello world");
  const [numberValue, setNumberValue] = useState(5);
  const [textareaValue, setTextareaValue] = useState("This textarea shows the counter.");
  const [selectValue, setSelectValue] = useState("alpha");
  const [multiSelectValue, setMultiSelectValue] = useState<OptionItem[]>([basicOptions[0]]);
  const [pickyValue, setPickyValue] = useState<string[]>([technologyOptions[0].id]);
  const [radioValue, setRadioValue] = useState("todo");
  const [checkboxValue, setCheckboxValue] = useState<string[]>([statusOptions[2].value]);
  const [singleCheckbox, setSingleCheckbox] = useState(true);
  const [searchValue, setSearchValue] = useState("Apple");
  const [searchSelection, setSearchSelection] = useState("AP");
  const [rangeValue, setRangeValue] = useState({ from: "", to: "" });
  const [numericRangeValue, setNumericRangeValue] = useState({ from: "10", to: "30" });
  const [customStyledValue, setCustomStyledValue] = useState("Neon text");
  const [jobName, setJobName] = useState("");
  const [jobEmail, setJobEmail] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [jobRoles, setJobRoles] = useState<OptionItem[]>([]);
  const [jobSubmitted, setJobSubmitted] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OptionItem[]>([]);
  const [filterRange, setFilterRange] = useState({ from: "0", to: "100" });
  const [filterOn, setFilterOn] = useState(true);

  const selectedSummary = useMemo(
    () => multiSelectValue.map((val) => val.label).join(", ") || "Nothing selected",
    [multiSelectValue]
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: selected } = event.target;
    setCheckboxValue((prev) =>
      prev.includes(selected) ? prev.filter((item) => item !== selected) : [...prev, selected]
    );
  };

  const handleRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    section?: string
  ) => {
    const { value } = event.target;
    setRangeValue((prev) =>
      section === "right" ? { ...prev, to: value } : { ...prev, from: value }
    );
  };

  const handleNumericRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    section?: string
  ) => {
    const { value } = event.target;
    setNumericRangeValue((prev) =>
      section === "right" ? { ...prev, to: value } : { ...prev, from: value }
    );
  };

  const handleJobSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJobSubmitted(`Submitted ${jobName || "anonymous"} (${jobEmail || "no email"})`);
  };

  return (
    <div className="demo-shell">
      <header>
        <h1>React</h1>
        <p>Each card renders the shared InputField component with different props.</p>
      </header>

      <section className="grid">
        <article className="span-2 form-card">
          <h2>Form Example: Job Application</h2>
          <p className="helper">
            Shows how multiple <code>InputField</code>s compose into a single form.
          </p>

          <form onSubmit={handleJobSubmit}>
            <InputField
              title="Full name"
              name="jobName"
              placeholder="Jane Doe"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              required
            />

            <InputField
              type="email"
              title="Work email"
              name="jobEmail"
              placeholder="jane@company.com"
              value={jobEmail}
              onChange={(e) => setJobEmail(e.target.value)}
            />

            <InputField
              type="textarea"
              title="Experience summary"
              name="experience"
              placeholder="Highlight relevant skills..."
              value={jobExperience}
              onChange={(e) => setJobExperience(e.target.value)}
              rows={3}
            />

            <InputField
              type="select multiple"
              title="Preferred roles"
              name="jobRoles"
              placeholder="Pick one or more roles"
              options={jobRoleOptions}
              value={jobRoles}
              onChange={(selected) => setJobRoles(selected as OptionItem[])}
            />

            <button type="submit" className="primary-btn">
              Submit application
            </button>
          </form>

          {jobSubmitted && <p className="helper success">{jobSubmitted}</p>}
        </article>

        <article className="span-2 filter-card">
          <h2>Panel Example: Filters</h2>
          <div className="filter-grid">
            <InputField
              type="search"
              title="Search inventory"
              name="filterSearch"
              placeholder="Search items"
              options={searchDirectory}
              value={filterSearch}
              onChange={(value: string) => setFilterSearch(value)}
              handleSelect={(value) => setFilterSearch(String(value))}
            />

            <InputField
              type="select multiple"
              title="Status"
              name="filterStatus"
              placeholder="Select status tags"
              options={filterStatusOptions}
              value={filterStatus}
              onChange={(selected) => setFilterStatus(selected as OptionItem[])}
            />

            <InputField
              type="numeric range"
              title="Quantity range"
              name="filterFrom"
              nameRight="filterTo"
              value={filterRange.from}
              valueRight={filterRange.to}
              onChange={(event, section) =>
                setFilterRange((prev) =>
                  section === "right"
                    ? { ...prev, to: event.target.value }
                    : { ...prev, from: event.target.value }
                )
              }
            />

            <InputField
              type="single-checkbox"
              title="Only show active listings"
              name="filterActive"
              value={filterOn}
              label={filterOn ? "Active only" : "All entries"}
              onChange={(e) => setFilterOn(e.target.checked)}
            />
          </div>

          <div className="helper">
            <strong>Current filter state:</strong> search = "{filterSearch}", status tags =
            {" "}
            {filterStatus.map((item) => item.label).join(", ") || "none"}, range ={" "}
            {filterRange.from}-{filterRange.to}, active = {filterOn ? "yes" : "no"}
          </div>
        </article>

        <article>
          <h2>Custom Styled</h2>
          <InputField
            title="Neon themed input"
            name="custom"
            placeholder="Try typing here"
            value={customStyledValue}
            onChange={(e) => setCustomStyledValue(e.target.value)}
            sectionClass="custom-section-demo"
            className="custom-input-demo"
          />
        </article>

        <article>
          <h2>Text</h2>
          <InputField
            title="Basic text"
            name="text"
            value={textValue}
            placeholder="Type anything"
            onChange={(e) => setTextValue(e.target.value)}
          />
        </article>

        <article>
          <h2>Number</h2>
          <InputField
            type="number"
            title="Positive number"
            name="number"
            min={0}
            value={numberValue}
            onChange={(e) => setNumberValue(Number(e.target.value))}
          />
        </article>

        <article>
          <h2>Textarea</h2>
          <InputField
            type="textarea"
            title="Message"
            name="message"
            value={textareaValue}
            maxLength={120}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
        </article>

        <article>
          <h2>Select</h2>
          <InputField
            type="select"
            title="Select a value"
            name="single-select"
            placeholder="Choose option"
            value={selectValue}
            options={basicOptions}
            onChange={(e) => setSelectValue(e.target.value)}
          />
        </article>

        <article>
          <h2>Multi Select (React Select)</h2>
          <InputField
            type="select multiple"
            title="Pick multiple"
            name="multi-select"
            placeholder="Start typing..."
            options={basicOptions}
            value={multiSelectValue}
            onChange={(selected) => setMultiSelectValue(selected as OptionItem[])}
          />
          <p className="helper">Selected: {selectedSummary}</p>
        </article>

        <article>
          <h2>Multi Select (Picky)</h2>
          <InputField
            type="select multiple picky"
            title="Tech stack"
            name="picky-select"
            options={technologyOptions}
            optionLabel="name"
            optionValue="id"
            value={pickyValue}
            onChange={(values) => setPickyValue(values as string[])}
          />
        </article>

        <article>
          <h2>Radio Group</h2>
          <InputField
            type="radio"
            title="Task status"
            name="status"
            options={statusOptions}
            value={radioValue}
            onChange={(e) => setRadioValue(e.target.value)}
          />
        </article>

        <article>
          <h2>Checkbox Group</h2>
          <InputField
            type="checkbox"
            title="Visible columns"
            name="columns"
            options={statusOptions}
            value={checkboxValue}
            onChange={handleCheckboxChange}
          />
        </article>

        <article>
          <h2>Single Checkbox & Eye Toggle</h2>
          <InputField
            type="single-checkbox"
            title="Enable advanced mode"
            name="advanced"
            value={singleCheckbox}
            label="Enabled"
            labelClass="inline-label"
            showEye
            eyeState={singleCheckbox}
            handleEyeClick={() => setSingleCheckbox((prev) => !prev)}
            onChange={(e) => setSingleCheckbox(e.target.checked)}
          />
        </article>

        <article>
          <h2>Search / Autosuggest</h2>
          <InputField
            type="search"
            title="Quick fruits search"
            name="search"
            placeholder="Search fruits"
            options={searchDirectory}
            optionLabel="label"
            optionValue="value"
            value={searchValue}
            onChange={(value: string) => setSearchValue(value)}
            handleSelect={(value, label) => {
              setSearchSelection(String(value));
              setSearchValue(label ?? "");
            }}
            loader
          />
          <p className="helper">Selected value: {searchSelection || "none"}</p>
        </article>

        <article>
          <h2>Range</h2>
          <InputField
            type="range"
            title="Budget range"
            name="budgetFrom"
            nameRight="budgetTo"
            placeholder="From"
            value={rangeValue.from}
            valueRight={rangeValue.to}
            onChange={handleRangeChange}
          />
        </article>

        <article>
          <h2>Numeric Range</h2>
          <InputField
            type="numeric range"
            title="Score"
            name="scoreFrom"
            nameRight="scoreTo"
            step={5}
            value={numericRangeValue.from}
            valueRight={numericRangeValue.to}
            onChange={handleNumericRangeChange}
          />
        </article>
      </section>
    </div>
  );
};

export default App;
