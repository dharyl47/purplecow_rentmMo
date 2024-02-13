import { Fragment, useEffect, useState } from "react";
import BgHomepage from "../assets/images/Rent-mo-hero-bg.png";
import Navbar from "../components/NavBar";
import SearchHero, {
  FormData as SearchHeroProps,
} from "../components/SearchHero";
import SearchHeroMob from "../components/SearchHeroMob";
import { useServiceCarContext } from "../context/ServiceCarContext";
import { useRouter } from "next/navigation";

//import '../layout.css';

const HeroPage = () => {
  const router = useRouter();

  const [showSearchHero, setShowSearchHero] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { searchListing } = useServiceCarContext();

  useEffect(() => {
    // Check if the screen size is below a certain width (e.g., 768px for mobile devices)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFindRide = async (formData: SearchHeroProps) => {
    // Implement the logic for finding a ride based on the form data
    // setFormData(formData);
    // console.log("Finding a ride with form data:", formData);
    await searchListing(formData);

    router.push("/search");
  };

  const handleClick = () => {
    // Handle click event for mobile devices
    setShowSearchHero(true);
  };

  const carAvailability = {
    startDate: new Date(),
    endDate: new Date(),
  };

  const city = "Davao city";

  return (
    <div className="bg-black bg-cover pb-12 max-h-100 font-Messina-Sans hero-page-search-bg">
      {/* Code block starts */}
      <>
        <Navbar />
        <div className="">
          <div className="container mx-auto flex flex-col items-center lg:pt-12 xl:pt-9 pt-6">
            <div className="flex justify-center items-center"></div>
          </div>
        </div>
        <Fragment>
          <div className="search-modal-btn text-center">
            <button
              className="text-white text-xl"
              onClick={isMobile ? handleClick : undefined}
            >
              <SearchHero
                carAvailability={carAvailability}
                city={city}
                onFindRide={handleFindRide}
              />
              {/* <SearchHero 
              carAvailability={{
                startDate: new Date(),
                endDate: new Date()
              }} city={''} 
              
              onFindRide={function (formData: FormData): void {
                throw new Error('Function not implemented.');
              } }
              /> */}
            </button>
            <SearchHeroMob
              isvisible={showSearchHero}
              onClose={() => setShowSearchHero(false)}
            />
          </div>
        </Fragment>
      </>

      {/* Code block ends */}
    </div>
  );
};

export default HeroPage;
