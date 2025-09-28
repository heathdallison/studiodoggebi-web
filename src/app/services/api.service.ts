import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = '/api'; // dev proxy maps this to your .NET API

  constructor(private http: HttpClient) {}

  getRoot()             { return this.http.get(`${this.base}/`,               { responseType: 'text' }); }
  getLegendarySisters() { return this.http.get(`${this.base}/legendarysisters`, { responseType: 'text' }); }
  getStudioDoggebi()    { return this.http.get(`${this.base}/studiodoggebi`,   { responseType: 'text' }); }
}
