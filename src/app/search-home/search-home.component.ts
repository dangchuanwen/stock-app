import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CompanyService} from "./company.service";

export interface News {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface Company {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  peers: string[];
  isOpen: boolean;
  news: News[];
  candlePrices: {
    c: number[],
    h: number[],
    l: number[],
    o: number[],
    t: number[],
    v: number[]
  },
  values: {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
  }
}

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {
  alert = '';
  param = 'home';
  symbol = '';
  company: Company | undefined = undefined;

  constructor(private route: ActivatedRoute, private router: Router, private companyService: CompanyService) {
    router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        const param = this.route.snapshot.paramMap.get('param') as string;
        if (param !== 'home') {
          this.param = param;
          this.updateCompany();
        }
      }
    })
  }

  updateCompany(): void {
    this.companyService.getCompanyDetails(this.param).subscribe(company => {
      if (Object.keys(company).length === 0) {
        this.alert = 'No data found. Please enter a valid Ticker';
        return;
      }
      this.company = company;
    });
    // setTimeout(() => {
    //   this.updateCompany();
    // }, 15000);
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('param');
    this.param = param || 'home';
  }

  handleSymbolChange(symbol: string) {
    if (!symbol.trim()) {
      this.alert = `Please enter a valid ticker`;
      return;
    }
    this.router.navigate([`/search/${symbol}`]);
    this.symbol = symbol;
  }

}
