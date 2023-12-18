import type { Expression, Statement } from '.'
import type { Token } from '../token'
import type { Identifier } from './identifier'

export class LetStatement implements Statement {
  token: Token
  name?: Identifier
  value?: Expression

  private constructor (token: Token) {
    this.token = token
  }

  static new (token: Token): LetStatement {
    return new LetStatement(token)
  }

  statementNode (): void {
    // nothing as of now
  }

  tokenLiteral (): string {
    return this.token.literal
  }

  string (): string {
    let out = ''
    out += this.tokenLiteral() + ' '
    out += this.name?.string()
    out += ' = '

    if (this.value !== undefined && this.value !== null) {
      out += this.value.string()
    }
    out += ';'
    return out
  }
}
