import { Fragment } from "react";
// import BgHomepage from "../assets/images/Rent-mo-hero-bg.png";
import Navbar from "../components/NavBar";
import SearchHero from "../components/SearchHero";
// import SearchHeroModal from "../components/SearchHeroModal";
import {
  SearchFormData,
  useServiceCarContext,
} from "../../contexts/ServiceCarContext";
import { useRouter } from "next/navigation";

//import '../layout.css';

const HeroPage = () => {
  const router = useRouter();

  // const [showSearchHero, setShowSearchHero] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  const { searchListing } = useServiceCarContext();

  // useEffect(() => {
  //   // Check if the screen size is below a certain width (e.g., 768px for mobile devices)
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 767);
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const handleFindRide = async (searchFormData: SearchFormData) => {
    // Implement the logic for finding a ride based on the form data
    // setFormData(formData);
    // console.log("Finding a ride with form data:", formData);
    await searchListing(searchFormData);

    router.push("/search");
  };

  // const handleClick = () => {
  //   // Handle click event for mobile devices
  //   setShowSearchHero(true);
  // };

  return (
    <div className="bg-black bg-cover pb-12 max-h-100 font-Messina-Sans hero-page-search-bg">
      <>
        <Navbar />
        <div className="">
          <div className="container mx-auto flex flex-col items-center lg:pt-12 xl:pt-9 pt-6">
            <div className="flex justify-center items-center"></div>
          </div>
        </div>
        <Fragment>
          <div className="search-modal-btn text-center">
            {/* <div
              className={`${isMobile && "hidden"}`}
              // onClick={ ? handleClick : undefined}
            > */}
            <SearchHero onFindRide={handleFindRide} />
            {/* </div> */}

            {/* <button
              className={`text-black rounded-full w-44 h-16 bg-yellow-300 font-bold text-xl shadow-md hover:shadow-buttonbox transition ${
                !isMobile && "hidden"
              }`}
              onClick={isMobile ? handleClick : undefined}
            >
              Find a ride
            </button> */}

            {/* <SearchHeroModal
              isvisible={showSearchHero}
              onClose={() => setShowSearchHero(false)}
            /> */}
          </div>
        </Fragment>
      </>

      {/* Code block ends */}
    </div>
  );
};

export default HeroPage;
