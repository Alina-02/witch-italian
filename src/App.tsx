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
        className="flex flex-col pb-10 border-r-4"
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
      >
        <div
          style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
          className="border-4 border-b-8 px-2 h-[147px]"
        >
          <div className="bg-white rounded-lg flex items-center justify-center w-full h-full">
            <img src={WitchLogo} alt="Witch logo" className="w-64" />
          </div>
        </div>
        <div
          style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
          className="border-4 border-b-8 px-2 h-[90px]"
        >
          <div className="bg-white rounded-lg flex items-center justify-center w-full h-full">
            <button
              onClick={() => setView("notes")}
              className="font-caveat text-3xl font-bold"
            >
              Notes
            </button>
          </div>
        </div>
        <div
          style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
          className="border-4 border-b-8 px-2 h-[90px]"
        >
          <div className="bg-white rounded-lg flex items-center justify-center w-full h-full">
            <button
              onClick={() => setView("dictionary")}
              className="font-caveat text-3xl font-bold"
              style={{ borderColor: `${PLUM}` }}
            >
              Dictionary
            </button>
          </div>
        </div>
        <div
          style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
          className="border-4 border-b-8 px-2 h-[90px]"
        >
          <div className="bg-white rounded-lg flex items-center justify-center w-full h-full">
            <button
              onClick={() => setView("related")}
              className="font-caveat text-3xl font-bold"
              style={{ borderColor: `${PLUM}` }}
            >
              Groups
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        {currentView === "notes" && <NotesView />}
        {currentView === "dictionary" && <DictionaryView />}
        {currentView === "related" && <RelatedGroupsView />}
      </div>
    </div>
  );
}
