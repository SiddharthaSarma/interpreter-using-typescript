import type { Token, TokenType } from '../token/token'
import { TOKEN_TYPES } from '../token/token'

export class Lexer {
  input: string
  position: number
  readPosition: number
  ch: string | null

  constructor (input: string) {
    this.input = input
    this.position = 0
    this.readPosition = 0
    this.ch = null
  }

  public static newLexer (input: string): Lexer {
    const lexer = new Lexer(input)
    lexer.readChar()
    return lexer
  }

  public readChar (): void {
    if (this.readPosition >= this.input.length) {
      this.ch = null
    } else {
      this.ch = this.input[this.readPosition]
    }
    this.position = this.readPosition
    this.readPosition += 1
  }

  public nextToken (): Token {
    let token: Token = {
      type: TOKEN_TYPES.EOF,
      literal: ''
    }
    switch (this.ch) {
      case TOKEN_TYPES.ASSIGN:
        token = this.newToken(TOKEN_TYPES.ASSIGN, this.ch)
        break
      case TOKEN_TYPES.COMMA:
        token = this.newToken(TOKEN_TYPES.COMMA, this.ch)
        break
      case TOKEN_TYPES.LPAREN:
        token = this.newToken(TOKEN_TYPES.LPAREN, this.ch)
        break
      case TOKEN_TYPES.RPAREN:
        token = this.newToken(TOKEN_TYPES.RPAREN, this.ch)
        break
      case TOKEN_TYPES.LBRACE:
        token = this.newToken(TOKEN_TYPES.LBRACE, this.ch)
        break
      case TOKEN_TYPES.RBRACE:
        token = this.newToken(TOKEN_TYPES.RBRACE, this.ch)
        break
      case TOKEN_TYPES.PLUS:
        token = this.newToken(TOKEN_TYPES.PLUS, this.ch)
        break
      case TOKEN_TYPES.SEMICOLON:
        token = this.newToken(TOKEN_TYPES.SEMICOLON, this.ch)
        break
      case TOKEN_TYPES.FUNCTION:
        token = this.newToken(TOKEN_TYPES.FUNCTION, this.ch)
        break
      case TOKEN_TYPES.LET:
        token = this.newToken(TOKEN_TYPES.LET, this.ch)
        break
    }
    this.readChar()
    return token
  }

  public newToken (tokenType: TokenType, literal: string): Token {
    return {
      type: tokenType,
      literal
    }
  }
}
