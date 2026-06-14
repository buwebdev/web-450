// fibonacci.js
/**
 * Generates a Fibonacci sequence up to the given number of terms.
 * @param {number} n - Number of terms to generate (must be ≥ 1)
 * @returns {number[]} An array containing the Fibonacci sequence.
 */
function generateFibonacci(n) {
  // Validate the input: must be a positive integer (no strings, decimals, or negatives)
    if (typeof n !== 'number' || n <= 0 || !Number.isInteger(n)) {
      throw new Error('Input must be a positive integer');
    }
  

  // Start the sequence with the first Fibonacci number
    const sequence = [0];
    
    // If user only wants 1 term, return [0]
    if (n === 1) return sequence;

    // Add the second Fibonacci number (1)
    sequence.push(1);
  
    // Generate the rest of the sequence from index 2 up to n
    for (let i = 2; i < n; i++) {

      // Each number is the sum of the two before it
      const next = sequence[i - 1] + sequence[i - 2];
      sequence.push(next);
    }
    return sequence;
  }
  
  module.exports = generateFibonacci;
  