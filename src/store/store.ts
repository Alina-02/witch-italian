import { create } from "zustand";
import { AppData, Note, RelatedGroup, VocabWord } from "../types";

// store.ts
type View = "notes" | "dictionary" | "related";

export interface AppState {
  notes: Note[];
  related: RelatedGroup[];
  selectedNoteId?: string;
  currentView: View;
  setView: (v: View) => void;

  addNote: (title: string) => void;
  addWord: (noteId: string, word: VocabWord) => void;
  selectNote: (id?: string) => void;

  // Nuevas funciones
  addRelatedGroup: (title: string, wordIds?: string[]) => string; // retorna id del grupo
  addWordToGroup: (
    original: string,
    english: string,
    groupIds: string[]
  ) => string; // retorna id de la palabra creada

  save: () => void;
  load: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  notes: [],
  related: [],
  selectedNoteId: undefined,
  currentView: "notes",
  setView: (v) => set({ currentView: v }),

  addNote: (title) => {
    const newNote: Note = { id: crypto.randomUUID(), title, vocab: [] };
    set((state) => ({ notes: [...state.notes, newNote] }));
    get().save();
  },

  addWord: (noteId, word) => {
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === noteId ? { ...n, vocab: [...n.vocab, word] } : n
      ),
    }));
    get().save();
  },

  selectNote: (id) => set({ selectedNoteId: id }),

  // 🌟 Nueva función para crear un grupo
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

  // 🌟 Nueva función para añadir palabra nueva y opcionalmente asociarla a grupos
  addWordToGroup: (original, english, groupIds) => {
    const wordId = crypto.randomUUID();
    const newWord: VocabWord = { id: wordId, original, english };

    // Añadir a la primera nota por defecto si quieres persistirla allí
    if (get().notes.length > 0) {
      const firstNoteId = get().notes[0].id;
      get().addWord(firstNoteId, newWord);
    }

    // Añadir a los grupos indicados
    set((state) => ({
      related: state.related.map((g) =>
        groupIds.includes(g.id) ? { ...g, words: [...g.words, wordId] } : g
      ),
    }));

    get().save();
    return wordId;
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
}));
