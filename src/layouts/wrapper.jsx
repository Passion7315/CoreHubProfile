import PropTypes from "prop-types";
import ScrollToTop from "@ui/scroll-to-top";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }) => (
    <>
        {children}
        <ScrollToTop />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
        />
    </>
);

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;
