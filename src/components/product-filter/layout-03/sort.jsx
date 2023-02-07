import PropTypes from "prop-types";
import clsx from "clsx";
import { RiSortDesc } from "react-icons/ri";

const SortWidget = ({ onChange, value, show }) => {
    const changeHandler = (e) => {
        const { value: currentValue } = e.target;
        onChange(currentValue);
    };
    return (
        <div className="nuron-expo-filter-widget widget-shortby mb--30">
            <div className="inner">
                <h5 className="widget-title tooltip-ex">
                    <span>
                        <RiSortDesc />
                    </span>
                    <span className={clsx("ml--5", show ? "widget-show" : "widget-hide")}>Sort By</span>
                    {!show && (
                        <span className="tooltiptext">Sort By</span>
                    )}
                </h5>
                <div className="content">
                    <div className="nuron-form-check tooltip-ex">
                        <input
                            type="radio"
                            value="newest"
                            name="sort"
                            id="short-check1"
                            checked={value === "newest"}
                            onChange={changeHandler}
                        />
                        <label htmlFor="short-check1">
                            <div className={clsx(show ? "widget-show" : "widget-hide")}>
                                Newest
                            </div>
                            {!show && (
                                <>&nbsp;</>
                            )}
                            {!show && (
                                <span className="tooltiptext">Newest</span>
                            )}
                        </label>
                    </div>
                    <div className="nuron-form-check tooltip-ex">
                        <input
                            type="radio"
                            value="oldest"
                            name="sort"
                            id="short-check2"
                            checked={value === "oldest"}
                            onChange={changeHandler}
                        />
                        <label htmlFor="short-check2">
                            <div className={clsx(show ? "widget-show" : "widget-hide")}>
                                Oldest
                            </div>
                            {!show && (
                                <>&nbsp;</>
                            )}
                            {!show && (
                                <span className="tooltiptext">Oldest</span>
                            )}
                        </label>
                    </div>
                    <div className="nuron-form-check tooltip-ex">
                        <input
                            type="radio"
                            value="most-liked"
                            name="sort"
                            id="short-check3"
                            checked={value === "most-liked"}
                            onChange={changeHandler}
                        />
                        <label htmlFor="short-check3">
                            <div className={clsx(show ? "widget-show" : "widget-hide")}>
                                Most Liked
                            </div>
                            {!show && (
                                <>&nbsp;</>
                            )}
                            {!show && (
                                <span className="tooltiptext">Most Liked</span>
                            )}
                        </label>
                    </div>
                    <div className="nuron-form-check tooltip-ex">
                        <input
                            type="radio"
                            value="least-liked"
                            name="sort"
                            id="short-check4"
                            checked={value === "least-liked"}
                            onChange={changeHandler}
                        />
                        <label htmlFor="short-check4">
                            <div className={clsx(show ? "widget-show" : "widget-hide")}>
                                Least Liked
                            </div>
                            {!show && (
                                <>&nbsp;</>
                            )}
                            {!show && (
                                <span className="tooltiptext">Least Liked</span>
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

SortWidget.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default SortWidget;
