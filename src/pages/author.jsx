import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import AuthorIntroArea from "@containers/author-intro";
import AuthorProfileArea from "@containers/author-profile";
import ExploreProductArea from "@containers/explore-product/layout-10";

// Demo data
import authorData from "../data/author.json";
import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Author = () => (
    <Wrapper>
        <SEO pageTitle="Author" />
        <Header />
        <main id="main-content">
            <AuthorIntroArea data={authorData} />
            <ExploreProductArea
                data={{
                    products: productData,
                }}
            />
            {/* <AuthorProfileArea data={{ products: productData }} /> */}
        </main>
        <Footer />
    </Wrapper>
);

export default Author;
