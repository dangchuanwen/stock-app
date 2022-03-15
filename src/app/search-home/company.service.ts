import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "./search-home.component";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  getCompanyDetails(symbol: string): Observable<Company> {
    return this.httpClient.get<Company>(`/api/stock/company/details/${symbol}`);
  }
}
