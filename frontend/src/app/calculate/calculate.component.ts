import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css'],
})
export class CalculateComponent implements OnInit {

  expressions: any = [];
  input: string = '';
  result: string = '';
  formula: string = '';


  constructor(private expService: ServiceService) {
    this.retrieveExpressions();
  }
  ngOnInit(): void {
    this.retrieveExpressions();
    console.log('exps', this.expressions);
  }


  retrieveExpressions() {
    console.log('retirve');
    this.expService.getAll().subscribe((res: any) => {
      console.log('res', res);
      this.expressions = res.data;
      console.log('exp', this.expressions);
    });
    return this.expressions;
  }

  saveExpression(data: any): void {
    const postdata = {
      expression: data.expression,
      result: data.result,
    };

    this.expService.create(postdata).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });

    this.retrieveExpressions();
  }

  deleteExpression(id: any): void {
    this.expService.delete(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e: any) => console.error(e),
    });

    this.retrieveExpressions();
  }

  pressNum(num: string) {
    //Do Not Allow . more than once
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    //Do Not Allow 0 at beginning.
    if (num == '0') {
      if (this.input == '') {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (
        PrevKey === '/' ||
        PrevKey === '*' ||
        PrevKey === '-' ||
        PrevKey === '+'
      ) {
        return;
      }
    }

    this.input = this.input + num;
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    this.input = this.input + op;
    this.calcAnswer();
  }

  clear() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    this.formula = this.input;

    let lastKey = this.formula[this.formula.length - 1];

    if (lastKey === '.') {
      this.formula = this.formula.substr(0, this.formula.length - 1);
    }

    lastKey = this.formula[this.formula.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      this.formula = this.formula.substr(0, this.formula.length - 1);
    }

    console.log('Formula ' + this.formula);
    this.result = eval(this.formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input == '0') this.input = '';
    const data = {
      expression: this.formula,
      result: this.input,
    };
    this.saveExpression(data);
    this.retrieveExpressions();
  }

  removeValue() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }
}
