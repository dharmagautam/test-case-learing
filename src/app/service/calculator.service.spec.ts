import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

xdescribe('CalculatorService', () => {

  let calculatorService: CalculatorService,
    loggerSpy: any; // any type as spy objects are of any type

  beforeEach(() => {
    console.log("Calling beforeEach");
    loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    })
    calculatorService = TestBed.inject(CalculatorService);
  });

  it('should add two numbers', () => {
    console.log("add test");
    const result = calculatorService.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    console.log("subtract test");
    const result = calculatorService.subtract(2, 2);
    expect(result).withContext("some thing went wrong").toBe(0);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
