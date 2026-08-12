import { useStore } from "../context/StoreContext";
import Hero from "../components/Hero";
import AppGrid from "../components/AppGrid";
import ComingSoon from "../components/ComingSoon";
import Footer from "../components/Footer";

// ==================== HOME PAGE ====================

const HomePage = () => {
  const { downloadCounts } = useStore();

  const totalDownloads = Object.values(downloadCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="home-page">
      <Hero totalApps={8} totalDownloads={totalDownloads} />
      <AppGrid />
      <ComingSoon />
      <Footer />
    </div>
  );
};

export default HomePage;