import type { Lexer } from '../lexer'
import { TOKEN_TYPES, type TokenType, type Token } from '../token'
import { Program, LetStatement, ReturnStatement, Identifier } from '../ast'
import type { Expression, Statement } from '../ast'
import { ExpressionStatement } from '../ast/expressionStatement'
import { IntegerLiteral } from '../ast/integerStatement'

type PrefixParseFn = () => Expression
type InfixParseFn = (exp: Expression) => Expression

enum PrecedenceTable {
  LOWEST = 1,
  EQUALS,
  LESSGREATER,
  SUM,
  PRODUCT,
  PREFIX,
  CALL
}

export class Parser {
  private readonly lexer: Lexer
  private currToken!: Token
  private peekToken!: Token
  private readonly errors: string[]
  private readonly prefixParseFns = new Map<TokenType, PrefixParseFn>()
  private readonly infixParseFns = new Map<TokenType, InfixParseFn>()

  private constructor (lexer: Lexer) {
    this.lexer = lexer
    this.errors = []
  }

  static new (lexer: Lexer): Parser {
    const parser = new Parser(lexer)
    parser.nextToken()
    parser.nextToken()

    parser.registerPrefix(TOKEN_TYPES.IDENT, parser.parseIdentifier)
    parser.registerPrefix(TOKEN_TYPES.INT, parser.parseIntegerLiteral)
    return parser
  }

  nextToken (): void {
    this.currToken = this.peekToken
    this.peekToken = this.lexer.nextToken()
  }

  parseIdentifier = (): Expression => {
    return Identifier.new(this.currToken, this.currToken.literal)
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
      case TOKEN_TYPES.RETURN:
        return this.parseReturnStatement()
      default:
        return this.parseExpressionStatement()
    }
  }

  parseExpression (precedence: PrecedenceTable): Expression | undefined {
    const prefix = this.prefixParseFns.get(this.currToken.type)
    if (prefix === undefined) {
      return undefined
    }
    return prefix()
  }

  parseExpressionStatement (): ExpressionStatement {
    const stmt = ExpressionStatement.new(this.currToken)
    stmt.expression = this.parseExpression(PrecedenceTable.LOWEST)

    if (this.peekTokenIs(TOKEN_TYPES.SEMICOLON)) {
      this.nextToken()
    }
    return stmt
  }

  parseIntegerLiteral = (): IntegerLiteral => {
    const stmt = IntegerLiteral.new(this.currToken)
    const value = parseInt(this.currToken.literal, 10)
    if (isNaN(value)) {
      const msg = `cannot parse ${this.currToken.literal} as integer`
      this.errors.push(msg)
    }
    stmt.value = value
    return stmt
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

  parseReturnStatement (): ReturnStatement {
    const stmt = ReturnStatement.new(this.currToken)

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

  registerPrefix (tokenType: TokenType, fn: PrefixParseFn): void {
    this.prefixParseFns.set(tokenType, fn)
  }

  registerInfix (tokenType: TokenType, fn: InfixParseFn): void {
    this.infixParseFns.set(tokenType, fn)
  }
}
