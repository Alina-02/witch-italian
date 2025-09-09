import { create } from "zustand";
import { Note, RelatedGroup, VocabWord } from "../types";

// store.ts
type View = "notes" | "dictionary" | "related" | "learn";

export interface AppState {
  notes: Note[];
  related: RelatedGroup[];
  selectedNoteId?: string;
  currentView: View;
  setView: (v: View) => void;

  selectNote: (id?: string) => void;
  addNote: (title: string) => void;
  editNote: (id: string, newTitle: string) => void;
  deleteNote: (id: string) => void;

  addWord: (noteId: string, word: VocabWord) => void;
  editWord: (
    noteId: string,
    wordId: string,
    updated: Partial<VocabWord>
  ) => void;
  deleteWord: (noteId: string, wordId: string) => void;

  addRelatedGroup: (title: string, wordIds?: string[]) => string;
  addWordToGroup: (
    original: string,
    english: string,
    groupIds: string[]
  ) => string;
  updateGroup: (groupId: string, newWordIds: string[]) => void;

  save: () => void;
  load: () => Promise<void>;

  selectedWordToEdit?: VocabWord;
  selectWordToEdit: (word?: VocabWord) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  notes: [],
  related: [],
  selectedWordToEdit: undefined,

  selectedNoteId: undefined,
  currentView: "notes",
  setView: (v) => set({ currentView: v }),

  addNote: (title) => {
    const newNote: Note = { id: crypto.randomUUID(), title, vocab: [] };
    set((state) => ({ notes: [...state.notes, newNote] }));
    get().save();
  },

  editNote: (id, newTitle) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, title: newTitle } : n
      ),
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      selectedNoteId:
        state.selectedNoteId === id ? undefined : state.selectedNoteId,
    })),

  addWord: (noteId, word) => {
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === noteId ? { ...n, vocab: [...n.vocab, word] } : n
      ),
    }));
    get().save();
  },

  editWord: (noteId, wordId, updated) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === noteId
          ? {
              ...n,
              vocab: n.vocab.map((w) =>
                w.id === wordId ? { ...w, ...updated } : w
              ),
            }
          : n
      ),
    })),

  deleteWord: (noteId, wordId) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === noteId
          ? { ...n, vocab: n.vocab.filter((w) => w.id !== wordId) }
          : n
      ),
    })),

  selectNote: (id) => set({ selectedNoteId: id }),

  addRelatedGroup: (title, wordIds = []) => {
    const newGroup: RelatedGroup = {
      id: crypto.randomUUID(),
      title,
      words: wordIds,
    };
    set((state) => ({ related: [...state.related, newGroup] }));
    get().save();
    return newGroup.id;
  },

  addWordToGroup: (original, english, groupIds) => {
    const wordId = crypto.randomUUID();
    const newWord: VocabWord = { id: wordId, original, english };

    if (get().notes.length > 0) {
      const firstNoteId = get().notes[0].id;
      get().addWord(firstNoteId, newWord);
    }

    set((state) => ({
      related: state.related.map((g) =>
        groupIds.includes(g.id) ? { ...g, words: [...g.words, wordId] } : g
      ),
    }));

    get().save();
    return wordId;
  },

  updateGroup: (groupId: string, newWordIds: string[]) => {
    set((state) => ({
      related: state.related.map((g) =>
        g.id === groupId
          ? {
              ...g,
              words: [...g.words, ...newWordIds].filter(
                (id, index, arr) => arr.indexOf(id) === index
              ),
            }
          : g
      ),
    }));
    get().save();
  },

  save: () => {
    const data = { notes: get().notes, related: get().related };
    console.log("Guardando datos en disco:", data);
    if (window.electronAPI?.saveData) window.electronAPI.saveData(data);
  },

  load: async () => {
    try {
      const data = await window.electronAPI?.loadData();
      if (data) {
        set({
          notes: data.notes || [],
          related: data.related || [],
        });
      }
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  },

  selectWordToEdit: (word) => set(() => ({ selectedWordToEdit: word })),
}));
