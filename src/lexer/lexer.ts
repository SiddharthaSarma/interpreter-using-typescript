import { isDigit, isLetter, isWhiteSpaceCharacter, newToken } from '../helpers'
import type { Token } from '../token/token'
import { TOKEN_TYPES, lookupIdent } from '../token/token'

export class Lexer {
  input: string
  position: number
  readPosition: number
  ch: string

  constructor (input: string) {
    this.input = input
    this.position = 0
    this.readPosition = 0
    this.ch = ''
  }

  public static newLexer (input: string): Lexer {
    const lexer = new Lexer(input)
    lexer.readChar()
    return lexer
  }

  public readChar (): void {
    if (this.readPosition >= this.input.length) {
      this.ch = ''
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
    this.skipWhiteChar()
    switch (this.ch) {
      case TOKEN_TYPES.ASSIGN:
        if (this.peekChar() === '=') {
          const ch = this.ch
          this.readChar()
          token = newToken(TOKEN_TYPES.EQ, `${ch}${this.ch}`)
        } else {
          token = newToken(TOKEN_TYPES.ASSIGN, this.ch)
        }
        break
      case TOKEN_TYPES.COMMA:
        token = newToken(TOKEN_TYPES.COMMA, this.ch)
        break
      case TOKEN_TYPES.LPAREN:
        token = newToken(TOKEN_TYPES.LPAREN, this.ch)
        break
      case TOKEN_TYPES.RPAREN:
        token = newToken(TOKEN_TYPES.RPAREN, this.ch)
        break
      case TOKEN_TYPES.LBRACE:
        token = newToken(TOKEN_TYPES.LBRACE, this.ch)
        break
      case TOKEN_TYPES.RBRACE:
        token = newToken(TOKEN_TYPES.RBRACE, this.ch)
        break
      case TOKEN_TYPES.PLUS:
        token = newToken(TOKEN_TYPES.PLUS, this.ch)
        break
      case TOKEN_TYPES.MINUS:
        token = newToken(TOKEN_TYPES.MINUS, this.ch)
        break
      case TOKEN_TYPES.LT:
        token = newToken(TOKEN_TYPES.LT, this.ch)
        break
      case TOKEN_TYPES.GT:
        token = newToken(TOKEN_TYPES.GT, this.ch)
        break
      case TOKEN_TYPES.BANG:
        if (this.peekChar() === '=') {
          const ch = this.ch
          this.readChar()
          token = newToken(TOKEN_TYPES.NOT_EQ, `${ch}${this.ch}`)
        } else {
          token = newToken(TOKEN_TYPES.BANG, this.ch)
        }
        break
      case TOKEN_TYPES.SLASH:
        token = newToken(TOKEN_TYPES.SLASH, this.ch)
        break
      case TOKEN_TYPES.ASTERISK:
        token = newToken(TOKEN_TYPES.ASTERISK, this.ch)
        break
      case TOKEN_TYPES.SEMICOLON:
        token = newToken(TOKEN_TYPES.SEMICOLON, this.ch)
        break
      default:
        if (isLetter(this.ch)) {
          token.literal = this.readIdentifier()
          token.type = lookupIdent(token.literal)
          // assign token type here
          return token
        }
        if (isDigit(this.ch)) {
          token.type = TOKEN_TYPES.INT
          token.literal = this.readNumber()
          return token
        }
    }
    this.readChar()
    return token
  }

  skipWhiteChar (): void {
    while (isWhiteSpaceCharacter(this.ch)) {
      this.readChar()
    }
  }

  peekChar (): string {
    if (this.readPosition >= this.input.length) {
      return ''
    } else {
      return this.input[this.readPosition]
    }
  }

  public readIdentifier (): string {
    const position = this.position
    while (isLetter(this.ch)) {
      this.readChar()
    }
    return this.input.slice(position, this.position)
  }

  public readNumber (): string {
    const position = this.position
    while (isDigit(this.ch)) {
      this.readChar()
    }
    return this.input.slice(position, this.position)
  }
}
