import { Token } from "../token/token"

interface ASTNode {
  tokenLiteral: () => string
}

interface Statement extends ASTNode {
  statementNode: () => void
}

interface Expression extends ASTNode {
  expressionNode: () => void
}

export class Program implements ASTNode {
  private readonly statements: Statement[] = []

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
  private readonly token: Token
  private readonly value: Expression

  constructor (token: Token, value: Expression) {
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
  private readonly token: Token
  private readonly identifier: Identifier
  private readonly expression: Expression

  constructor (token: Token, identifier: Identifier, expression: Expression) {
    this.token = token
    this.identifier = identifier
    this.expression = expression
  }

  statementNode (): void {
    // nothing as of now
  }

  tokenLiteral (): string {
    return this.token.literal
  }
}
