import { useEffect } from "react";

import "./styles/App.css";
import { useAppStore } from "./store/store";
import { DictionaryView } from "./view/DictionaryView";
import { RelatedGroupsView } from "./view/RelatedGroupsView";
import { NotesView } from "./view/notes/NotesView";

export default function App() {
  const { load, currentView, setView } = useAppStore();

  useEffect(() => {
    console.log("Cargando datos");
    load();
  }, []);

  return (
    <div className="app font-sans">
      <div className="flex flex-col p-10 border-r-2 gap-5 ">
        <h2 className="text-4xl font-bold  pb-3 border-b-2">W.I.T.C.H.</h2>
        <button onClick={() => setView("notes")}>Notes</button>
        <button onClick={() => setView("dictionary")}>Dictionary</button>
        <button onClick={() => setView("related")}>Groups</button>
      </div>
      <div className="flex flex-col p-10">
        {currentView === "notes" && <NotesView />}
        {currentView === "dictionary" && <DictionaryView />}
        {currentView === "related" && <RelatedGroupsView />}
      </div>
    </div>
  );
}
