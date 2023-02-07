import React, { useState } from 'react';
import { Scrollbar } from "react-scrollbars-custom";
import TabPane from "react-bootstrap/TabPane";
import TabContent from "react-bootstrap/TabContent";
import CollectionArea from "@containers/collection/layout-01";
import SortableExplorer from "./sortable-explorer";
import collections from "../../../data/collections.json";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

const valuetext = (value) => {
    return value;
}

const Container = ({ tap, effect, products }) => {
    const [view, setView] = useState(4);
    const handleChange = (newValue) => {
        setView(newValue);
    }
    return (
        <div className="author-container">
            <div className='d-flex justify-content-center mb--10'>
                <Slider
                    aria-label="View"
                    getAriaValueText={valuetext}
                    step={1}
                    defaultValue={4}
                    min={1}
                    max={6}
                    onChange={handleChange}
                    style={{ width: '400px'}}
                />
            </div>
            <Scrollbar autoHide style={{ height: "100vh" }}>
                <TabContent className="tab-content rn-bid-content">
                    <TabPane className="row g-5 d-flex w-100 ml--0 mr--0" eventKey="nav-collections">
                        {tap === 0 && (
                            <CollectionArea collections={collections} view={view} />
                        )}
                    </TabPane>
                    <TabPane className="row d-flex g-5 w-100 ml--0 mr--0" eventKey="nav-auction">
                        {tap === 1 && (
                            <SortableExplorer effect={effect} view={view} products={products} />
                        )}
                    </TabPane>
                    <TabPane className="row d-flex g-5 w-100 ml--0 mr--0" eventKey="nav-home">
                        {tap === 2 && (
                            <SortableExplorer effect={effect} view={view} products={products} />
                        )}
                    </TabPane>
                    <TabPane className="row g-5 d-flex w-100 ml--0 mr--0" eventKey="nav-profile">
                        {tap === 3 && (
                            <SortableExplorer effect={effect} view={view} products={products} />
                        )}
                    </TabPane>
                    <TabPane className="row g-5 d-flex w-100 ml--0 mr--0" eventKey="nav-contact">
                        {tap === 4 && (
                            <SortableExplorer effect={effect} view={view} products={products} />
                        )}
                    </TabPane>
                    <TabPane className="row g-5 d-flex w-100 ml--0 mr--0" eventKey="nav-liked">
                        {tap === 5 && (
                            <SortableExplorer effect={effect} view={view} products={products} />
                        )}
                    </TabPane>
                    <TabPane className="row g-5 d-flex w-100 ml--0 mr--0" eventKey="nav-activity">
                        {tap === 6 && (
                            <SortableExplorer effect={effect} view={view} products={products} />
                        )}
                    </TabPane>
                    <TabPane className="row g-5 d-flex w-100 ml--0 mr--0" eventKey="nav-games">
                    </TabPane>
                    <TabPane className="row g-5 d-flex w-100 ml--0 mr--0" eventKey="nav-comingsoon">
                    </TabPane>
                </TabContent>
            </Scrollbar>
        </div>
    )
}

export default Container;