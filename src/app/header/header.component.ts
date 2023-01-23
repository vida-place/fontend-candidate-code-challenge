import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header', // Question: Is this selector necessary?
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, // Question: What is this good for?
})
export class HeaderComponent implements OnInit {
  ngOnInit() {}
}
