import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const messages = await readFile('src/messages/messages.json', 'utf8').then(
      (data) => JSON.parse(data),
    );
    return messages[id];
  }
  async findAll() {
    const messages = await readFile('src/messages/messages.json', 'utf8').then(
      (data) => {
        return JSON.parse(data);
      },
    );
    return messages;
  }

  async create(content: string) {
    const messages = await readFile('src/messages/messages.json', 'utf8').then(
      (data) => JSON.parse(data),
    );
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };
    await writeFile('src/messages/messages.json', JSON.stringify(messages));
    return messages[id];
  }
}
