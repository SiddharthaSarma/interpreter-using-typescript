import { Parser } from '../parser'
import { Lexer } from '../lexer'
import type { Statement } from '../ast'
import { LetStatement, ReturnStatement } from '../ast'

describe('Parser', () => {
  it('should parse the let statements', () => {
    const input = `let x = 5;
    let y = 10; 
    let foobar = 25;`

    /* to test the error use the below code
    let x = 5;
    let  = 10;
    let foobar = 25;
    */

    const lexer = Lexer.new(input)
    const parser = Parser.new(lexer)
    const program = parser.parseProgram()

    const errors = parser.getErrors()
    // console.log(errors)
    expect(errors.length).toBe(0)

    expect(program).toBeDefined()
    expect(program?.statements.length).toBe(3)

    const tests = ['x', 'y', 'foobar']
    tests.forEach((test, index) => {
      const stmt = program?.statements[index]
      if (typeof stmt !== 'undefined') {
        expect(testLetStatement(stmt, test)).toBeTruthy()
      }
    })
  })

  it('should parse the return statements', () => {
    const input = `return 5;
    return 10; 
    return 25;`

    const lexer = Lexer.new(input)
    const parser = Parser.new(lexer)
    const program = parser.parseProgram()

    const errors = parser.getErrors()
    // console.log(errors)
    expect(errors.length).toBe(0)

    expect(program).toBeDefined()
    expect(program?.statements.length).toBe(3)

    for (const stmt of program?.statements) {
      expect(stmt instanceof ReturnStatement).toBeTruthy()
      expect(stmt.tokenLiteral()).toBe('return')
    }
  })
})

function testLetStatement (stmt: Statement, expectedValue: string): boolean {
  if (stmt.tokenLiteral() !== 'let' ||
    !(stmt instanceof LetStatement) ||
    stmt.name?.tokenLiteral() !== expectedValue ||
    stmt.name?.value !== expectedValue) {
    return false
  }
  return true
}
