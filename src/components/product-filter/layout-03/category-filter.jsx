import { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { BiCategory } from "react-icons/bi";

const CategoryFilter = ({ categories, onChange, show }) => {
    const [isCheck, setIsCheck] = useState([]);

    const handleClick = (e) => {
        const { value, checked } = e.target;
        setIsCheck([...isCheck, value]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== value));
        }
    };
    useEffect(() => {
        onChange("categories", isCheck);
    }, [isCheck, onChange]);

    return (
        <div className="nuron-expo-filter-widget widget-category mb--30">
            <div className="inner">
                <h5 className="widget-title tooltip-ex">
                    <span>
                        <BiCategory />
                    </span>
                    <span className={clsx("ml--5", show ? "widget-show" : "widget-hide")}>Categories</span>
                    {!show && (
                        <span className="tooltiptext">Categories</span>
                    )}
                </h5>
                <div className="content">
                    {Object.entries(categories).map(([key, value]) => (
                        <div className="nuron-form-check" key={key}>
                            <input
                                type="checkbox"
                                name="categories"
                                value={key}
                                onChange={handleClick}
                                id={`cat-check-${key}`}
                            />
                            <label
                                id={`cat-check-${key}`}
                                htmlFor={`cat-check-${key}`}
                                className={clsx("text-capitalize", "tooltip-ex")}
                            >
                                <div className={clsx(show ? "widget-show" : "widget-hide")}>
                                    {key} <span>({value})</span>
                                </div>
                                {!show && (
                                    <>&nbsp;</>
                                )}
                                {!show && (
                                    <span className="tooltiptext">{key}</span>
                                )}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

CategoryFilter.propTypes = {
    categories: PropTypes.shape({}),
    onChange: PropTypes.func,
};

export default CategoryFilter;
