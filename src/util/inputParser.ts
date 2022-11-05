interface ContentType {
  type: 'text' | 'img' | 'other';
  value: string;
}

export class ContentParser {
  parser(content: string): ContentType[] {
    const contents = content.split('\n');
    const list: ContentType[] = [];

    for (let i = 0; i < contents.length; i++) {
      list.push({ type: 'text', value: contents[i] });
    }

    return list;
  }
}
