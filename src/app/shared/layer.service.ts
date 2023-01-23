import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayerService {
  mapLayers$ = new BehaviorSubject<string[]>([]);

  private mapLayers: string[] = [];

  constructor() {
    let i = 1;
    interval(5000).subscribe(() => {
      this.mapLayers.push(`#${i++}`);
      this.mapLayers$.next(this.mapLayers);
    });
  }
}
