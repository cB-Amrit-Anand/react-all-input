import React, { useEffect, useState } from "react";
import "./picky.scss";
import { Picky } from "react-picky";
interface Option {
    id: string | number;
    name: string;
}

interface ReactPickyProps {
    name: string;
    onChange?: (value: any) => void;
    value?: any[] | object | string | number;
    options: Option[];
}

const ReactPicky: React.FC<ReactPickyProps> = (props) => {
    const { name, value, onChange, options } = props;

    const [isRightSide, setIsRightSide] = useState<boolean>(false);

    useEffect(() => {
        const checkScreenSide = () => {
            const screenWidth = window.innerWidth;
            const element = document.getElementById(name);

            if (element) {
                const rect = element.getBoundingClientRect();
                setIsRightSide(rect.right > screenWidth / 2);
            }
        };

        checkScreenSide();
        window.addEventListener("resize", checkScreenSide);

        return () => window.removeEventListener("resize", checkScreenSide);
    }, [name]);

    return (
        <Picky
            value={value}
            onChange={onChange}
            options={options}
            numberDisplayed={0}
            valueKey="id"
            labelKey="name"
            multiple={true}
            includeSelectAll={true}
            includeFilter={true}
            className={`multiSelectControl ${isRightSide ? "left-side" : "right-side"}`}
            name={name}
        />
    );
};

export default ReactPicky;
