import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  displayValue: string = '0';
  expression: string = '';
  waitingForOperator: boolean = false;

  onNumberClick(value: string) {
    if (this.waitingForOperator) {
      this.expression += this.displayValue;
      this.waitingForOperator = false;
      this.displayValue = value;
    } else {
      this.displayValue = this.displayValue === '0' ? value : this.displayValue + value;
    }
  }

  onOperatorClick(op: string) {
    
    if (this.waitingForOperator) {
      // Replace the last operator with the new one
      this.expression = this.expression.slice(0, -1) + op;
    } else {
      this.expression += this.displayValue + op;
      this.waitingForOperator = true;
    }
  }

  calculate() {
    console.log("this.expression", this.expression)
    if (this.expression) {
      this.expression += this.displayValue;
      try {
        this.displayValue = eval(this.expression).toString();
      } catch (error) {
        console.error('Error evaluating expression:', error);
        this.displayValue = 'Error';
      }
      this.expression = '';
      this.waitingForOperator = false;
    }
  }

  onClear() {
    this.displayValue = '0';
    this.expression = '';
    this.waitingForOperator = false;
  }
}
