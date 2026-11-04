import { useEffect, lazy, Suspense } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import NotFound from "@/pages/NotFound";

// Panel ładowany osobno: odwiedzający strony publiczne nie pobierają jego kodu.
const Admin = lazy(() => import("@/pages/Admin"));

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HelmetProvider>
      <div className="grain-overlay">
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<Suspense fallback={null}><Admin /></Suspense>} />
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/uslugi" element={<Services />} />
                  <Route path="/uslugi/depilacja-laserowa" element={<DepilacjaLaserowa />} />
                  <Route path="/uslugi/depilacja-laserowa/:strefa" element={<DepilacjaStrefa />} />
                  {/* Zabiegów na twarz salon nie wykonuje — tak jak nginx (301), klient też prowadzi do cennika. */}
                  <Route path="/uslugi/zabiegi-na-twarz" element={<Navigate to="/uslugi" replace />} />
                  <Route path="/uslugi/:slug" element={<ServiceDetail />} />
                  <Route path="/o-nas" element={<About />} />
                  <Route path="/galeria" element={<Gallery />} />
                  <Route path="/opinie" element={<Reviews />} />
                  <Route path="/kontakt" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
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
