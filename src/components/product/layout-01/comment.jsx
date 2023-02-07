import ClientAvatar from "@ui/client-avatar";
import clsx from "clsx";
import { Scrollbar } from "react-scrollbars-custom";
import { BsArrowReturnLeft } from "react-icons/bs";

const Comment = ({
    show,
    authors,
    onReturn
}) => {
    return (
        <div className={clsx("product_comments", show ? '' : 'd-none')}>
            <Scrollbar autoHide style={{ height: "100%", overflowX: 'hidden' }}>
                <>
                    {authors?.map((author) => (
                        <div className="product_comment" key={author.name}>
                            <div className="comment_author">
                                <ClientAvatar
                                    slug={author.slug}
                                    name={author.name}
                                    image={author.image}
                                />
                                <span className="comment_time">12/1/2022 14:22</span>
                            </div>
                            <span
                                className="comment_text"
                            >
                                A component that allows for easy creation of menu items, quickly creating paragraphs of “Lorem Ipsum” and pictures with custom sizes.
                            </span>
                        </div>
                    ))}
                </>
            </Scrollbar>
            <div className="comment_return" onClick={onReturn}>
                <BsArrowReturnLeft size="20px" />
            </div>
        </div>
    )
}

export default Comment;