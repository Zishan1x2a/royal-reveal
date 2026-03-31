import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SceneOpeningAnimation from "./SceneOpeningAnimation";
import SceneWelcome from "./SceneWelcome";
import SceneEntrance from "./SceneEntrance";
import SceneHero from "./SceneHero";
import SceneEvents from "./SceneEvents";
import SceneFamily from "./SceneFamily";
import SceneGallery from "./SceneGallery";
import SceneCountdown from "./SceneCountdown";
import SceneRSVP from "./SceneRSVP";
import DoorTransition from "./DoorTransition";
import PetalOverlay from "./PetalOverlay";

const SCENES = [
  "welcome",
  "entrance",
  "hero",
  "events",
  "family",
  "gallery",
  "countdown",
  "rsvp",
] as const;

type Scene = (typeof SCENES)[number];

const WeddingApp = () => {
  const [showOpening, setShowOpening] = useState(true);
  const [currentScene, setCurrentScene] = useState<Scene>("welcome");
  const [doorsClosed, setDoorsClosed] = useState(false);
  const [showPetals, setShowPetals] = useState(false);

  const goToNext = useCallback(() => {
    const idx = SCENES.indexOf(currentScene);
    if (idx < SCENES.length - 1) {
      setDoorsClosed(true);
      setShowPetals(true);
      setTimeout(() => {
        setCurrentScene(SCENES[idx + 1]);
        setDoorsClosed(false);
      }, 600);
      setTimeout(() => setShowPetals(false), 3000);
    }
  }, [currentScene]);

  const handleOpeningComplete = useCallback(() => setShowOpening(false), []);

  const renderScene = () => {
    const props = { onNext: goToNext };
    switch (currentScene) {
      case "welcome": return <SceneWelcome {...props} />;
      case "entrance": return <SceneEntrance {...props} />;
      case "hero": return <SceneHero {...props} />;
      case "events": return <SceneEvents {...props} />;
      case "family": return <SceneFamily {...props} />;
      case "gallery": return <SceneGallery {...props} />;
      case "countdown": return <SceneCountdown {...props} />;
      case "rsvp": return <SceneRSVP />;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {showOpening && <SceneOpeningAnimation onComplete={handleOpeningComplete} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      <DoorTransition isOpen={!doorsClosed} />
      {showPetals && <PetalOverlay count={20} />}
    </div>
  );
};

export default WeddingApp;
