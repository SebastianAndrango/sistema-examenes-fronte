import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrlProd from './helperProd';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories() {
    return this.http.get(`${baseUrlProd}/category/`);
  }

  public addCategory(category: any) {
    return this.http.post(`${baseUrlProd}/category/`, category);
  }
}
