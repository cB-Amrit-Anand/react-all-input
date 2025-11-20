import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import InputField from "@react-all-input/components/customInput";
import "./App.css";
const basicOptions = [
    { value: "alpha", label: "Alpha" },
    { value: "beta", label: "Beta" },
    { value: "gamma", label: "Gamma" }
];
const statusOptions = [
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
const searchDirectory = [
    { id: 1, value: "AP", label: "Apple" },
    { id: 2, value: "OR", label: "Orange" },
    { id: 3, value: "BN", label: "Banana" },
    { id: 4, value: "MG", label: "Mango" }
];
const App = () => {
    const [textValue, setTextValue] = useState("Hello world");
    const [numberValue, setNumberValue] = useState(5);
    const [textareaValue, setTextareaValue] = useState("This textarea shows the counter.");
    const [selectValue, setSelectValue] = useState("alpha");
    const [multiSelectValue, setMultiSelectValue] = useState([basicOptions[0]]);
    const [pickyValue, setPickyValue] = useState([technologyOptions[0].id]);
    const [radioValue, setRadioValue] = useState("todo");
    const [checkboxValue, setCheckboxValue] = useState([statusOptions[2].value]);
    const [singleCheckbox, setSingleCheckbox] = useState(true);
    const [searchValue, setSearchValue] = useState("Apple");
    const [searchSelection, setSearchSelection] = useState("AP");
    const [rangeValue, setRangeValue] = useState({ from: "", to: "" });
    const [numericRangeValue, setNumericRangeValue] = useState({ from: "10", to: "30" });
    const selectedSummary = useMemo(() => multiSelectValue.map((val) => val.label).join(", ") || "Nothing selected", [multiSelectValue]);
    const handleCheckboxChange = (event) => {
        const { value: selected } = event.target;
        setCheckboxValue((prev) => prev.includes(selected) ? prev.filter((item) => item !== selected) : [...prev, selected]);
    };
    const handleRangeChange = (event, section) => {
        const { value } = event.target;
        setRangeValue((prev) => section === "right" ? { ...prev, to: value } : { ...prev, from: value });
    };
    const handleNumericRangeChange = (event, section) => {
        const { value } = event.target;
        setNumericRangeValue((prev) => section === "right" ? { ...prev, to: value } : { ...prev, from: value });
    };
    return (_jsxs("div", { className: "demo-shell", children: [_jsxs("header", { children: [_jsx("h1", { children: "React All Input Demo" }), _jsx("p", { children: "Each card renders the shared InputField component with different props." })] }), _jsxs("section", { className: "grid", children: [_jsxs("article", { children: [_jsx("h2", { children: "Text" }), _jsx(InputField, { title: "Basic text", name: "text", value: textValue, placeholder: "Type anything", onChange: (e) => setTextValue(e.target.value) })] }), _jsxs("article", { children: [_jsx("h2", { children: "Number" }), _jsx(InputField, { type: "number", title: "Positive number", name: "number", min: 0, value: numberValue, onChange: (e) => setNumberValue(Number(e.target.value)) })] }), _jsxs("article", { children: [_jsx("h2", { children: "Textarea" }), _jsx(InputField, { type: "textarea", title: "Message", name: "message", value: textareaValue, maxLength: 120, onChange: (e) => setTextareaValue(e.target.value) })] }), _jsxs("article", { children: [_jsx("h2", { children: "Select" }), _jsx(InputField, { type: "select", title: "Select a value", name: "single-select", placeholder: "Choose option", value: selectValue, options: basicOptions, onChange: (e) => setSelectValue(e.target.value) })] }), _jsxs("article", { children: [_jsx("h2", { children: "Multi Select (React Select)" }), _jsx(InputField, { type: "select multiple", title: "Pick multiple", name: "multi-select", placeholder: "Start typing...", options: basicOptions, value: multiSelectValue, onChange: (selected) => setMultiSelectValue(selected) }), _jsxs("p", { className: "helper", children: ["Selected: ", selectedSummary] })] }), _jsxs("article", { children: [_jsx("h2", { children: "Multi Select (Picky)" }), _jsx(InputField, { type: "select multiple picky", title: "Tech stack", name: "picky-select", options: technologyOptions, optionLabel: "name", optionValue: "id", value: pickyValue, onChange: (values) => setPickyValue(values) })] }), _jsxs("article", { children: [_jsx("h2", { children: "Radio Group" }), _jsx(InputField, { type: "radio", title: "Task status", name: "status", options: statusOptions, value: radioValue, onChange: (e) => setRadioValue(e.target.value) })] }), _jsxs("article", { children: [_jsx("h2", { children: "Checkbox Group" }), _jsx(InputField, { type: "checkbox", title: "Visible columns", name: "columns", options: statusOptions, value: checkboxValue, onChange: handleCheckboxChange })] }), _jsxs("article", { children: [_jsx("h2", { children: "Single Checkbox & Eye Toggle" }), _jsx(InputField, { type: "single-checkbox", title: "Enable advanced mode", name: "advanced", value: singleCheckbox, label: "Enabled", labelClass: "inline-label", showEye: true, eyeState: singleCheckbox, handleEyeClick: () => setSingleCheckbox((prev) => !prev), onChange: (e) => setSingleCheckbox(e.target.checked) })] }), _jsxs("article", { children: [_jsx("h2", { children: "Search / Autosuggest" }), _jsx(InputField, { type: "search", title: "Quick fruits search", name: "search", placeholder: "Search fruits", options: searchDirectory, optionLabel: "label", optionValue: "value", value: searchValue, onChange: (value) => setSearchValue(value), handleSelect: (value, label) => {
                                    setSearchSelection(String(value));
                                    setSearchValue(label ?? "");
                                }, loader: true }), _jsxs("p", { className: "helper", children: ["Selected value: ", searchSelection || "none"] })] }), _jsxs("article", { children: [_jsx("h2", { children: "Range" }), _jsx(InputField, { type: "range", title: "Budget range", name: "budgetFrom", nameRight: "budgetTo", placeholder: "From", value: rangeValue.from, valueRight: rangeValue.to, onChange: handleRangeChange })] }), _jsxs("article", { children: [_jsx("h2", { children: "Numeric Range" }), _jsx(InputField, { type: "numeric range", title: "Score", name: "scoreFrom", nameRight: "scoreTo", step: 5, value: numericRangeValue.from, valueRight: numericRangeValue.to, onChange: handleNumericRangeChange })] })] })] }));
};
export default App;
