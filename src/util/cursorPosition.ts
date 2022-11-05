/**
 * 获取光标位置
 * @param element node
 * @returns
 */
export const getCursorPosition = (element: Element | null): number => {
  if (element === null) return 0;

  let caretOffset = 0;
  const doc = element?.ownerDocument;
  const win = doc.defaultView ?? window;
  const selection = win.getSelection();
  if (selection !== null && selection.rangeCount > 0) {
    const range = win.getSelection()?.getRangeAt(0);
    if (range !== undefined) {
      const preCaretRange = range?.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  }
  return caretOffset;
};

export const setCursorPosition = (
  element: Element | null,
  cursorPosition: number
): void => {
  if (element === null) {
    return;
  }

  const range = document.createRange();
  range.setStart(element.firstChild ?? element, cursorPosition);
  range.setEnd(element.firstChild ?? element, cursorPosition);
  const selection = window.getSelection();
  if (selection !== null) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export const insertText = (
  element: Element | null,
  str: string,
  cursorPosition = 0
): void => {
  if (element === null) return;

  const html = element?.innerHTML;

  element.innerHTML =
    html.slice(0, cursorPosition) +
    str +
    html.slice(cursorPosition, html.length);

  setCursorPosition(element, cursorPosition + 2);
};
