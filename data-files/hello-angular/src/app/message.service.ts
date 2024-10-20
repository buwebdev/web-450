// src/app/services/message.service.ts
import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [
    { id: 1, title: 'Welcome to the Home Page', content: 'This is the home page of our Angular application.' },
    { id: 2, title: 'About Us', content: 'This is the about page of our Angular application.' }
  ];

  getMessages(): Message[] {
    return this.messages;
  }

  getMessageById(id: number): Message | undefined {
    return this.messages.find(message => message.id === id);
  }
}
