import { useEffect, useState } from "react";

const SlowComponent: React.FC<{
  content?: { toDisplay?: string; id?: number };
}> = ({ content }) => {
  const idToDisplay = content?.id ?? "";
  console.log(`SlowComponent ${idToDisplay} is rendering`);
  useEffect(() => {
    console.log(`SlowComponent ${idToDisplay} is mounting`);
    return () => console.log(`SlowComponent ${idToDisplay} is unmounting`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{`SlowComponent ${content?.toDisplay ?? ""}`}</div>;
};

// Mise a jour du DOM inutiles
// Cas 1
export const UselessDOMUpdate1: React.FC = () => {
  const [fakeState, setFakeState] = useState(true);

  const MySlowComponent: React.FC = () => <SlowComponent></SlowComponent>;
  return (
    <>
      <div>
        <button
          onClick={() => {
            setFakeState(!fakeState);
          }}
        >
          {"Re-render"}
        </button>
      </div>
      <MySlowComponent />
    </>
  );
};

// Cas 2
const Component1: React.FC = () => (
  <div>
    <span>{"Component1"}</span>
    <SlowComponent></SlowComponent>
  </div>
);
const Component2: React.FC = () => (
  <div>
    <span>{"Component2"}</span>
    <SlowComponent></SlowComponent>
  </div>
);
export const AlternatingChildren: React.FC = () => {
  const [shouldDisplayTrue, setShouldDisplayTrue] = useState(true);
  return (
    <>
      <button
        onClick={() => {
          setShouldDisplayTrue(!shouldDisplayTrue);
        }}
      >
        {"Change de composant"}
      </button>
      {shouldDisplayTrue ? <Component1 /> : <Component2 />}
    </>
  );
};

// Cas 3
export const ParentChanging: React.FC = () => {
  const [displayAsNavBar, setDisplayAsNavBar] = useState(true);
  return (
    <>
      <button
        onClick={() => {
          setDisplayAsNavBar(!displayAsNavBar);
        }}
      >
        {"Change le mode d'affichage"}
      </button>
      {displayAsNavBar ? (
        <nav>
          <SlowComponent />
        </nav>
      ) : (
        <menu>
          <SlowComponent />
        </menu>
      )}
    </>
  );
};

// Cas 4
const initialPages = [
  { pageNumber: 2, content: "Tata" },
  { pageNumber: 3, content: "Titi" },
];
const updatedPages = [
  { pageNumber: 1, content: "Toto" },
  { pageNumber: 2, content: "Tata" },
  { pageNumber: 3, content: "Titi" },
];
export const ListWithUpdate: React.FC = () => {
  const [pages, setPages] = useState(initialPages);
  return (
    <>
      <button
        onClick={() => {
          setPages(updatedPages);
        }}
      >
        {"Add pages"}
      </button>
      <div>
        {pages.map((page) => (
          <SlowComponent
            content={{ toDisplay: page.content, id: page.pageNumber }}
          />
        ))}
      </div>
    </>
  );
};
