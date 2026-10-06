export interface BoundingBox { x: number; y: number; width: number; height: number }
export type WritingDirection = 'vertical' | 'horizontal';
export type ReadingDirection = 'auto' | 'ltr' | 'rtl';
// Display palette only; NDL detection classes are preserved separately as ndlClass.
export const LAYOUT_CLASS = { OVERALL: 0, HANDWRITTEN: 1, TYPOGRAPHY: 2, ILLUSTRATION: 3, STAMP: 4 } as const;
export interface LineBox extends BoundingBox {
  id: string; confidence: number; classId: number; readingOrder: number;
  raw?: string; machineRaw?: string; ndlClass?: string; direction?: WritingDirection;
}
export interface RegionBox extends BoundingBox { confidence: number; classId: number }
export interface Source {
  item_id: number; media_id: number; title: string; item_title: string; item_identifier?: string;
  service_id: string; image_url: string; native_width: number; native_height: number; canvas_id: string | null;
}
export interface Page extends Source { position: number }
export interface Job { id: string; operation: string; status: string; error?: string; metrics?: Record<string, unknown> }
export interface TranscriptionMetadata {
  title?: string; contributors?: string; contributor_identifiers?: string; affiliation?: string; contribution_note?: string;
  journal_title?: string; journal_issue?: string; journal_identifiers?: string;
  publication_year?: string; publication_date?: string; publication_pages?: string;
  publisher?: string; doi?: string; publication_url?: string;
  rights_status?: '' | 'copyrighted' | 'not_asserted' | 'undetermined' | 'other';
  rights_holder?: string; rights_statement?: string; license_label?: string; license_url?: string;
  citation?: string;
}
export interface Document {
  id: string; source: Source; width: number; height: number; image_sha256: string;
  revision: number; lines: LineBox[]; regions: RegionBox[];
  reading_direction?: ReadingDirection;
  status: string; job?: Job;
  translation_draft?: { text: string; line_ids: string[]; source_transcription: string } | null;
  translation?: { text: string; line_ids: string[]; input: string; model: string;
    method?: 'machine' | 'manual' | 'commercial'; provider?: 'openai' | 'anthropic' | 'google'; human_edited?: boolean;
    editor?: { id: number; name: string; role: string }; edited_at?: number;
    uncertainties?: { source: string; reason: string; reading: string }[];
    source_transcription?: string; input_edited?: boolean; review_warnings?: string[]; prompt_revision?: string } | null;
  last_metrics?: Record<string, unknown>; history_count: number;
  transcription_updated_at?: number;
  transcription_editor?: { id: number; name: string; role: string };
  workflow?: 'editorial' | 'assist';
  publication_state?: 'draft' | 'reviewed' | 'published';
  reviewed_at?: number;
  reviewer?: { id: number; name: string; role: string };
  review_note?: string;
  transcription_credit?: string;
  transcription_metadata?: TranscriptionMetadata;
  provenance?: Record<string, Record<string, unknown>>;
}
