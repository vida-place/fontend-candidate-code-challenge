import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketCode } from 'src/app/shared/models/socket-code.model';
import { SOCKET_CANDIDATE_ID } from '../candidate.constants';
import { uuid } from '../uuid.util';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  uuid = uuid();
  code = this.socket.fromEvent<SocketCode>(`code-${SOCKET_CANDIDATE_ID}`);
  tasks = this.socket.fromEvent<number[]>(`tasks-${SOCKET_CANDIDATE_ID}`);

  constructor(private socket: Socket) {}

  setCode(code: string, selectionStart: number | null) {
    this.socket.emit(`setCode-${SOCKET_CANDIDATE_ID}`, { uuid: this.uuid, code, selectionStart });
  }

  setTasks(tasks: number[]) {
    this.socket.emit(`setTasks-${SOCKET_CANDIDATE_ID}`, tasks);
  }
}
