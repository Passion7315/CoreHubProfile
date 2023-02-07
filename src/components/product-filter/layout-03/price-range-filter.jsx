import PropTypes from "prop-types";
import clsx from "clsx";
import InputRange from "@ui/input-range";
import { HiFilter } from 'react-icons/hi';

const PriceRangeFilter = ({ values, onChange }) => (
    <div className="nuron-expo-filter-widget widget-shortby mb--30">
        <div className="inner">
            <h5 className="widget-title">
                <span>
                    <HiFilter />
                </span>
                <span className={clsx("ml--5")}>Filter By Price</span>
            </h5>
            <div className="content">
                <div className="price_filter s-filter clear">
                    <InputRange
                        values={values}
                        onChange={onChange}
                        hideButton
                    />
                </div>
            </div>
        </div>
    </div>
);

PriceRangeFilter.propTypes = {
    values: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func,
};

export default PriceRangeFilter;
