import { Component } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (messages.length > 0) {
      <div>
        <ul>
          @for (message of messages; track message) {
            <li [ngClass]="{'highlight': message.id === 1}">
              <h1>{{ message.title }}</h1>
              <p>{{ message.content }}</p>
            </li>
          }
        </ul>
      </div>
    } @else {
      <div #noMessages>
        <h1>No messages available</h1>
      </div>
    }
  `,
  styles: `
    .highlight {
      font-weight: bold;
      color: red;
    }
  `
})
export class ContactComponent {
  messages: Message[];

  constructor(private messageService: MessageService) {
    this.messages = this.messageService.getMessages();
  }
}
