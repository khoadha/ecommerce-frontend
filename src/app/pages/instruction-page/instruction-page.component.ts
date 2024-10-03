import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instruction-page',

  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.css'],
})
export class InstructionPageComponent implements OnInit {
  title: string;
  activeIndex: number[]; // open 2 accordion on init
  constructor() {
    this.title = 'Hướng dẫn sử dụng nền tảng Wemade';
    this.activeIndex = [0, 1];
  }

  ngOnInit(): void {}

  preload: string = 'auto';
}
