import PropTypes from "prop-types";
import clsx from "clsx";
import { TbSortDescending2 } from 'react-icons/tb';

const PriceSort = ({ onChange, value, show }) => {
    const changeHandler = (e) => {
        const { value: currentValue } = e.target;
        onChange(currentValue);
    };
    return (
        <div className="nuron-expo-filter-widget widget-shortby mb--30">
            <div className="inner">
                <h5 className="widget-title tooltip-ex">
                    <span>
                        <TbSortDescending2 />
                    </span>
                    <span className={clsx("ml--5", show ? "widget-show" : "widget-hide")}>Sort by Price</span>
                    {!show && (
                        <span className="tooltiptext">Sort By Price</span>
                    )}
                </h5>
                <div className="content">
                    <div className="nuron-form-check tooltip-ex">
                        <input
                            type="radio"
                            value="low-to-high"
                            name="sort"
                            id="price-check1"
                            checked={value === "low-to-high"}
                            onChange={changeHandler}
                        />
                        <label htmlFor="price-check1">
                            <div className={clsx(show ? "widget-show" : "widget-hide")}>
                                Low to High
                            </div>
                            {!show && (
                                <>&nbsp;</>
                            )}
                            {!show && (
                                <span className="tooltiptext">Low to High</span>
                            )}
                        </label>
                    </div>
                    <div className="nuron-form-check tooltip-ex">
                        <input
                            type="radio"
                            value="high-to-low"
                            name="sort"
                            id="price-check2"
                            checked={value === "high-to-low"}
                            onChange={changeHandler}
                        />
                        <label htmlFor="price-check2">
                            <div className={clsx(show ? "widget-show" : "widget-hide")}>
                                High to Low
                            </div>
                            {!show && (
                                <>&nbsp;</>
                            )}
                            {!show && (
                                <span className="tooltiptext">High to Low</span>
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

PriceSort.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default PriceSort;
