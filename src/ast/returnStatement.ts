import type { Expression, Statement } from '.'
import type { Token } from '../token'

export class ReturnStatement implements Statement {
  token: Token
  returnValue?: Expression

  private constructor (token: Token) {
    this.token = token
  }

  static new (token: Token): ReturnStatement {
    return new ReturnStatement(token)
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

    if (this.returnValue !== undefined) {
      out += this.returnValue.string()
    }
    out += ';'
    return out
  }
}
