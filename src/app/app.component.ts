import { Component, OnInit } from '@angular/core';
import { NumbersGeneratorService } from './numbers-generator.service';
import { NumbersResponse } from './interfaces/numbersResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles.scss']
})
export class AppComponent implements OnInit {
  title = 'Random Number Generator';
  randomNumbers = [];
  totalNumbers;
  numbersToGenerate = '';
  loading = false;
  minNumber;
  maxNumber;

  constructor(
    private numbersService: NumbersGeneratorService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getNumbers();
  }

  /**
   * Get generated numbers
   *
   * @memberof AppComponent
   */
  getNumbers () {
    this.loading = true;

    this.numbersService.getNumbers().subscribe((res: NumbersResponse) => {
      this.updateNumbers(res.phoneNumbers, res.totalNumbersGenerated);
      this.getMax();
      this.getMin();
      this.loading = false;
      this.toastr.success(res.message);
    }, err => {
      this.loading = false;
      this.toastr.error(err.message);
    });
  }

  /**
   * Method called to generate numbers
   *
   * @memberof AppComponent
   */
  generateNumbers() {
    this.loading = true;
    this.numbersService.generateNumbers(this.numbersToGenerate).subscribe((res: NumbersResponse) => {
      this.updateNumbers(res.phoneNumbers, res.totalNumbersGenerated);
      this.getMax();
      this.getMin();
      this.loading = false;
      this.toastr.success(res.message);
    }, ({ error }) => {
      this.loading = false;
      this.toastr.error(error.message);
    });
  }

  /**
   * Helper function to spread new array to existing
   *
   * @param {array} numbArr
   * @param {string} total
   * @memberof AppComponent
   */
  updateNumbers(numbArr, total) {
    this.randomNumbers = numbArr;
    this.totalNumbers = total;
  }

  /**
   *
   *
   * @returns {array} sorted array
   * @memberof AppComponent
   */
  sortAscending() {
    return this.randomNumbers.sort((a, b) =>  (a > b) ? 1 : -1);
  }

  /**
   * Sort numbers in descending order
   *
   * @returns {array} sorted array
   * @memberof AppComponent
   */
  sortDescending() {
    return this.randomNumbers.sort((a, b) =>  (a < b) ? 1 : -1);
  }

  getMax() {
    const maxNumber = Math.max(...this.randomNumbers);
    const maxNumberString = maxNumber.toString();
    const lengthMax = maxNumber.toString().length;

    if (maxNumberString.length < 10) {
      const missingDigits = 10 - Number(lengthMax);
      const addedString = '0'.repeat(missingDigits);
      return this.maxNumber = [addedString, maxNumberString.slice(0)].join('');
    }
    this.maxNumber = maxNumber.toString();
  }
  getMin() {
    const minNumber = Math.min(...this.randomNumbers);
    const minNumberString = minNumber.toString();
    const lengthMin = minNumber.toString().length;
    if (minNumberString.length < 10) {
      const missingDigits = 10 - Number(lengthMin);
      const addedString = '0'.repeat(missingDigits);
      return this.minNumber = [addedString, minNumberString.slice(0)].join('');
    }
    this.minNumber = minNumber.toString();
  }
}
