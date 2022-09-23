import { useState } from "react";

const SlowComponent: React.FC<{
  content?: { toDisplay?: string; id?: number };
}> = ({ content }) => {
  console.log(`SlowComponent ${content?.id ?? ""} is rendering`);
  return <div>{`SlowComponent ${content?.toDisplay ?? ""}`}</div>;
};

// Re-Render inutiles
// Cas 1
export const Cas1: React.FC = () => {
  const [shouldDisplayExtraText, setShouldDisplayExtraText] = useState(false);
  return (
    <>
      <div>
        <label>{"Affichage texte supplémentaire"}</label>
        <input
          type="checkbox"
          onClick={() => setShouldDisplayExtraText(!shouldDisplayExtraText)}
          checked={shouldDisplayExtraText}
        ></input>
      </div>
      <SlowComponent content={{}} />
      {shouldDisplayExtraText && (
        <div>{"Voici le texte supplémentaire: abracadabra !!!"}</div>
      )}
    </>
  );
};

// Cas 2
export const Cas2: React.FC = () => {
  const [shouldDisplayExtraText, setShouldDisplayExtraText] = useState(false);
  return (
    <>
      <div>
        <label>{"Affichage texte supplémentaire"}</label>
        <input
          type="checkbox"
          onClick={() => setShouldDisplayExtraText(!shouldDisplayExtraText)}
          checked={shouldDisplayExtraText}
        ></input>
      </div>
      <SlowComponent content={{ toDisplay: "contenu" }} />
      {shouldDisplayExtraText && (
        <div>{"Voici le texte supplémentaire: abracadabra !!!"}</div>
      )}
    </>
  );
};

// Cas 3
const FakeModal: React.FC = () => {
  return <div>{"Empty Modal"}</div>;
};
export const Cas3: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <label>
        {
          "Afficher fausse modale (il faut utiliser son imagination a partir de maintenant)"
        }
      </label>
      <input
        type="checkbox"
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        checked={isDialogOpen}
      ></input>
      {isDialogOpen && <FakeModal />}
      <SlowComponent content={{ toDisplay: "contenu" }} />
    </>
  );
};

// Cas 4
export const Cas4: React.FC = () => {
  const [mouseXPosition, setXMousePosition] = useState(0);
  return (
    <>
      <div
        onMouseMove={(e) => {
          setXMousePosition(e.clientX);
        }}
        style={{ height: "100vh" }}
      >
        <div>{mouseXPosition}</div>
        <SlowComponent />
      </div>
    </>
  );
};
