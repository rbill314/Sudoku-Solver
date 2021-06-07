const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    const validPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
    const validOutput = "135762984946381257728459613694517832812936745357824196473298561581673429269145378"

    suite('Sudoku Tests Route: /app/solve', () => {
        const apiRoute = "/api/solve"

        test('1. Solve a puzzle with valid puzzle string', (done) => {
            const puzzle = validPuzzle
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.solution, validOutput)
                    done()
                })
        })

        test('2. Solve a puzzle with missing puzzle string', (done) => {
            chai.request(server)
                .post(apiRoute)
                .send({})
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Required field missing")
                    done()
                })
        })

        test('3. Solve a puzzle with invalid characters', (done) => {
            const puzzle = "1.5..2.8G..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Invalid characters in puzzle")
                    done()
                })
        })

        test('4. Solve a puzzle with incorrect length', (done) => {
            const puzzle = "1.5..2.8G..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....."
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Expected puzzle to be 81 characters long")
                    done()
                })
        })

        test('5. Solve a puzzle that cannot be solved', (done) => {
            const puzzle = "1.5..2.84..63.12.7.2..1111111..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.error, "Puzzle cannot be solved")
                    done()
                })
        })

    })

    suite('Sudoku Tests Route: /app/check', () => {
        const apiRoute = "/api/check"
        test('6. Check a puzzle placement with all fields', (done) => {
            const puzzle = validPuzzle
            const coordinate = "A1"
            const value = "1"
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle,
                    coordinate,
                    value
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.isTrue(res.body.valid)
                    done()
                })
        })

        test('7. Check a puzzle placement with single placement conflict', (done) => {
            const puzzle = "15..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            const coordinate = "A1"
            const value = "1"
            chai.request(server)
                .post(apiRoute)
                .send({puzzle, coordinate, value})
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.isNotTrue(res.body.valid)
                    done()
                })
        })

        test('8. Check a puzzle placement with multiple placement conflicts', (done) => {
            const puzzle = "15..2.84..63.1.7.2..5.....9..1.....2.3674.3.7.2..9.47...8..1..16....926914.37."
            const coordinate = "A1"
            const value = "1"
            chai.request(server)
                .post(apiRoute)
                .send({puzzle, coordinate, value})
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.isNotTrue(res.body.valid)
                    done()
                })
        })

        test('9. Check a puzzle placement with all placement conflicts', (done) => {
            const puzzle = ""
            const coordinate = "A1"
            const value = "1"
            chai.request(server)
                .post(apiRoute)
                .send({puzzle, coordinate, value})
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.isNotTrue(res.body.valid)
                    done()
                })
        })

        test('10. Check a puzzle placement with missing required fields', (done) => {
            const puzzle = validPuzzle
            const coordinate = "A1"
            const value = ""
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle,
                    coordinate,
                    value
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.isNotTrue(res.body.valid)
                    done()
                })
        })

        test('11. Check a puzzle placement with invalid characters', (done) => {
            const puzzle = validPuzzle
            const coordinate = "A1"
            const value = "A"
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle,
                    coordinate,
                    value
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.isNotTrue(res.body.valid)
                    done()
                })
        })

        test('12. Check a puzzle placement with incorrect length', (done) => {
            const puzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16...."
            const coordinate = "A1"
            const value = "1"
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle,
                    coordinate,
                    value
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.isNotTrue(res.body.valid)
                    done()
                })
        })

        test('13. Check a puzzle placement with invalid placement coordinate', (done) => {
            const puzzle = validPuzzle
            const coordinate = "A13"
            const value = "1"
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle,
                    coordinate,
                    value
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.isNotTrue(res.body.valid)
                    done()
                })
        })

        test('14. Check a puzzle placement with invalid placement value', (done) => {
            const puzzle = validPuzzle
            const coordinate = "A1"
            const value = "0"
            chai.request(server)
                .post(apiRoute)
                .send({
                    puzzle,
                    coordinate,
                    value
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.isNotTrue(res.body.valid)
                    done()
                })
        })
    })
})