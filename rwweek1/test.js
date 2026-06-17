//test_celsiusTofahrenheit.js
const {celsiusTofahrenheit} = require ('./function');

//Control+Command+Space to select symbol

test('Convert 0°C to 32°F',() => {
  expect(celsiusTofahrenheit(0)).toBe(32)
});


test("Convert 110°C to 230°F", () => {
  expect(celsiusTofahrenheit(110)).toBe(230);
});

test("Convert 200°C to 392°F", () => {
  expect(celsiusTofahrenheit(200)).toBe(392);
});