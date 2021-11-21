const Calculator = require('../src/Calculator');

describe('Test Calculator class', () => {
    
    describe('Check main funnctional', () => {
        it('Should get sum equals to 10', () => {
            const calculator = new Calculator(5);
            expect(calculator.add(5)).toBe(10);
        });
    
        it('Should get subtraction equals to -2', () => {
            const calculator = new Calculator(5);
            expect(calculator.subtract(7)).toBe(-2);
        });
    
        it('Should get multiplication equals to 15', () => {
            const calculator = new Calculator(3);
            expect(calculator.multiply(5)).toBe(15);
        });
    
        it('Should get division equals to 3', () => {
            const calculator = new Calculator(9);
            expect(calculator.divide(3)).toBe(3);
        });
    
    
        it('Should get pow equals to 25', () => {
            const calculator = new Calculator(5);
            expect(calculator.pow(2)).toBe(25);
        });
    
        it('Should get sqrt equals to 3', () => {
            const calculator = new Calculator(9);
            expect(calculator.sqrt(2)).toBe(3);
        });
    
        it('Should get current result equals to initial value', () => {
            const calculator = new Calculator(10);
            expect(calculator.getCurrentResult()).toBe(10);
        });
    
        it('Should get setted value equals to 15', () => {
            const calculator = new Calculator(11);
            expect(calculator.setCurrentResult(15)).toBe(15);
        });
    });

    describe('Check errors in main functional', () => {
        it('Should get error when sum by undefined', () => {
            const calculator = new Calculator(3);
            expect(() => calculator.add(undefined)).toThrow('You entered the wrong value');
        });
    
        it('Should get error when set null to initial value', () => {
            expect(() => new Calculator(null)).toThrow('You entered the wrong value');
        });
        
        it('Should get error when divide by 0', () => {
            const calculator = new Calculator(9);
            expect(() => calculator.divide(0)).toThrow('You cannot divide by zero');
        });
    })

});