import {Component, OnInit, Input} from '@angular/core';
import {Company} from "../../search-home.component";
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() company: Company | undefined;
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options | undefined;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.company)
    if (this.company) {
      const chartOptions: Highcharts.Options = {
        title: {
          text: `${this.company.ticker} Hourly Price Variation`
        },
        series: [{
          type: 'line',
          name: 'open prices',
          data: this.company.candlePrices.o,
        }],
        xAxis: {
          categories: this.company.candlePrices.t.map(item => {
            let date = new Date(item * 1000);
            return `${date.getHours()}:${date.getMinutes()}`;
          })
        },
        yAxis: {
          opposite: true,
          title: {
            text: null
          }
        }
      }
      this.chartOptions = chartOptions;
    }

  }

}
