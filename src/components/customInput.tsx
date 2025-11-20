import React, { useRef, useEffect } from "react";
import ReactSelect from "./reactSelect";
import ReactPicky from "./reactPicky";
import classes from "./styles.module.scss";
import AutoSuggest from "./autoSuggest";

//
// ----------------------
// Types
// ----------------------
//

export interface OptionItem {
    [key: string]: any;
}

export interface InputFieldProps {
    // Basic input props
    type?: string;
    title?: string;
    name: string;
    placeholder?: string;
    value?: any;
    defaultValue?: any;
    required?: boolean;
    disabled?: boolean;
    min?: number | string;
    max?: number | string;
    step?: number | string;

    // Styling
    className?: string;
    sectionClass?: string;
    divClass?: React.CSSProperties;
    style?: React.CSSProperties;
    extra?: Record<string, any>;
    error?: string;
    // Options (select, radio, checkbox, search)
    options?: OptionItem[];
    optionValue?: string;
    optionLabel?: string;

    // Range support
    valueRight?: any;
    nameRight?: string;

    // Select and search handlers
    handleSelect?: (value: any, label?: string) => void;

    // Events
    onChange?: (e: any, section?: string) => void;

    // For ReactSelect & search
    isDark?: boolean;
    loader?: boolean;
    showLoader?: boolean;
    filterDelay?: number;

    // Textarea props
    hideCharCount?: boolean;
    maxLength?: number;
    rows?: number;

    // Checkbox + eye toggle
    label?: string;
    labelClass?: string;
    showEye?: boolean;
    handleEyeClick?: () => void;
    eyeState?: boolean;

    // Form props
    forms?: Record<string, any>;
}

//
// ----------------------
// Component
// ----------------------
//

const InputField = ({
    type = "text",
    title,
    min,
    max,
    step,
    name,
    className = "",
    placeholder,
    value,
    defaultValue,
    required,
    disabled,
    options,
    optionValue = "value",
    optionLabel = "label",
    onChange,
    error,
    forms,
    ...props
}: InputFieldProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    //
    // Prevent scroll on number input
    //
    useEffect(() => {
        const preventScroll = (e: WheelEvent) => e.preventDefault();
        const current = inputRef.current;

        current?.addEventListener("wheel", preventScroll);
        return () => current?.removeEventListener("wheel", preventScroll);
    }, []);

    //
    // Custom change handler
    //
    const handleChange = (e: any, section?: string) => {
        if (type === "number" && e.target.value < 0) return;
        onChange?.(e, section);
    };

    const blurOnWheel = (e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur();

    //
    // Transform options for ReactSelect
    //
    const getOptions = (idKey: string, nameKey: string) =>
        options?.map((opt) => ({
            value: opt[idKey],
            label: opt[nameKey],
        })) || [];

    //
    // Transform options for ReactPicky
    //
    const getPickyOptions = (idKey: string, nameKey: string) =>
        options?.map((opt) => ({
            id: opt[idKey],
            name: opt[nameKey],
        })) || [];

    //
    // ===========================
    // RENDER SECTIONS
    // ===========================
    //

    const renderTextarea = () => (
        <>
            <textarea
                className={`${classes.formInput} ${className}`}
                placeholder={placeholder}
                value={value ?? undefined}
                defaultValue={value == null ? defaultValue : undefined}
                required={required}
                disabled={disabled}
                name={name}
                rows={props.rows || 4}
                style={{ height: "auto", ...props.style }}
                onChange={handleChange}
                {...forms}
            />
            {!props.hideCharCount && (
                <span className={classes.textCount}>
                    {value?.length}/{props.maxLength ?? 500}
                </span>
            )}
            {error && <span className={classes.errorText}>{error}</span>}
        </>
    );

    const renderSelect = (multiple: boolean = false) => (
        <select
            className={`${classes.formInput} ${classes.select} ${className}`}
            value={value ?? undefined}
            defaultValue={value == null ? defaultValue : undefined}
            onChange={handleChange}
            name={name}
            required={required}
            disabled={disabled}
            multiple={multiple}
            {...forms}
            style={props.style}
        >
            {placeholder && !multiple && <option value="">{placeholder}</option>}
            {options?.map((o, i) => (
                <option key={i} value={o[optionValue]}>
                    {o[optionLabel]}
                </option>
            ))}
        </select>
    );

    const renderReactSelect = () => (
        <ReactSelect
            options={getOptions(optionValue, optionLabel)}
            isMulti
            allowSelectAll
            value={value}
            onChange={(newValue, actionMeta) => {
                onChange?.(newValue); // call your handler in the correct shape
            }}
            isDisabled={disabled}
            placeholder={placeholder}
            required={required}
            className={className}
            isDark={props.isDark}
        />
    );

    const renderReactPicky = () => (
        <ReactPicky
            options={getPickyOptions(optionValue, optionLabel)}
            value={value}
            onChange={handleChange}
            name={name}
        />
    );

    const renderRadioOrCheckbox = (isCheckbox: boolean = false) => (
        <div className={classes.radio}>
            {options?.map((opt, i) => (
                <label key={i} className={classes.check_text}>
                    <input
                        type={isCheckbox ? "checkbox" : "radio"}
                        className={classes.checkbox}
                        name={name}
                        value={opt[optionValue]}
                        required={required}
                        disabled={disabled}
                        checked={
                            isCheckbox
                                ? value?.includes(opt[optionValue])
                                : opt[optionValue] === value
                        }
                        onChange={handleChange}
                        {...forms}
                    />
                    {opt[optionLabel]}
                </label>
            ))}
        </div>
    );

    const renderSingleCheckbox = () => (
        <div className={classes.radio}>
            <label className={classes.check_text}>
                <input
                    type="checkbox"
                    className={classes.checkbox}
                    name={name}
                    checked={!!value}
                    onChange={handleChange}
                    required={required}
                    disabled={disabled}
                    {...forms}
                />
                {props.label && <span className={props.labelClass}>{props.label}</span>}
            </label>
        </div>
    );

    const renderSearchInput = () => (
        <AutoSuggest
            options={options || []}
            value={value || ""}
            onChange={(val) => onChange?.(val)}
            onSelect={(val, label) => props.handleSelect?.(val, label)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={classes.formInput}
            containerClass={classes.inputSection}
            style={props.style}
            showLoader={props.loader}
            labelKey={optionLabel}
            valueKey={optionValue}
        />
    );

    const renderRange = (isNumeric: boolean = false) => (
        <>
            <input
                type={isNumeric ? "number" : "text"}
                placeholder="From"
                className={`${classes.formInput} ${className}`}
                onChange={(e) => handleChange(e, "left")}
                value={value ?? ""}
                min={0}
                step={step}
                required={required}
                disabled={disabled}
                name={name}
                style={props.style}
                onWheel={blurOnWheel}
                {...forms}
            />

            <input
                type={isNumeric ? "number" : "text"}
                placeholder="To"
                className={`${classes.formInput} ${className}`}
                onChange={(e) => handleChange(e, "right")}
                value={props.valueRight ?? ""}
                min={0}
                step={step}
                required={required}
                disabled={disabled}
                name={props.nameRight}
                style={props.style}
                onWheel={blurOnWheel}
                {...forms}
            />
        </>
    );

    const renderDefaultInput = () => (
        <>
            <input
                ref={inputRef}
                type={type}
                className={`${classes.formInput} ${className}`}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                name={name}
                value={value ?? ""}
                defaultValue={value == null ? defaultValue : undefined}
                required={required}
                disabled={disabled}
                style={props.style}
                onChange={handleChange}
                onWheel={blurOnWheel}
                {...forms}
                {...props.extra}
            />

            {error && <span className={classes.errorText}>{error}</span>}

            {props.showEye && (
                <button className={classes.eye} onClick={props.handleEyeClick}>
                    {props.eyeState ? 'Eye' : "Cross Eye"}
                </button>
            )}
        </>
    );

    //
    // Final switch handler
    //
    const renderByType = () => {
        switch (type) {
            case "textarea":
                return renderTextarea();

            case "select":
            case "select single":
                return renderSelect(false);

            case "select multiple":
                return renderReactSelect();

            case "select multiple picky":
                return renderReactPicky();

            case "radio":
                return renderRadioOrCheckbox(false);

            case "checkbox":
                return renderRadioOrCheckbox(true);

            case "single-checkbox":
                return renderSingleCheckbox();

            case "search":
            case "search single":
            case "search multiple":
                return renderSearchInput();

            case "range":
                return renderRange(false);

            case "numeric range":
                return renderRange(true);

            default:
                return renderDefaultInput();
        }
    };

    //
    // Component wrapper
    //
    return (
        <div
            className={`${classes.inputSection} ${props.sectionClass}`}
            style={{
                position: "relative",
                display: type === "radio" ? "flex" : "block",
                ...props.divClass,
            }}
        >
            {title && <label htmlFor={name}>{title}</label>}

            {renderByType()}
        </div>
    );
};

export default InputField;
