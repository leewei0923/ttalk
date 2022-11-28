import { JSONContent } from '@tiptap/react';
import { compareString } from './compareString';

interface handleJSONRes {
  doc: JSONContent | '';
  flag: boolean;
}

let flag = false;

export function handleJSON(doc: JSONContent, target: string): handleJSONRes {
  if (typeof doc !== 'object') {
    return {
      doc: '',
      flag
    };
  }

  if (typeof doc.text === 'string') {
    const compareRes = compareString(doc.text, target);

    if (compareRes !== -1) {
      if (Array.isArray(doc.marks)) {
        const marks = doc.marks;
        for (let i = 0; i < doc.marks.length; i++) {
          if (marks[i].type === 'highlight') {
            marks[i].attrs = {
              color: '#4A95DF'
            };
          }

          if (marks[i].type === 'textStyle') {
            marks[i].attrs = {
              color: 'white'
            };

            break;
          }
        }

        marks.push({
          type: 'highlight',
          attrs: {
            color: '#4A95DF'
          }
        });

        marks.push({
          type: 'textStyle',
          attrs: {
            color: 'white'
          }
        });
      } else {
        doc.marks = [
          {
            type: 'highlight',
            attrs: {
              color: '#4A95DF'
            }
          },
          {
            type: 'textStyle',
            attrs: {
              color: 'white'
            }
          }
        ];
      }
      flag = true;
    }
  }

  if (typeof doc.content === 'object' && Array.isArray(doc.content)) {
    const len = doc.content.length;

    for (let i = 0; i < len; i++) {
      const content = doc.content[i];
      handleJSON(content, target);
    }
  }

  return {
    doc,
    flag
  };
}

export function MakeFlase(): void {
  flag = false;
}
