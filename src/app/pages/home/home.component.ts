import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CANDIDATE_NAME } from 'src/app/shared/candidate.constants';
import { SocketService } from 'src/app/shared/socket/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  name = CANDIDATE_NAME;
  checkedItems = new Set<number>();

  private tasksSubscription: Subscription;

  constructor(private readonly socketService: SocketService) {
    this.tasksSubscription = this.socketService.tasks.subscribe(tasks => {
      this.checkedItems = new Set<number>(tasks);
    });
  }

  ngOnInit() {} // Question: Should we keep this, even it's empty? When is ngOnInit being called?

  ngOnDestroy() {
    this.tasksSubscription?.unsubscribe();
  }

  toggleChecked(num: number, singleSelect = false) {
    if (singleSelect) {
      for (let i = 0; i < 100; i++) {
        this.checkedItems.delete(Math.floor(num / 100) * 100 + i);
      }

      this.checkedItems.add(num);
    } else {
      if (!this.checkedItems.has(num)) {
        this.checkedItems.add(num);
      } else {
        this.checkedItems.delete(num);
      }
    }

    this.socketService.setTasks(Array.from(this.checkedItems));
  }
}
