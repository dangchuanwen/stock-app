import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import {FormControl} from "@angular/forms";

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
  input_timer:number | undefined;
  company_name = new FormControl('');
  options: Stock[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.company_name.valueChanges.subscribe(company_name => {
      clearTimeout(this.input_timer);
      this.input_timer = setTimeout(() => {
        if (!company_name) {
          this.options = [];
          return;
        }
        this.searchCompany(company_name).subscribe(stocks => this.options = stocks);
      }, 300);
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

  handleClickSearch(): void {
    clearTimeout(this.input_timer);
    if (!this.company_name.value) {
      return;
    }
    this.searchCompany(this.company_name.value).subscribe(data => {
      this.options = data;
    })
  }

  handleClickClear(): void {
    clearTimeout(this.input_timer);
    this.options = [];
    this.company_name.setValue('');
  }

}
