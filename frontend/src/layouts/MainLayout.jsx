import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;