import { useReducer, useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import TabContainer from "react-bootstrap/TabContainer";
import Nav from "react-bootstrap/Nav";
import { StickyContainer, Sticky } from 'react-sticky';
import { SlClose } from 'react-icons/sl';
import { FiCheck } from 'react-icons/fi';
import SectionTitle from "@components/section-title/layout-02";
import ProductFilter from "@components/product-filter/layout-03";
import { SectionTitleType, ProductType } from "@utils/types";
import { flatDeep } from "@utils/methods";
import { shuffleArray } from "@utils/methods";
import { Image } from "react-bootstrap";
import Container from "./container";

const GRID_COLUMN = {
  GRID_3: 3,
  GRID_4: 4,
  GRID_5: 5,
  GRID_6: 6,
}

const NFT_EFFECT = {
  NO_EFFECT: 0,
  CARD_FLIP: 1,
  WRAP_VIEW: 2
}

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

const ExploreProductArea = ({
  className,
  space,
  data: { section_title, products, placeBid },
}) => {
  const itemsToFilter = [...products];
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    allProducts: products || [],
    inputs: { price: [0, 100] },
    sort: "newest",
    currentPage: 1,
  });
  const [gridcolumns, setGridColumns] = useState(GRID_COLUMN.GRID_3);
  const [walkThru, setWalkThru] = useState(false);
  const [effect, setEffect] = useState(NFT_EFFECT.CARD_FLIP);
  const [categories, setCategories] = useState({});
  const [levels, setLevels] = useState([]);
  const [tap, setTap] = useState(1);

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

  /* Pagination logic start */
  // const numberOfPages = Math.ceil(state.allProducts.length / POSTS_PER_PAGE);
  // const paginationHandler = (page) => {
  //   dispatch({ type: "SET_PAGE", payload: page });
  //   const start = (page - 1) * POSTS_PER_PAGE;
  //   dispatch({
  //     type: "SET_PRODUCTS",
  //     payload: state.allProducts.slice(start, start + POSTS_PER_PAGE),
  //   });
  //   document
  //     .getElementById("explore-id")
  //     .scrollIntoView({ behavior: "smooth" });
  // };
  /* Pagination logic end */

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

  /* Sorting logic end */

  /* Filter logic start */

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

  const handleColumns = useCallback((val) => {
    setGridColumns(val);
  }, []);

  const handleWalk = useCallback(() => {
    setWalkThru(true);
    document.body.classList.add('walk_mode');
  }, []);

  const handleEffect = useCallback((val) => {
    setEffect(val);
  }, []);

  const handleClose = useCallback(() => {
    setWalkThru(false);
    document.body.classList.remove('walk_mode');
  }, []);

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
        .scrollIntoView({ behavior: "smooth" });
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
        "explore-area",
        className
      )}
      id="explore-id"
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {section_title && (
              <SectionTitle disableAnimation {...section_title} />
            )}
          </div>
        </div>
        <div className="row g-5">
          <div className={clsx("rn-authore-profile-area", className)}>
            <TabContainer defaultActiveKey="nav-auction">
              <StickyContainer>
                <div className="container-fluid">
                  <div style={{ position: 'relative', zIndex: '99' }}>
                    <Sticky topOffset={-55}>
                      {({ style }) => {
                        return (
                          <div className="row author_header" style={{ ...style, top: '55px' }}>
                            <div className="col-12">
                              <div className="tab-wrapper-one">
                                <nav className="tab-button-one">
                                  <Nav
                                    className="nav nav-tabs"
                                    id="nav-tab"
                                    role="tablist"
                                  >
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-collections"
                                      onClick={() => setTap(0)}
                                    >
                                      Collections
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-auction"
                                      onClick={() => setTap(1)}
                                    >
                                      Auction
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-home"
                                      onClick={() => setTap(2)}
                                    >
                                      On Sale
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-profile"
                                      onClick={() => setTap(3)}
                                    >
                                      Owned
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-contact"
                                      onClick={() => setTap(4)}
                                    >
                                      Created
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-liked"
                                      onClick={() => setTap(5)}
                                    >
                                      Liked
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-activity"
                                      onClick={() => setTap(6)}
                                    >
                                      Activity
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-games"
                                      onClick={() => setTap(7)}
                                    >
                                      Games
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-comingsoon"
                                      onClick={() => setTap(8)}
                                    >
                                      Coming Soon
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      eventKey="nav-comingsoon"
                                    >
                                      Music Option
                                    </Nav.Link>
                                    <Nav.Link
                                      as="button"
                                      className="more_options"
                                    >
                                      <span>More Options</span>
                                      <span className="premium_badge">
                                        <Image
                                          src="/images/icons/premium.png"
                                          alt="premuim"
                                          width={30}
                                          height={30}
                                        />
                                      </span>
                                      <div className="more_options_list">
                                        <ul>
                                          {/* <li onClick={() => handleColumns(GRID_COLUMN.GRID_3)}>
                                            {gridcolumns === GRID_COLUMN.GRID_3 && <FiCheck />}
                                            <span>3 Columns</span>
                                          </li>
                                          <li onClick={() => handleColumns(GRID_COLUMN.GRID_4)}>
                                            {gridcolumns === GRID_COLUMN.GRID_4 && <FiCheck />}
                                            <span>4 Columns</span>
                                          </li>
                                          <li onClick={() => handleColumns(GRID_COLUMN.GRID_5)}>
                                            {gridcolumns === GRID_COLUMN.GRID_5 && <FiCheck />}
                                            <span>5 Columns</span>
                                          </li>
                                          <li onClick={() => handleColumns(GRID_COLUMN.GRID_6)}>
                                            {gridcolumns === GRID_COLUMN.GRID_6 && <FiCheck />}
                                            <span>6 Columns</span>
                                          </li>
                                          <hr className="mt--5 mb--5 mr--10 ml--10" /> */}
                                          <li onClick={() => handleEffect(NFT_EFFECT.NO_EFFECT)}>
                                            {effect === NFT_EFFECT.NO_EFFECT && <FiCheck />}
                                            <span>No Effect</span>
                                          </li>
                                          <li onClick={() => handleEffect(NFT_EFFECT.CARD_FLIP)}>
                                            {effect === NFT_EFFECT.CARD_FLIP && <FiCheck />}
                                            <span>Card Flip</span>
                                          </li>
                                          <li onClick={() => handleEffect(NFT_EFFECT.WRAP_VIEW)}>
                                            {effect === NFT_EFFECT.WRAP_VIEW && <FiCheck />}
                                            <span>Warp View</span>
                                          </li>
                                          <hr className="mt--5 mb--5 mr--10 ml--10" />
                                          <li onClick={handleWalk}>
                                            <span>Walk Through</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </Nav.Link>
                                  </Nav>
                                </nav>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </Sticky>
                  </div>
                  <div className="author-explorer">
                    <ProductFilter
                      contact={true}
                      sortHandler={sortHandler}
                      inputs={state.inputs}
                      sort={state.sort}
                      categories={categories}
                      levels={levels}
                      filterHandler={filterHandler}
                      priceHandler={priceHandler}
                    />
                    <Container tap={tap} columns={gridcolumns} effect={effect} products={onSaleProducts.current} />
                  </div>
                </div>
              </StickyContainer>

            </TabContainer>
            {walkThru && (
              <div className="walk_thru_container">
                <iframe
                  title="Walk Through"
                  src={'http://95.216.85.81:9966'}
                  className="walk_thru"
                ></iframe>
                <div className="walk_close" onClick={handleClose}>
                  <SlClose size="40px" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ExploreProductArea.propTypes = {
  className: PropTypes.string,
  space: PropTypes.oneOf([1, 2]),
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
