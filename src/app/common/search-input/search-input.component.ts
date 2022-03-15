import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

export interface Stock {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

interface Config {
  count: number;
  result: Stock[];
}

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Output() onSymbolChange = new EventEmitter<string>();
  input_timer:number | undefined;
  company_name = new FormControl('');
  options: Stock[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        const param = this.route.snapshot.paramMap.get('param');
        if (param !== 'home') {
          this.company_name.setValue(param);
        }
      }
    })
  }

  ngOnInit(): void {
    this.company_name.valueChanges.subscribe(company_name => {
      clearTimeout(this.input_timer);
      this.input_timer = setTimeout(() => {
        if (!company_name) {
          this.options = [];
          return;
        }
        this.searchCompany(company_name).subscribe(stocks => this.options = stocks);
      }, 200);
    })
  }

  searchCompany(company_name: string): Observable<Stock[]> {
    return new Observable((observer) => {
      if (!company_name) {
        observer.next([]);
        return;
      }
      this.http.get<Config>(`/api/stock/company/${company_name}`).subscribe(data => {
        observer.next(data.result);
      })
    })
  }

  handleSelectSymbol(symbol: string): void {
    this.onSymbolChange.emit(this.company_name.value);
  }

  handleClickSearch(): void {
    this.options = [];
    clearTimeout(this.input_timer);
    this.onSymbolChange.emit(this.company_name.value);
  }

  handleClickClear(): void {
    clearTimeout(this.input_timer);
    this.options = [];
    this.company_name.setValue('');
  }

}
