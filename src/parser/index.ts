import type { Lexer } from '../lexer'
import { TOKEN_TYPES, type TokenType, type Token } from '../token'
import { Program, LetStatement, Identifier } from '../ast'
import type { Statement } from '../ast'

export class Parser {
  private readonly lexer: Lexer
  private currToken!: Token
  private peekToken!: Token
  private readonly errors: string[]

  private constructor (lexer: Lexer) {
    this.lexer = lexer
    this.errors = []
  }

  static new (lexer: Lexer): Parser {
    const parser = new Parser(lexer)
    parser.nextToken()
    parser.nextToken()
    return parser
  }

  nextToken (): void {
    this.currToken = this.peekToken
    this.peekToken = this.lexer.nextToken()
  }

  parseProgram (): Program {
    const program = Program.new()
    while (!this.currTokenIs(TOKEN_TYPES.EOF)) {
      const stmt = this.parseStatement()
      if (stmt !== null) {
        program.statements.push(stmt)
      }
      this.nextToken()
    }
    return program
  }

  parseStatement (): Statement | null {
    switch (this.currToken.type) {
      case TOKEN_TYPES.LET:
        return this.parseLetStatement()
      default:
        return null
    }
  }

  parseLetStatement (): LetStatement | null {
    const stmt = LetStatement.new(this.currToken)

    if (!this.expectPeek(TOKEN_TYPES.IDENT)) {
      return null
    }

    stmt.name = Identifier.new(this.currToken, this.currToken.literal)

    if (!this.expectPeek(TOKEN_TYPES.ASSIGN)) {
      return null
    }

    while (!this.currTokenIs(TOKEN_TYPES.SEMICOLON)) {
      this.nextToken()
    }
    return stmt
  }

  expectPeek (t: TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken()
      return true
    }
    this.peekErrors(t)
    return false
  }

  peekErrors (t: TokenType): void {
    const msg = `Expected ${t} but got ${this.peekToken.type} instead`
    this.errors.push(msg)
  }

  getErrors (): string[] {
    return this.errors
  }

  currTokenIs (t: TokenType): boolean {
    return this.currToken.type === t
  }

  peekTokenIs (t: TokenType): boolean {
    return this.peekToken.type === t
  }
}
