import { useState } from "react";
import { useAppStore } from "../store/store";
import {
  AMERICAN_PURPLE,
  MOONSTONE,
  PLUM,
  SOFT_PLUM,
  SOFT_SOFT_PLUM,
} from "../styles/colors";

export function RelatedGroupsView() {
  const { related, notes, addRelatedGroup, addWordToGroup, updateGroup } =
    useAppStore();

  const [showForm, setShowForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newWordOriginal, setNewWordOriginal] = useState("");
  const [newWordEnglish, setNewWordEnglish] = useState("");

  const [editingGroup, setEditingGroup] = useState<string | null>(null);

  const allWords = notes.flatMap((note) =>
    note.vocab.map((w) => ({
      id: w.id,
      original: w.original,
      english: w.english,
    }))
  );

  const filteredWords = allWords.filter(
    (w) =>
      w.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleWordSelection = (id: string) => {
    setSelectedWords((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  const handleSaveGroup = () => {
    if (!newGroupName.trim()) return;

    if (editingGroup) {
      updateGroup(editingGroup, selectedWords);

      if (newWordOriginal.trim() && newWordEnglish.trim()) {
        addWordToGroup(newWordOriginal.trim(), newWordEnglish.trim(), [
          editingGroup,
        ]);
      }
    } else {
      const groupId = addRelatedGroup(newGroupName.trim(), selectedWords);

      if (newWordOriginal.trim() && newWordEnglish.trim()) {
        addWordToGroup(newWordOriginal.trim(), newWordEnglish.trim(), [
          groupId,
        ]);
      }
    }

    // resetear
    setNewGroupName("");
    setSelectedWords([]);
    setNewWordOriginal("");
    setNewWordEnglish("");
    setEditingGroup(null);
    setShowForm(false);
  };

  return (
    <section>
      <div
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
        className="border-4 border-b-8 mb-3 h-[147px]"
      >
        <div className="bg-white rounded-lg flex items-center justify-center w-full h-full">
          <h2
            className="font-caveat text-6xl font-bold"
            style={{ borderColor: `${PLUM}` }}
          >
            Groups of words
          </h2>
        </div>
      </div>
      <div className="row gap-[12px] items-center w-full py-2 px-6">
        {!showForm && (
          <button
            className="text-white hover:bg-gray-100 w-full font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
            style={{
              background: `${AMERICAN_PURPLE}`,
              border: `${PLUM}`,
            }}
            onClick={() => setShowForm(true)}
          >
            Add new group
          </button>
        )}

        {showForm && (
          <div
            className="color-black flex flex-col gap-4 p-4 border-4 rounded-lg "
            style={{
              backgroundColor: `${SOFT_PLUM}`,
              borderColor: `${MOONSTONE}`,
            }}
          >
            <input
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#36aebc]"
              placeholder="Group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Search existing words..."
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#36aebc]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {filteredWords.map((w) => (
                <label
                  key={w.id}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedWords.includes(w.id)}
                    onChange={() => toggleWordSelection(w.id)}
                    className="accent-blue-500"
                  />
                  <span>
                    {w.original} ({w.english})
                  </span>
                </label>
              ))}
            </div>

            <div className="flex flex-row gap-4">
              <button
                className="bg-white hover:bg-gray-100 w-full font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
                style={{
                  color: `${AMERICAN_PURPLE}`,
                  border: `${PLUM}`,
                }}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="text-white hover:bg-gray-100 w-full font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
                style={{ background: AMERICAN_PURPLE, border: PLUM }}
                onClick={handleSaveGroup}
              >
                {editingGroup ? "Update group" : "Save group"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 mx-6">
        {related.map((g) => (
          <article
            key={g.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            style={{ color: `${AMERICAN_PURPLE}` }}
          >
            <div className="flex flex-row justify-between items-center">
              <h3 className="font-semibold text-gray-800 mb-2">{g.title}</h3>
              <button
                style={{
                  color: `${AMERICAN_PURPLE}`,
                }}
                onClick={() => {
                  setEditingGroup(g.id);
                  setShowForm(true);
                  setSelectedWords(g.words);
                  setNewGroupName(g.title);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.words.map((wid) => {
                const word = allWords.find((w) => w.id === wid);
                return (
                  <span
                    key={wid}
                    style={{
                      backgroundColor: SOFT_SOFT_PLUM,
                      color: AMERICAN_PURPLE,
                    }}
                    className="text-sm font-medium px-2 py-1 rounded-full"
                  >
                    {word ? `${word.original} (${word.english})` : wid}
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
