import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-01";
import Product from "@components/product/layout-01";
import NewCarousel from "@ui/3d-carousel";
import { SectionTitleType, ProductType } from "@utils/types";

const ExCarousel = ({ data, className, space }) => (
    <div
        className={clsx(
            "rn-live-bidding-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container px--10">
            {/* {data?.section_title && (
                <div className="row mb--50">
                    <div className="col-lg-12">
                        <SectionTitle {...data.section_title} />
                    </div>
                </div>
            )} */}
            {data?.products && (
                <div className="row">
                    <div className="col-lg-12 position-relative">
                        <NewCarousel items={data.products} active={0}/>
                    </div>
                </div>
            )}
        </div>
    </div>
);

ExCarousel.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType).isRequired,
        placeBid: PropTypes.bool,
    }),
};

ExCarousel.defaultProps = {
    space: 1,
};

export default ExCarousel;
