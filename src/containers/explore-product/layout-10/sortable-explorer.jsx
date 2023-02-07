import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Product from "@components/product/layout-01";

const SortableItem = (({ item, effect }) => {
  return (
    <div className="grid-item">
      <Product
        overlay
        placeBid
        effect={effect}
        index={item.id}
        title={item.title}
        slug={item.slug}
        latestBid={item.latestBid}
        price={item.price}
        likeCount={item.likeCount}
        auction_date={item.auction_date}
        image={item.images?.[0]}
        authors={item.authors}
        bitCount={item.bitCount}
      />
    </div >
  );
});
const SortableList = (({ effect, view, items, setItems }) => {
  useEffect(() => {
    document.querySelector('.grid-container').style.setProperty('--grid-column-count', parseInt(view));
  }, [view])
  return (
    <ReactSortable 
      className="grid-container"
      list={items} 
      setList={setItems}
      delayOnTouchOnly={true}
      animation={200}
      delay={2}
    >
      {items.map((item, index) => (
        <SortableItem key={item.id} index={index} item={item} effect={effect} />
      ))}
    </ReactSortable>
  );
});

const SortableExplorer = ({ view, effect, products }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      setItems(products);
    }
  }, [products]);

  return (
    <SortableList
      effect={effect}
      view={view}
      items={items}
      setItems={setItems}      
    />
  );
};

export default SortableExplorer;
