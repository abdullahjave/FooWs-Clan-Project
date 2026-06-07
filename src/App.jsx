import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Leadership from './pages/Leadership';
import Members from './pages/Members';
import ClanWars from './pages/ClanWars';
import CustomMaps from './pages/CustomMaps';
import JoinClan from './pages/JoinClan';
import Download from './pages/Download';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/members" element={<Members />} />
            <Route path="/clan-wars" element={<ClanWars />} />
            <Route path="/custom-maps" element={<CustomMaps />} />
            <Route path="/join" element={<JoinClan />} />
            <Route path="/download" element={<Download />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
