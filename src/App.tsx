import { useEffect } from "react";

import "./styles/App.css";
import { useAppStore } from "./store/store";
import { DictionaryView } from "./view/DictionaryView";
import { RelatedGroupsView } from "./view/RelatedGroupsView";
import { NotesView } from "./view/notes/NotesView";

import WitchLogo from "./assets/witchlogo.png";
import { AMERICAN_PURPLE, PLUM, SPACE_CADET } from "./styles/colors";

export default function App() {
  const { load, currentView, setView } = useAppStore();

  useEffect(() => {
    console.log("Cargando datos");
    load();
  }, []);

  return (
    <div
      className="app font-sans  text-white"
      style={{ backgroundColor: `${AMERICAN_PURPLE}` }}
    >
      <div
        className="flex flex-col p-10 border-r-2 gap-5 shadow-md"
        style={{ borderColor: `${PLUM}` }}
      >
        <h2
          className=" pb-3 border-b-2 w-48 shadow-md"
          style={{ borderColor: `${PLUM}` }}
        >
          <img src={WitchLogo} alt="Witch logo" />
        </h2>
        <button
          onClick={() => setView("notes")}
          className="pb-5 border-b-2 shadow-md"
          style={{ borderColor: `${PLUM}` }}
        >
          Notes
        </button>
        <button
          onClick={() => setView("dictionary")}
          className="pb-5 border-b-2 shadow-md"
          style={{ borderColor: `${PLUM}` }}
        >
          Dictionary
        </button>
        <button
          onClick={() => setView("related")}
          className="pb-5 border-b-2 shadow-md"
          style={{ borderColor: `${PLUM}` }}
        >
          Groups
        </button>
      </div>
      <div className="flex flex-col p-10">
        {currentView === "notes" && <NotesView />}
        {currentView === "dictionary" && <DictionaryView />}
        {currentView === "related" && <RelatedGroupsView />}
      </div>
    </div>
  );
}
