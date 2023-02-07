import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import Carosuel from "@ui/carousel";
import { HeadingType, TextType, ButtonType, ImageType } from "@utils/types";
import CollectionData from '../../data/collections.json';

const HeroArea = ({ data }) => (
  <div className="slider-one mt--40">
    <div className="container">
      {
        CollectionData.length > 0 && (
          <Carosuel dots={false} items={1} loop={true} autoplay={true} autoplaySpeed={500}>
            {
              CollectionData.map(item => (
                <div className="d-flex justify-content-evenly" key={item.id}>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="slide-disc">
                      {item.title}
                    </p>
                    <div className="explore_collection btn btn-primary">
                      <Link href="/collection">
                        Explore Collection
                      </Link>
                    </div>
                  </div>
                  <div className="slider-thumbnail">
                    <Image
                      src={item.image.src}
                      alt={"Slider Images"}
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
              ))
            }
          </Carosuel>
        )
      }
    </div>
  </div>
);

HeroArea.propTypes = {
  data: PropTypes.shape({
    headings: PropTypes.arrayOf(HeadingType),
    texts: PropTypes.arrayOf(TextType),
    buttons: PropTypes.arrayOf(ButtonType),
    images: PropTypes.arrayOf(ImageType),
  }),
};

export default HeroArea;
