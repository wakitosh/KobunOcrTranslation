import type { BoundingBox, LineBox, ReadingDirection, WritingDirection } from './types';

/** NDL古典籍OCR-Liteの読み順処理と同じく、行枠の縦横比を既定値にする。 */
export function boxDirection(box: BoundingBox): WritingDirection {
  return box.width < box.height ? 'vertical' : 'horizontal';
}

export function lineDirection(line: LineBox): WritingDirection {
  return line.direction === 'vertical' || line.direction === 'horizontal'
    ? line.direction : boxDirection(line);
}

/** NDLのページ判定と同じ多数決。偶数で同数なら横組みとする。 */
export function pageDirection(lines: LineBox[]): WritingDirection {
  const vertical = lines.filter(line => lineDirection(line) === 'vertical').length;
  return lines.length < vertical * 2 ? 'vertical' : 'horizontal';
}

export function directionName(direction: WritingDirection) {
  return direction === 'vertical' ? '縦書き' : '横書き';
}

export function effectiveReadingDirection(writing: WritingDirection, reading: ReadingDirection) {
  return reading === 'auto' ? (writing === 'vertical' ? 'rtl' : 'ltr') : reading;
}

export function readingDirectionName(reading: ReadingDirection, writing: WritingDirection) {
  if (reading === 'auto') {
    return '自動（' + (writing === 'vertical' ? '右から左' : '左から右') + '）';
  }
  return reading === 'rtl' ? '右から左' : '左から右';
}

export function reorderForReadingDirection(
  lines: LineBox[], writing: WritingDirection, reading: ReadingDirection,
) {
  const effective = effectiveReadingDirection(writing, reading);
  return [...lines].sort((a, b) => {
    if (writing === 'vertical') {
      return (effective === 'ltr' ? a.x - b.x : b.x - a.x) || a.y - b.y;
    }
    return a.y - b.y || (effective === 'ltr' ? a.x - b.x : b.x - a.x);
  }).map((line, index) => ({ ...line, readingOrder: index + 1 }));
}
