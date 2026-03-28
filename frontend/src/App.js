import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Gallery from "@/pages/Gallery";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grain-overlay">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/uslugi" element={<Services />} />
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
  );
}

export default App;
