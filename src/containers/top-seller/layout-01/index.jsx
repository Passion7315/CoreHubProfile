import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import TopSeller from "@components/top-seller/layout-01";
import NiceSelect from "@ui/nice-select";
import { SectionTitleType, SellerType } from "@utils/types";
import { slugify } from "@utils/methods";

const TopSellerArea = ({ className, space, id, data }) => {
    const [current, setCurrent] = useState("1 day");
    const [sellers, setSellers] = useState([]);
    const changeHandler = (item) => {
        setCurrent(item.value);
    };

    const filterHandler = useCallback(() => {
        const allSellers = data.sellers;
        const filterdSellers = allSellers.filter(
            (seller) => slugify(seller.top_since) === slugify(current)
        );
        setSellers(filterdSellers);
    }, [current, data.sellers]);

    useEffect(() => {
        filterHandler();
    }, [filterHandler]);

    return (
        <div
            className={clsx(
                "rn-top-top-seller-area nice-selector-transparent",
                space === 1 && "rn-section-gapTop",
                space === 2 && "rn-section-gapBottom",
                space === 3 && "pt--50",
                className
            )}
            id={id}
        >
            <div className="container pl--40">
                <div className="row  mb--10">
                    <div className="col-12 justify-sm-center d-flex">
                        {data?.section_title && (
                            <SectionTitle {...data.section_title} />
                        )}
                        <NiceSelect
                            options={[
                                { value: "1 day", text: "1 day" },
                                { value: "7 Day", text: "7 Day" },
                                { value: "15 Day", text: "15 Day" },
                                { value: "30 Day", text: "30 Day" },
                            ]}
                            defaultCurrent={0}
                            name="sellerSort"
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row justify-sm-center g-3 top-seller-list-wrapper">
                    {sellers.map((seller) => (
                        <div
                            key={seller.id}
                            className="col-9 col-lg-6 col-md-6 col-sm-6 top-seller-list"
                        >
                            <TopSeller
                                name={seller.name}
                                total_sale={seller.total_sale}
                                slug={seller.slug}
                                image={seller.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

TopSellerArea.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    space: PropTypes.oneOf([1, 2, 3]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        sellers: PropTypes.arrayOf(SellerType),
    }),
};

TopSellerArea.defaultProps = {
    space: 1,
};

export default TopSellerArea;
