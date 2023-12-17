import type { Expression, Statement } from '.'
import type { Token } from '../token'

export class ReturnStatement implements Statement {
  token: Token
  value?: Expression

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
}
