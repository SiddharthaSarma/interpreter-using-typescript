import type { Token } from '../token'

interface ASTNode {
  tokenLiteral: () => string
}

export interface Statement extends ASTNode {
  statementNode: () => void
}

export interface Expression extends ASTNode {
  expressionNode: () => void
}

export class Program implements ASTNode {
  statements: Statement[] = []

  constructor (statements: Statement[]) {
    this.statements = statements
  }

  tokenLiteral (): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral()
    }
    return ''
  }
}

export class Identifier implements Expression {
  token: Token
  value: string

  constructor (token: Token, value: string) {
    this.token = token
    this.value = value
  }

  expressionNode (): void {
    // nothing as of now
  }

  tokenLiteral (): string {
    return this.token.literal
  }
}

export class LetStatement implements Statement {
  token: Token
  name: Identifier
  expression: Expression

  constructor (token: Token, identifier: Identifier, expression: Expression) {
    this.token = token
    this.name = identifier
    this.expression = expression
  }

  statementNode (): void {
    // nothing as of now
  }

  tokenLiteral (): string {
    return this.token.literal
  }
}
