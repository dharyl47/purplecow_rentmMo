import BgHomepage from '../assets/images/Rent-mo-hero-bg.png';
import Navbar from '../components/NavBar';
import SearchHero from '../components/SearchHero';
//import '../layout.css';

const HeroPage = () => {
	return (
    <div className="bg-black bg-cover pb-12 max-h-100 font-Messina-Sans">
      {/* Code block starts */}
      <>
        <Navbar />
        <div className="">
          <div className="container mx-auto flex flex-col items-center lg:pt-12 xl:pt-9 pt-6">
            
            <div className="flex justify-center items-center"></div>
          </div>
        </div>
        <SearchHero />
      </>

      {/* Code block ends */}
    </div>
  );
};

export default HeroPage;
