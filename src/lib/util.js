export function paginationWithOffset(page, max, offset = 5) {
  let length = offset * 2 + 1 > max ? max : offset * 2 + 1;
  let start = page - offset;
  if (max - page < offset) {
    start = max - length + 1;
  }
  if (start < 1) start = 1;
  return Array.from({ length }, (_, i) => start + i);
}
