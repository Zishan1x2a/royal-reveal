import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SceneOpeningAnimation from "./SceneOpeningAnimation";
import SceneWelcome from "./SceneWelcome";
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
  const [useDoor, setUseDoor] = useState(false);
  const [guestName, setGuestName] = useState("Guest");

  const goToNext = useCallback(() => {
    const idx = SCENES.indexOf(currentScene);
    if (idx < SCENES.length - 1) {
      const isWelcome = currentScene === "welcome";
      setUseDoor(isWelcome);

      if (isWelcome) {
        // Door transition only for welcome -> hero
        setDoorsClosed(true);
        setTimeout(() => {
          setCurrentScene(SCENES[idx + 1]);
          setDoorsClosed(false);
        }, 600);
      } else {
        // Petal shower for all other transitions
        setShowPetals(true);
        setCurrentScene(SCENES[idx + 1]);
        setTimeout(() => setShowPetals(false), 8000);
      }
    }
  }, [currentScene]);

  const handleOpeningComplete = useCallback(() => setShowOpening(false), []);

  const renderScene = () => {
    const props = { onNext: goToNext };
    switch (currentScene) {
      case "welcome": return <SceneWelcome {...props} guestName={guestName} onGuestNameChange={setGuestName} />;
      case "hero": return <SceneHero {...props} />;
      case "events": return <SceneEvents {...props} />;
      case "family": return <SceneFamily {...props} />;
      case "gallery": return <SceneGallery {...props} />;
      case "countdown": return <SceneCountdown {...props} />;
      case "rsvp": return <SceneRSVP guestName={guestName} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      {showOpening && <SceneOpeningAnimation onComplete={handleOpeningComplete} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          className={currentScene === "welcome" ? "h-screen overflow-hidden" : "h-screen overflow-y-auto"}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      {useDoor && <DoorTransition isOpen={!doorsClosed} />}
      {showPetals && <PetalOverlay count={25} />}
    </div>
  );
};

export default WeddingApp;
