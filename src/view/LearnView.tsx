import React, { useState } from "react";
import {
  AMERICAN_PURPLE,
  ERROR,
  IGUANA_GREEN,
  PLUM,
  SOFT_SOFT_PLUM,
} from "../styles/colors";
import { useAppStore } from "../store/store";
import toast, { Toaster } from "react-hot-toast";

const GamesView = () => {
  const { notes, selectNote } = useAppStore();

  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const [randomWord, setRandomWord] = useState<any>(null);
  const [answer, setAnswer] = useState("");

  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  const getRandomWord = () => {
    if (!selectedNote || selectedNote.vocab.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * selectedNote.vocab.length);
    return selectedNote.vocab[randomIndex];
  };

  const startQuiz = () => {
    const word = getRandomWord();
    setRandomWord(word);
    setAnswer("");
  };

  const handleSelect = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);

    if (note && note.vocab.length > 0) {
      const randIndex = Math.floor(Math.random() * note.vocab.length);
      setRandomWord(note.vocab[randIndex]);
      setAnswer("");
    } else {
      setRandomWord(null);
      setAnswer("");
    }
  };

  const checkAnswer = () => {
    if (!randomWord) return;
    if (answer.trim().toLowerCase() === randomWord.english.toLowerCase()) {
      toast("You're amazing!!", {
        style: {
          backgroundColor: `${IGUANA_GREEN}`,
          borderWidth: 2,
          borderColor: "#06451a",
          color: "#06451a",
        },
      });
      setTimeout(() => {
        const newWord = getRandomWord();
        setRandomWord(newWord);
      }, 800);
    } else {
      toast(`Wrong. Correct answer: ${randomWord.english}`, {
        style: {
          backgroundColor: `${ERROR}`,
          borderWidth: 2,
          borderColor: "#800000",
          color: "#800000",
        },
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Toaster />

      <div
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
        className="border-l-4 border-t-8 border-b-8 border-r-8 min-h-[147px]"
      >
        <div className="bg-white rounded-lg flex items-center justify-center w-full h-full">
          <h2
            className="font-caveat text-6xl font-bold "
            style={{ borderColor: `${PLUM}` }}
          >
            Learn
          </h2>
        </div>
      </div>

      <div
        id="notes-div"
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
        className="border-l-4 border-t-4 border-b-8 border-r-8 flex-grow"
      >
        <div className="bg-white rounded-lg flex flex-col w-full h-full pt-6 px-6">
          <select
            className="w-full p-3 rounded-lg border-2 shadow focus:outline-none mb-8"
            style={{ borderColor: PLUM, color: AMERICAN_PURPLE }}
            onChange={(e) => handleSelect(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select a note…
            </option>
            {notes.map((note) => (
              <option key={note.id} value={note.id}>
                {note.title} ({note.vocab.length} words)
              </option>
            ))}
          </select>

          {randomWord && (
            <>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md flex justify-center items-center h-32 mb-4">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: AMERICAN_PURPLE }}
                >
                  {randomWord.original}
                </h3>
              </div>
              <div className="flex flex-row gap-4 mb-4">
                <input
                  className="w-full p-2 rounded-lg border focus:outline-none"
                  style={{ borderColor: PLUM }}
                  type="text"
                  placeholder="Write in English..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      checkAnswer();
                    }
                  }}
                />
                <button
                  className="py-2 px-4 rounded-lg text-white font-semibold shadow"
                  style={{ backgroundColor: AMERICAN_PURPLE }}
                  onClick={checkAnswer}
                >
                  Check
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamesView;
