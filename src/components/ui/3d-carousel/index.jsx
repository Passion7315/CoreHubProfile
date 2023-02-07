import React from "react";
import Image from "next/image";
import ClientAvatar from "@ui/client-avatar";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

export default class Carousel extends React.Component {
    constructor(props) {
        super(props)
        const items = this.props.items;
        items.forEach((item, index) => {
            item._id = index;
        });
        this.state = {
            items: this.props.items,
            active: this.props.active,
        }

        this.rightClick = this.moveRight.bind(this)
        this.leftClick = this.moveLeft.bind(this)
    }

    componentDidMount() {
        this.timer = setInterval(this.leftClick, 5000);
    }

    generateItems() {
        var items = []
        var level
        for (var i = this.state.active - 3; i < this.state.active + 4; i++) {
            var index = i
            if (i < 0) {
                index = this.state.items.length + i
            } else if (i >= this.state.items.length) {
                index = i % this.state.items.length
            }
            level = this.state.active - i
            items.push(<Item key={index} item={this.state.items[index]} level={level} />)
        }
        return items
    }

    moveTo(index) {
        this.setState({
            active: index
        })
    }

    moveLeft() {
        // var newActive = this.state.active
        // newActive--
        // this.setState({
        //     active: newActive < 0 ? this.state.items.length - 1 : newActive,
        // })
    }

    moveRight() {
        // var newActive = this.state.active
        // this.setState({
        //     active: (newActive + 1) % this.state.items.length,
        // })
    }

    render() {
        return (
            <div id="carousel" className="noselect">
                <div className="arrow arrow-left" onClick={this.leftClick}>
                    <MdOutlineArrowBackIos />
                </div>
                {this.generateItems()}
                <div className="arrow arrow-right" onClick={this.rightClick}>
                    <MdOutlineArrowForwardIos />
                </div>
            </div>
        )
    }
}

class Item extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            level: this.props.level,
            item: this.props.item
        }
    }

    render() {
        const className = 'item level' + this.props.level
        const item = this.state.item;
        return (
            <div className={className}>
                <Image
                    src={item.images[0].src}
                    alt={item.title}
                    width={430}
                    height={430}
                />
                <div className="item_footer">
                    <div className="item_description">
                        <span className="item_title">
                            {item.title}
                        </span>
                        <div className="item_owner">
                            <ClientAvatar
                                key={item.owner.name}
                                slug={item.owner.slug}
                                name={item.owner.name}
                                image={item.owner.image}
                            />
                            <span className="owner_name">
                                {item.owner.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}