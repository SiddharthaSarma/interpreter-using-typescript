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

  private constructor (statements: Statement[]) {
    this.statements = statements
  }

  static new (): Program {
    const program = new Program([])
    return program
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
}

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
