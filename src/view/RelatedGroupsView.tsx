import { useState } from "react";
import { useAppStore } from "../store/store";
import { IGUANA_GREEN, MOONSTONE, PLUM } from "../styles/colors";

export function RelatedGroupsView() {
  const { related, notes, addRelatedGroup, addWordToGroup } = useAppStore();

  const [showForm, setShowForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newWordOriginal, setNewWordOriginal] = useState("");
  const [newWordEnglish, setNewWordEnglish] = useState("");

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

  const handleAddGroup = () => {
    if (!newGroupName.trim()) return;
    const groupId = addRelatedGroup(newGroupName.trim(), selectedWords);

    if (newWordOriginal.trim() && newWordEnglish.trim()) {
      addWordToGroup(newWordOriginal.trim(), newWordEnglish.trim(), [groupId]);
    }

    setNewGroupName("");
    setSelectedWords([]);
    setNewWordOriginal("");
    setNewWordEnglish("");
    setShowForm(false);
  };

  return (
    <section className="space-y-6">
      <h2
        className="text-4xl font-bold pb-3 border-b-2 mb-3 mt-10"
        style={{ borderColor: `${PLUM}` }}
      >
        Groups of words
      </h2>

      {!showForm && (
        <button
          className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow"
          style={{ background: `${MOONSTONE}`, border: `${IGUANA_GREEN}` }}
          onClick={() => setShowForm(true)}
        >
          Add new group
        </button>
      )}

      {showForm && (
        <div className="color-black flex flex-col gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Search existing words..."
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className=" color-black flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="New word original"
              value={newWordOriginal}
              onChange={(e) => setNewWordOriginal(e.target.value)}
            />
            <input
              className="color-black flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="New word English"
              value={newWordEnglish}
              onChange={(e) => setNewWordEnglish(e.target.value)}
            />
          </div>

          <div className="flex gap-2 justify-between">
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={handleAddGroup}
            >
              Save group
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {related.map((g) => (
          <article
            key={g.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <h3 className="font-semibold text-gray-800 mb-2">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.words.map((wid) => (
                <span
                  key={wid}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                >
                  {wid}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
