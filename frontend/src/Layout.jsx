import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router';


/**
 * The root of the app, which renders the header, the page content given by
 * the route, and the footer.
 *
 * @returns {JSX.Element} The root element of the app.
 */
const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout