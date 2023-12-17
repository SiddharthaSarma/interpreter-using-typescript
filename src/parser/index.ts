import type { Program } from '../ast'
import type { Lexer } from '../lexer'
import type { Token } from '../token'

export class Parser {
  private readonly lexer: Lexer
  private currToken!: Token
  private peekToken!: Token

  private constructor (lexer: Lexer) {
    this.lexer = lexer
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

  parseProgram (): Program | null {
    return null
  }
}
