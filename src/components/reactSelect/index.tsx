import React from "react";
import Select, {
    GroupBase,
    OptionsOrGroups,
    Props as SelectProps,
    StylesConfig,
    MultiValue,
    ActionMeta
} from "react-select";

export interface OptionType {
    label: string;
    value: string | number;
    [key: string]: any;
}

export interface MySelectProps
    extends SelectProps<OptionType, boolean, GroupBase<OptionType>> {
    allowSelectAll?: boolean;
    allOption?: OptionType;
    isDark?: boolean;
    isDisabled?: boolean;
    required?: boolean;
    placeholder?: string;
    className?: string;
    isMulti?: boolean;
    handleKeyDown?: (e: React.KeyboardEvent) => void;
    handleKeyUp?: (e: React.KeyboardEvent) => void;
    options: OptionType[];
    value?: any;
    onChange?: (
        newValue: OptionType | MultiValue<OptionType> | null,
        actionMeta?: ActionMeta<OptionType>
    ) => void;
}

const MySelect = React.forwardRef<any, MySelectProps>((props, ref) => {
    const {
        allowSelectAll,
        allOption,
        isDark,
        isDisabled,
        handleKeyDown,
        handleKeyUp,
        required,
        placeholder,
        className,
        isMulti,
        options,
        onChange,
        value,
        ...rest
    } = props;

    const customStyles: StylesConfig<OptionType, boolean> = {
        control: (base) => ({
            ...base,
            maxHeight: "65px",
            overflow: "auto",
        }),
    };

    const customStylesDark: StylesConfig<OptionType, boolean> = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#1e1e1e",
            borderColor: state.isFocused ? "#777" : "#333",
            color: "#fff",
            boxShadow: state.isFocused
                ? "0 0 5px rgba(255, 255, 255, 0.2)"
                : "none",
            "&:hover": { borderColor: "#777" },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#222",
        }),
        option: (provided, { isFocused, isSelected }) => {
            let bgColor = "#222";
            if (isSelected) bgColor = "#555";
            else if (isFocused) bgColor = "#444";

            return {
                ...provided,
                backgroundColor: bgColor,
                color: isSelected ? "#fff" : "#ccc",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#444", color: "#fff" },
            };
        },
        singleValue: (provided) => ({
            ...provided,
            color: "#fff",
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#000",
            borderRadius: "4px",
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "#fff",
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "#aaa",
            "&:hover": {
                backgroundColor: "#333",
                color: "#fff",
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#aaa",
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#aaa",
            "&:hover": { color: "#fff" },
        }),
        indicatorSeparator: () => ({ display: "none" }),
    };

    // ---------- HANDLE SELECT ALL ----------
    if (allowSelectAll) {
        return (
            <Select
                {...rest}
                ref={ref}
                value={value}
                options={options}
                isMulti={isMulti}
                styles={isDark ? customStylesDark : customStyles}
                placeholder={placeholder}
                required={required}
                menuPlacement="auto"
                isDisabled={isDisabled}
                onKeyDown={handleKeyDown}
                className={className}
                onChange={(selected: any) => {
                    if (
                        selected &&
                        selected.length > 0 &&
                        selected[selected.length - 1]?.value === allOption?.value
                    ) {
                        return onChange?.(options as any);
                    }
                    return onChange?.(selected);
                }}
            />
        );
    }

    // ---------- DEFAULT RENDER ----------
    return (
        <Select
            {...rest}
            ref={ref}
            value={value}
            options={options}
            isMulti={isMulti}
            styles={isDark ? customStylesDark : customStyles}
            isDisabled={isDisabled}
            placeholder={placeholder}
            className={className}
        />
    );
});

MySelect.defaultProps = {
    allOption: {
        label: "Select all",
        value: "*",
    },
    isMulti: true,
    isDark: false,
    isDisabled: false,
    placeholder: "Select...",
};

export default MySelect;
