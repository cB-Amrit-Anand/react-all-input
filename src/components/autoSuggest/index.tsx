import React, { useEffect, useRef, useState } from "react";
import "./style.scss";

export interface AutoSuggestOption {
    [key: string]: any;
}

interface AutoSuggestProps {
    options: AutoSuggestOption[];
    labelKey?: string;
    valueKey?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    onSelect?: (value: any, label: string) => void;
    disabled?: boolean;
    className?: string;
    containerClass?: string;
    style?: React.CSSProperties;
    required?: boolean;
    showLoader?: boolean;
    filterDelay?: number;
}

const AutoSuggest: React.FC<AutoSuggestProps> = ({
    options = [],
    labelKey = "label",
    valueKey = "value",
    value = "",
    placeholder = "Search...",
    onChange,
    onSelect,
    disabled = false,
    className = "",
    containerClass = "",
    style = {},
    required = false,
    showLoader = false,
    filterDelay = 300
}) => {
    const [inputValue, setInputValue] = useState<string>(value);
    const [filtered, setFiltered] = useState<AutoSuggestOption[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Sync value if controlled externally
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setInputValue(newVal);
        onChange?.(newVal);

        // Clear previous debounce
        if (timerRef.current) clearTimeout(timerRef.current);

        if (newVal.trim() === "") {
            setFiltered([]);
            setShowSuggestions(false);
            setLoading(false);
            return;
        }

        if (showLoader) setLoading(true);

        timerRef.current = setTimeout(() => {
            const filteredOptions = options.filter((opt) =>
                String(opt[labelKey] ?? "")
                    .toLowerCase()
                    .includes(newVal.toLowerCase())
            );

            setFiltered(filteredOptions);
            setShowSuggestions(true);
            setLoading(false);
        }, filterDelay);
    };

    const handleSelect = (option: AutoSuggestOption) => {
        setInputValue(option[labelKey]);
        setShowSuggestions(false);
        onSelect?.(option[valueKey], option[labelKey]);
    };

    // Hide suggestions on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={`auto-suggest-container ${containerClass}`}
            ref={containerRef}
            style={style}
        >
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                disabled={disabled}
                className={`auto-suggest-input ${className}`}
                required={required}
            />

            {showLoader && loading && (
                <div className="auto-suggest-loader"></div>
            )}

            {showSuggestions && filtered.length > 0 && (
                <div className="auto-suggest-dropdown">
                    {filtered.map((opt, index) => (
                        <button
                            key={`autoSuggest-${index}`}
                            type="button"
                            className="auto-suggest-option"
                            onClick={() => handleSelect(opt)}
                        >
                            {opt[labelKey]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AutoSuggest;
