
//import Footer from './footer';
import './home.css';
import Navigation from './Navbar';
import About from './About';

const Home = () => {
    return (
        <div className='bg'>
        <div className='justtesting' >
            <><Navigation /></>
            <div className="hero">
                <div className="hero-content">
                    <h1>SmartLearnHub</h1>
                    <p>
                        Explore courses, track your progress, and enhance your learning experience
                    </p>

                </div>

            </div>

        </div>
        <><About/></></div>


    );
}

export default Home;