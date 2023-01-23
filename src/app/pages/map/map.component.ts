import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayerService } from '../../shared/layer.service';

@Component({
  selector: 'app-map', // Question: What about this selector? Is this one necessary too?
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Question: What is this line good for?
})
export class MapComponent implements OnInit {
  constructor(private readonly layerService: LayerService) {}

  ngOnInit() {
    this.layerService.mapLayers$.subscribe(layers => {
      console.log(layers);
    });
  }
}
