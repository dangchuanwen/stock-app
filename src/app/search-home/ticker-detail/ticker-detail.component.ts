import {Component, Input, OnInit} from '@angular/core';
import {Company} from "../search-home.component";

@Component({
  selector: 'app-ticker-detail',
  templateUrl: './ticker-detail.component.html',
  styleUrls: ['./ticker-detail.component.css']
})
export class TickerDetailComponent implements OnInit {
  @Input() company: Company | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  isMarketOpen(timestamp: number): boolean {
    const date = new Date(timestamp * 1000);
    const hour = date.getHours();
    return  hour > 9 && hour < 13;
  }


  percentage(p: number): string {
    return p.toFixed(2) + '%';
  }
}
