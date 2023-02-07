import { useState, useEffect, useReducer, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import ProductFilter from "@components/product-filter/layout-03";
import { flatDeep } from "@utils/methods";
import { SectionTitleType, ProductType } from "@utils/types";
import { shuffleArray } from "@utils/methods";
import Container from "./container";

function reducer(state, action) {
    switch (action.type) {
        case "SET_INPUTS":
            return { ...state, inputs: { ...state.inputs, ...action.payload } };
        case "SET_SORT":
            return { ...state, sort: action.payload };
        case "SET_ALL_PRODUCTS":
            return { ...state, allProducts: action.payload };
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "SET_PAGE":
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
}

const POSTS_PER_PAGE = 12;

const ExploreProductArea = ({ className, space, data: { section_title, products, placeBid }, id }) => {
    const itemsToFilter = [...products];
    const [state, dispatch] = useReducer(reducer, {
        products: [],
        allProducts: products || [],
        inputs: { price: [0, 100] },
        sort: "newest",
        currentPage: 1,
    });
    const [categories, setCategories] = useState({});
    const [levels, setLevels] = useState([]);

    const onSaleProducts = useRef([]);

    // Generate data from products data
    useEffect(() => {
        const cats = flatDeep(products.map((prod) => prod.categories));
        const categoryData = cats.reduce((obj, b) => {
            const newObj = { ...obj };
            newObj[b] = obj[b] + 1 || 1;
            return newObj;
        }, {});
        setCategories(categoryData);
        const levelsData = [...new Set(products.map((prod) => prod.level))];
        setLevels(levelsData);

        onSaleProducts.current = shuffleArray(products).slice(0, 10);
    }, [products]);

    /* Sorting logic start */
    const sortHandler = (value) => {
        dispatch({
            type: "SET_SORT",
            payload: value,
        });
        const sortedProducts = state.products.sort((a, b) => {
            switch (value) {
                case "most-liked":
                    return a.likeCount < b.likeCount ? 1 : -1;
                case "least-liked":
                    return a.likeCount > b.likeCount ? 1 : -1;
                case "oldest":
                    return new Date(a.published_at).getTime() >
                        new Date(b.published_at).getTime()
                        ? 1
                        : -1;
                case "low-to-high":
                    return a.price.amount > b.price.amount ? 1 : -1;
                case "high-to-low":
                    return a.price.amount > b.price.amount ? -1 : 1;
                default:
                    return new Date(b.published_at).getTime() >
                        new Date(a.published_at).getTime()
                        ? 1
                        : -1;
            }
        });
        dispatch({ type: "SET_PRODUCTS", payload: sortedProducts });
    };

    useEffect(() => {
        sortHandler(state.sort);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentPage]);

    // Pricing filter
    const priceHandler = (value) => {
        dispatch({ type: "SET_INPUTS", payload: { price: value } });
    };

    // Filter Handler, this function receives the filter name and the value
    const filterHandler = useCallback((name, val) => {
        dispatch({
            type: "SET_INPUTS",
            payload: { [name]: val },
        });
    }, []);

    // Filter Method, this function is responsible for filtering the products
    const filterMethods = useCallback((item, filterKey, value) => {
        if (value === "all") return false;
        const itemKey = filterKey;
        if (filterKey === "price") {
            return (
                item[itemKey].amount <= value[0] / 100 ||
                item[itemKey].amount >= value[1] / 100
            );
        }

        if (Array.isArray(value) && value.length === 0) return false;
        if (Array.isArray(item[itemKey])) {
            return !item[itemKey].some((a1) => value.includes(a1));
        }
        if (
            typeof item[itemKey] === "string" ||
            typeof item[itemKey] === "number"
        ) {
            return !value.includes(item[itemKey]);
        }
        return item[itemKey] !== value;
    }, []);

    // Filter Method, this function is responsible for filtering the products
    const itemFilterHandler = useCallback(() => {
        let filteredItems = [];

        filteredItems = itemsToFilter.filter((item) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in state.inputs) {
                if (filterMethods(item, key, state.inputs[key])) return false;
            }
            return true;
        });
        dispatch({ type: "SET_ALL_PRODUCTS", payload: filteredItems });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.inputs]);

    useEffect(() => {
        itemFilterHandler();
    }, [itemFilterHandler]);

    const initialRender = useRef(0);
    useEffect(() => {
        if (initialRender.current < 2) {
            initialRender.current += 1;
        } else {
            document
                .getElementById("explore-id")
                ?.scrollIntoView({ behavior: "smooth" });
        }
    }, [state.inputs]);

    useEffect(() => {
        dispatch({
            type: "SET_PRODUCTS",
            payload: state.allProducts.slice(0, 0 + POSTS_PER_PAGE),
        });
    }, [state.allProducts]);

    return (
        <div
            className={clsx(
                "rn-product-area masonary-wrapper-activation",
                "pl--10 pr--10",
                className
            )}
            id={id}
        >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center mb--40 mt--20">
                        {section_title && (
                            <SectionTitle
                                className="mb--0"
                                disableAnimation
                                {...section_title}
                            />
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="author-explorer">
                        <ProductFilter
                            contact={false}
                            sortHandler={sortHandler}
                            inputs={state.inputs}
                            sort={state.sort}
                            categories={categories}
                            levels={levels}
                            filterHandler={filterHandler}
                            priceHandler={priceHandler}
                        />
                        <Container products={onSaleProducts.current} placeBid={placeBid} />
                    </div>
                </div>
            </div>
        </div>
    );
};

ExploreProductArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    id: PropTypes.string,
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType),
        placeBid: PropTypes.bool,
    }),
};

ExploreProductArea.defaultProps = {
    space: 1,
};

export default ExploreProductArea;
