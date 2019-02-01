import { Component, OnInit } from '@angular/core';
import { NumbersGeneratorService } from './numbers-generator.service';
import { NumbersResponse } from './interfaces/numbersResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles.scss']
})
export class AppComponent implements OnInit {
  title = 'Random Number Generator';
  randomNumbers = [];
  totalNumbers;

  constructor(private numbersService: NumbersGeneratorService) { }

  ngOnInit() {
    this.numbersService.getNumbers().subscribe((res: NumbersResponse) => {
      // this.randomNumbers.push(res.phoneNumbers);
      this.randomNumbers = [...this.randomNumbers, ...res.phoneNumbers];
      this.totalNumbers = this.randomNumbers.length;
    });
  }
}
