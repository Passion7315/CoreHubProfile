import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Collection from "@components/collection";

const SortableItem = (({ collection, effect }) => {
    return (
        <div className="grid-item">
            <div className="product-card">
                <Collection
                    title={collection.title}
                    total_item={collection.total_item}
                    path={collection.slug}
                    image={collection.image}
                    thumbnails={collection.thumbnails}
                    profile_image={collection.profile_image}
                />
            </div>
        </div >
    );
});
const SortableList = (({ view, effect, collections, setItems }) => {
    useEffect(() => {
        document.querySelector('.grid-container').style.setProperty('--grid-column-count', parseInt(view));
      }, [view])
    return (
        <ReactSortable
            className="grid-container"
            list={collections}
            setList={setItems}
            delayOnTouchOnly={true}
            animation={200}
            delay={2}
        >
            {collections.map((collection, index) => (
                <SortableItem key={collection.id} index={index} collection={collection} effect={effect} />
            ))}
        </ReactSortable>
    );
});

const CollectSortableExplorer = ({ view, effect, collections }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (collections && collections.length > 0) {
            setItems(collections);
        }
    }, [collections]);

    return (
        <SortableList
            effect={effect}
            view={view}
            collections={items}
            setItems={setItems}
        />
    );
};

export default CollectSortableExplorer;
