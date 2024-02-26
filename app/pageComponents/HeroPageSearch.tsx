// React
import { useRouter } from "next/navigation";

// useContext
import { useServiceCarContext } from "../../contexts/ServiceCarContext";

// Custom Components
import Navbar from "../../components/common/NavBar";
import SearchHero from "../components/SearchHero";

// Types
import { SearchFormData } from "@/types/searchCar";

const HeroPage = () => {
  const router = useRouter();

  const { setSearchLoading } = useServiceCarContext();

  const handleFindRide = async (searchFormData: SearchFormData) => {
    await setSearchLoading(true);
    const encodedSearch = encodeURIComponent(JSON.stringify(searchFormData));

    await router.push(`/search?data=${encodedSearch}`);
  };

  return (
    <div className="bg-black bg-cover pb-12 max-h-100 font-Messina-Sans hero-page-search-bg">
      <Navbar />
      <div className="search-modal-btn text-center">
        <SearchHero onFindRide={handleFindRide} />
      </div>
    </div>
  );
};

export default HeroPage;
