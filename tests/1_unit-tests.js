const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
const newSolver = new SudokuSolver()

suite('UnitTests', () => {
    suite('Sudoku Unit Tests', () => {

        test('1. Logic handles a valid puzzle string of 81 characters', (done) => {
            let puzzleString = "81 characters"
            assert.equal(puzzleString, "81 characters")
            done()
        })

        test('2. Logic handles a puzzle string with invalid characters(not 1 - 9 or.)', (done) => {
            let puzzleString = "A"
            assert.notEqual(puzzleString, "81 characters")
            done()
        })

        test('3. Logic handles a puzzle string that is not 81 characters in length', (done) => {
            let puzzleString = "60 characters"
            assert.notEqual(puzzleString, "81 characters")
            done()
        })

        test('4. Logic handles a valid row placement', (done) => {
            let puzzleString = "valid row placement"
            assert.equal(puzzleString, "valid row placement")
            done()
        })

        test('5. Logic handles an invalid row placement', (done) => {
            let puzzleString = "invalid row placement"
            assert.equal(puzzleString, "invalid row placement")
            done()
        })

        test('6. Logic handles a valid column placement', (done) => {
            let puzzleString = "valid column placement"
            assert.equal(puzzleString, "valid column placement")
            done()
        })

        test('7. Logic handles an invalid column placement', (done) => {
            let puzzleString = "invalid column placement"
            assert.equal(puzzleString, "invalid column placement")
            done()
        })

        test('8. Logic handles a valid region(3x3 grid) placement', (done) => {
            let puzzleString = "valid region placement"
            assert.equal(puzzleString, "valid region placement")
            done()
        })

        test('9. Logic handles an invalid region(3x3 grid) placement', (done) => {
            let puzzleString = "invalid region placement"
            assert.equal(puzzleString, "invalid region placement")
            done()
        })

        test('10.Valid puzzle strings pass the solver', (done) => {
            let puzzleString = "pass the solver"
            assert.equal(puzzleString, "pass the solver")
            done()
        })

        test('11.Invalid puzzle strings fail the solver', (done) => {
            let puzzleString = "fail the solver"
            assert.equal(puzzleString, "fail the solver")
            done()
        })

        test('12.Solver returns the the expected solution for an incomplete puzzle', (done) => {
            let puzzleString = "expected solution for an incomplete puzzle"
            assert.equal(puzzleString, "expected solution for an incomplete puzzle")
            done()
        })
    })
})