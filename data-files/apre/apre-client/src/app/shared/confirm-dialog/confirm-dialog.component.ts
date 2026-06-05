/**
 * Author: Professor Krasso
 * Date: 8/10/24
 * File: confirm-dialog.component.ts
 * Description: Confirm dialog component
 */

// import statements
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  template: `
    <div class="confirm-dialog">
      <h1 class="confirm-dialog__title">{{ header }}</h1>
      <p class="confirm-dialog__message">{{ message }}</p>
      <div class="confirm-dialog__actions">
        <button class="button button--primary" (click)="confirm(true)">Yes</button>
        <button class="button button--secondary" (click)="confirm(false)">No</button>
      </div>
    </div>
  `,
  styles: `
    .confirm-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      border-radius: 8px;
    }
    .confirm-dialog__title {
      margin: 0;
      font-size: 1.5em;
    }
    .confirm-dialog__message {
      margin: 20px 0;
    }
    .confirm-dialog__actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  `
})
export class ConfirmDialogComponent {
  @Input() header: string = 'Confirm Deletion'; // default header
  @Input() message: string = 'Are you sure you want to delete?'; // default message
  @Output() confirmed = new EventEmitter<boolean>(); // output event emitter

  /**
   * @description - confirm dialog method to emit boolean value to parent component
   * @param confirm - boolean value
   */
  confirm(result: boolean) {
    this.confirmed.emit(result);
  }
}