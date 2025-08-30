export interface VocabWord {
  id: string;
  original: string;
  english: string;
  description?: string;
  examples?: string[];
}

export interface Note {
  id: string;
  title: string;
  vocab: VocabWord[];
}

export interface RelatedGroup {
  id: string;
  title: string;
  words: string[]; // ids de VocabWord
}

export interface AppData {
  notes: Note[];
  related: RelatedGroup[];
}
