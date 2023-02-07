import React from 'react';
import Product from "@components/product/layout-02";
import { motion } from "framer-motion";

const Container = ({ products, placeBid }) => {
    return (
        <motion.div layout className="isotope-list item-4">
            {products?.slice(0, 10)?.map((prod) => (
                <motion.div
                    key={prod.id}
                    layout
                >
                    <Product
                        placeBid={true}
                        title={prod.title}
                        slug={prod.slug}
                        latestBid={prod.latestBid}
                        price={prod.price}
                        likeCount={prod.likeCount}
                        image={prod.images?.[0]}
                        authors={prod.authors}
                        bitCount={prod.bitCount}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}

export default Container;