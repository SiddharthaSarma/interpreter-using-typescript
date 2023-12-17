import type { Expression, Statement } from '.'
import type { Token } from '../token'
import type { Identifier } from './identifier'

export class LetStatement implements Statement {
  token: Token
  name?: Identifier
  expression?: Expression

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
}
