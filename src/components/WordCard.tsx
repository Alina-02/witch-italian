import React from "react";
import { AMERICAN_PURPLE, SOFT_SOFT_PLUM } from "../styles/colors";
import { Note, VocabWord } from "../types";
import { useAppStore } from "../store/store";

interface Props {
  word: VocabWord;
  note: Note;
}

const WordCard = (props: Props) => {
  const { word, note } = props;

  const { deleteWord, selectWordToEdit } = useAppStore();

  return (
    <div
      key={word.id}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div
        className="flex flex-wrap gap-2 items-center"
        style={{
          color: `${AMERICAN_PURPLE}`,
        }}
      >
        <span className="text-lg font-semibold text-gray-800">
          {word.original}
        </span>
        <span
          style={{
            backgroundColor: `${SOFT_SOFT_PLUM}`,
            color: `${AMERICAN_PURPLE}`,
          }}
          className="  text-sm font-medium px-2 py-1 rounded-full"
        >
          {word.english}
        </span>
      </div>

      {word.description && (
        <p className="text-gray-500 mt-2 text-sm">{word.description}</p>
      )}

      {word.examples?.length ? (
        <ul className="list-disc list-inside mt-2 ml-4 text-gray-600 text-sm">
          {word.examples.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-row justify-end gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 cursor-pointer"
          onClick={() => selectWordToEdit(word)}
        >
          <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 cursor-pointer"
          onClick={() => {
            deleteWord(note.id, word.id);
          }}
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default WordCard;
