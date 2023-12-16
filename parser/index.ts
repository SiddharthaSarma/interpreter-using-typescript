import type { Program } from '../src/ast'
import type { Lexer } from '../src/lexer/lexer'
import type { Token } from '../src/token/token'

export class Parser {
  private readonly lexer: Lexer
  private currToken!: Token
  private peekToken!: Token

  private constructor (lexer: Lexer) {
    this.lexer = lexer
  }

  createParser (lexer: Lexer): Parser {
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
