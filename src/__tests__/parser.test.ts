import { Parser } from '../parser'
import { Lexer } from '../lexer'
import type { Statement } from '../ast'
import { LetStatement } from '../ast'

describe('Parser', () => {
  it('should parse the let statements', () => {
    const input = `let x = 5;
    let y = 10;
    let foobar = 25;`

    const lexer = Lexer.new(input)
    const parser = Parser.new(lexer)
    const program = parser.parseProgram()

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
})

function testLetStatement (stmt: Statement, expectedValue: string): boolean {
  if (stmt.tokenLiteral() !== 'let' ||
    !(stmt instanceof LetStatement) ||
    stmt.name.tokenLiteral() !== expectedValue ||
    stmt.name.value !== expectedValue) {
    return false
  }
  return true
}
