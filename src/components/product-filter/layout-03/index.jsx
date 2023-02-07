import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Scrollbar } from "react-scrollbars-custom";
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import ContactWidget from "./contact";
import SortWidget from "./sort";
import CategoryFilter from "./category-filter";
import PriceSort from "./price-sort";
import PriceRangeFilter from "./price-range-filter";

const ProductFilter = ({
    contact,
    sortHandler,
    filterHandler,
    priceHandler,
    inputs,
    sort,
    categories,
    levels,
}) => {
    const [isShow, setIsShow] = useState(true);
    const handleSidebar = () => {
        setIsShow(prev => !prev);
    }
    return (
        <div id="author-filter" className={clsx("author-filter", isShow ? 'nu-show-sidebar' : 'nu-hide-sidebar')}>
            <Scrollbar className="filter_scrollbar" autoHide noScrollX={true}>
                <div className="nu-course-sidebar">
                    <div className={clsx("nu-btn-sidebar", isShow ? "nu-open-sidebar" : "nu-close-sidebar")} onClick={handleSidebar}>
                        {isShow ? (
                            <AiOutlineLeft size={22} />
                        ) : (
                            <AiOutlineRight size={22} />
                        )}
                    </div>
                    {contact && (
                        <ContactWidget show={isShow} />
                    )}
                    <CategoryFilter show={isShow} categories={categories} onChange={filterHandler} />
                    <SortWidget show={isShow} onChange={sortHandler} value={sort} />
                    <PriceSort show={isShow} onChange={sortHandler} value={sort} />
                    {isShow && (
                        <PriceRangeFilter values={inputs.price} onChange={priceHandler} />
                    )}
                </div>
            </Scrollbar>
        </div>
    )
};

ProductFilter.propTypes = {
    sortHandler: PropTypes.func,
    filterHandler: PropTypes.func,
    priceHandler: PropTypes.func,
    inputs: PropTypes.shape({
        price: PropTypes.arrayOf(PropTypes.number),
    }),
    sort: PropTypes.string,
    categories: PropTypes.shape({}),
    levels: PropTypes.arrayOf(PropTypes.string),
    languages: PropTypes.arrayOf(PropTypes.string),
};

export default ProductFilter;
