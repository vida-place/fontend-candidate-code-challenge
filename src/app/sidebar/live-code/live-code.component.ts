import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import { timer } from 'rxjs';
import { SocketService } from 'src/app/shared/socket/socket.service';

@Component({
  selector: 'live-code',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightModule],
  templateUrl: './live-code.component.html',
  styleUrls: ['./live-code.component.scss']
})
export class LiveCodeComponent {
  code!: string;

  @HostBinding('class.closed') closed = true;

  @ViewChild('textarea', { read: ElementRef }) private textareaRef!: ElementRef;

  constructor(private socketService: SocketService) {
    this.socketService.code.subscribe(codeObj => {
      if (codeObj.uuid !== this.socketService.uuid) {
        this.code = codeObj.code;

        if (!!this.textareaRef) {
          timer(0).subscribe(() => {
            this.textareaElement.selectionStart = codeObj.selectionStart;
            this.textareaElement.selectionEnd = codeObj.selectionStart;
          });
        }
      }
    });
  }

  get textareaElement() {
    return this.textareaRef?.nativeElement as HTMLInputElement;
  }

  @HostBinding('class.has-code')
  get hasCode() {
    return this.code?.length;
  }

  @HostListener('click')
  openConsole() {
    if (!this.closed) {
      return;
    }

    this.closed = false;

    timer(0).subscribe(() => {
      this.textareaElement.focus();
      this.textareaElement.selectionStart = 0;
      this.textareaElement.selectionEnd = 0;
    });
  }

  closeConsole(e: Event) {
    e.stopPropagation();
    this.closed = true;
  }

  updateCode(e: KeyboardEvent) {
    this.socketService.setCode(this.code, (e.target as HTMLInputElement).selectionStart);
  }
}
