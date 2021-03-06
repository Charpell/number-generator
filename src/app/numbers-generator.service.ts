import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NumbersGeneratorService {

  constructor(private httpClient: HttpClient) { }
  baseUrl = 'https://rpn-generatorbydanny.herokuapp.com';
  //  Local url
  // baseUrl = 'http://localhost:3333';

  getNumbers() {
    return this.httpClient.get(`${this.baseUrl}/api/v1/numbers`);
  }
  generateNumbers(generateNumber: string) {
    return this.httpClient.post(`${this.baseUrl}/api/v1/numbers/generate`, { generateNumber });
  }
}
