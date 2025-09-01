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
      className="app font-sans  bg-white"
      style={{ color: `${AMERICAN_PURPLE}` }}
    >
      <div
        className="flex flex-col py-10 border-r-4 gap-5 "
        style={{ borderColor: `${PLUM}` }}
      >
        <h2
          className=" pb-3 border-b-4 w-64 px-5"
          style={{ borderColor: `${PLUM}` }}
        >
          <img src={WitchLogo} alt="Witch logo" />
        </h2>
        <button
          onClick={() => setView("notes")}
          className="pb-5 border-b-4 text-lg"
          style={{ borderColor: `${PLUM}` }}
        >
          Notes
        </button>
        <button
          onClick={() => setView("dictionary")}
          className="pb-5 border-b-4 text-lg"
          style={{ borderColor: `${PLUM}` }}
        >
          Dictionary
        </button>
        <button
          onClick={() => setView("related")}
          className="pb-5 border-b-4 text-lg"
          style={{ borderColor: `${PLUM}` }}
        >
          Groups
        </button>
      </div>
      <div className="flex flex-col py-[51px] w-full">
        {currentView === "notes" && <NotesView />}
        {currentView === "dictionary" && <DictionaryView />}
        {currentView === "related" && <RelatedGroupsView />}
      </div>
    </div>
  );
}
