import { Parser } from '../parser'
import { Lexer } from '../lexer'
import type { Statement } from '../ast'
import { Identifier, LetStatement, ReturnStatement } from '../ast'
import { ExpressionStatement } from '../ast/expressionStatement'
import { IntegerLiteral } from '../ast/integerStatement'

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

  it('should parse the expression statement', () => {
    const input = 'foobar;'

    const lexer = Lexer.new(input)
    const parser = Parser.new(lexer)
    const program = parser.parseProgram()

    const errors = parser.getErrors()
    expect(errors.length).toBe(0)

    expect(program.statements.length).toBe(1)
    const stmt = program.statements[0]
    expect(stmt instanceof ExpressionStatement).toBeTruthy()

    const ident = (stmt as ExpressionStatement).expression
    expect(ident instanceof Identifier).toBeTruthy()

    expect((ident as Identifier).value).toBe('foobar')
    expect((ident as Identifier).tokenLiteral()).toBe('foobar')
  })

  it('should parse the integer expression', () => {
    const input = '5;'

    const lexer = Lexer.new(input)
    const parser = Parser.new(lexer)
    const program = parser.parseProgram()

    const errors = parser.getErrors()
    expect(errors.length).toBe(0)

    expect(program.statements.length).toBe(1)

    const stmt = (program.statements[0] as ExpressionStatement)?.expression
    expect(stmt instanceof IntegerLiteral).toBeTruthy()

    expect((stmt as IntegerLiteral).value).toBe(5)
    expect((stmt as IntegerLiteral).tokenLiteral()).toBe('5')
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
