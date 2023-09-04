// setupTests.js
global.TextEncoder = require('util').TextEncoder;

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
});
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};


// Import the Error and Success functions from main.js
const { Error, Success, fNameValidation } = require('./main');

// Mock the HTML element and its properties
document.body.innerHTML = `
  <input type="text" id="firstName" />
  <div class="error"></div>
`;

describe('fNameValidation function', () => {
  test('should call Success when the input is valid', () => {
    // Arrange
    const inputElement = document.getElementById('firstName');
    inputElement.value = 'John';

    // Act
    fNameValidation(inputElement);

    // Assert
    expect(Success).toHaveBeenCalledWith(inputElement);
    expect(Error).not.toHaveBeenCalled();
  });

  test('should call Error when the input is invalid', () => {
    // Arrange
    const inputElement = document.getElementById('firstName');
    inputElement.value = '123';

    // Act
    fNameValidation(inputElement);

    // Assert
    expect(Error).toHaveBeenCalledWith(inputElement, 'Invalid name');
    expect(Success).not.toHaveBeenCalled();
  });
});
