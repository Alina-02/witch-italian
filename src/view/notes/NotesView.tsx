import { useAppStore } from "../../store/store";
import { NotesListView } from "./NotesListView";
import { NoteDetailView } from "./NoteDetailsView";

export function NotesView() {
  const { selectedNoteId } = useAppStore();
  return selectedNoteId ? (
    <NoteDetailView noteId={selectedNoteId} />
  ) : (
    <NotesListView />
  );
}
