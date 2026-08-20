import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Gallery from "@/pages/Gallery";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import ServiceDetail from "@/pages/ServiceDetail";
import DepilacjaLaserowa from "@/pages/DepilacjaLaserowa";
import DepilacjaStrefa from "@/pages/DepilacjaStrefa";
import Admin from "@/pages/Admin";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HelmetProvider>
      <div className="grain-overlay">
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/uslugi" element={<Services />} />
                  <Route path="/uslugi/depilacja-laserowa" element={<DepilacjaLaserowa />} />
                  <Route path="/uslugi/depilacja-laserowa/:strefa" element={<DepilacjaStrefa />} />
                  <Route path="/uslugi/:slug" element={<ServiceDetail />} />
                  <Route path="/o-nas" element={<About />} />
                  <Route path="/galeria" element={<Gallery />} />
                  <Route path="/opinie" element={<Reviews />} />
                  <Route path="/kontakt" element={<Contact />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
