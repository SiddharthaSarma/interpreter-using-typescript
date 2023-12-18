import type { Expression, Statement } from '.'
import type { Token } from '../token'

export class ExpressionStatement implements Statement {
  token: Token
  expression?: Expression

  constructor (token: Token) {
    this.token = token
  }

  static new (token: Token): ExpressionStatement {
    return new ExpressionStatement(token)
  }

  tokenLiteral (): string {
    return this.token.literal
  }

  statementNode (): void {}

}
