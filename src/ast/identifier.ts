import type { Expression } from '.'
import type { Token } from '../token'

export class Identifier implements Expression {
  token: Token
  value: string

  private constructor (token: Token, value: string) {
    this.token = token
    this.value = value
  }

  static new (token: Token, value: string): Identifier {
    return new Identifier(token, value)
  }

  expressionNode (): void {
    // nothing as of now
  }

  tokenLiteral (): string {
    return this.token.literal
  }

  string (): string {
    return this.value
  }
}
