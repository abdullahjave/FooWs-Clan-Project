import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MembersProvider } from './context/MembersContext';
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
import LeadersPanel from './pages/LeadersPanel';

function App() {
  return (
    <MembersProvider>
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
              <Route path="/leaders-panel" element={<LeadersPanel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MembersProvider>
  );
}

export default App;

