import type { Expression } from '.'
import type { Token } from '../token'

export class IntegerLiteral implements Expression {
  token: Token
  value?: number

  private constructor (token: Token) {
    this.token = token
  }

  static new (token: Token): IntegerLiteral {
    return new IntegerLiteral(token)
  }

  expressionNode (): void {}

  tokenLiteral (): string {
    return this.token.literal
  }

  string (): string {
    return this.token.literal
  }
}
