import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Particles from './components/Particles';
import Hyperspeed from './components/Hyperspeed';

const hyperspeedOptions = {
  distortion: 'turbulentDistortion' as const,
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5] as [number, number],
  lightStickHeight: [1.3, 1.7] as [number, number],
  movingAwaySpeed: [60, 80] as [number, number],
  movingCloserSpeed: [-120, -160] as [number, number],
  carLightsLength: [12, 80] as [number, number],
  carLightsRadius: [0.05, 0.14] as [number, number],
  carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.8, 0.8] as [number, number],
  carFloorSeparation: [0, 5] as [number, number],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xFFFFFF,
    brokenLines: 0xFFFFFF,
    leftCars: [0xF59E0B, 0xEAB308, 0xF97316],
    rightCars: [0xF59E0B, 0xEAB308, 0xF97316],
    sticks: 0xF59E0B,
  }
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark font-kanit">
        {/* Global Particles background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <Particles
            particleCount={100}
            particleSpread={10}
            speed={0.08}
            particleColors={['#ffffff']}
            moveParticlesOnHover={true}
            particleHoverFactor={0.3}
            alphaParticles={true}
            particleBaseSize={40}
            sizeRandomness={0.8}
            cameraDistance={30}
            disableRotation={false}
            pixelRatio={1}
          />
        </div>


        {/* Global Hyperspeed tunnel background — spans all sections */}
        <div className="fixed inset-0 pointer-events-none z-[2] opacity-20 md:opacity-30">
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>
        <Navbar />
        <main className="relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
