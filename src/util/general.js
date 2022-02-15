export function updateRows(event) {
  const el = event.target;
  while (el.offsetHeight <= el.scrollHeight) el.rows = el.rows + 1;
  if (el.value.length < 1) el.rows = 1;
}

export function setRows(text = "") {
  const el = document.querySelector("main");
  if (!el || !text) return 1;
  const paragraphs = text.split("\n");
  const charsPerLine = (el.offsetWidth) / 8;
  let rows = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    rows += Math.ceil(paragraphs[i].length / charsPerLine);
    if (paragraphs[i] === "") rows += 1;
  }
  return rows;
}