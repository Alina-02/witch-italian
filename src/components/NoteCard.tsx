import React, { useState } from "react";
import { AMERICAN_PURPLE } from "../styles/colors";
import { Note } from "../types";
import { useAppStore } from "../store/store";

interface Props {
  note: Note;
  selectNote: (id?: string | undefined) => void;
}

const NoteCard = (props: Props) => {
  const { note, selectNote } = props;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");

  const { deleteNote, editNote } = useAppStore();

  return (
    <div
      key={note.id}
      className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      style={{ color: `${AMERICAN_PURPLE}` }}
    >
      <div
        onClick={() => {
          if (!isEditing) selectNote(note.id);
        }}
      >
        {isEditing ? (
          <input
            className="p-1 mb-2 rounded-lg shadow text-black border-2 w-full"
            style={{
              borderColor: `${AMERICAN_PURPLE}`,
            }}
            type="text"
            placeholder="Write new title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                editNote(note.id, newTitle);
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <h2 className="text-lg font-semibold mb-1">{note.title}</h2>
        )}
        <p className="text-gray-500 text-sm">{note.vocab.length} words</p>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
          onClick={() => {
            deleteNote(note.id);
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

export default NoteCard;
