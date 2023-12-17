import type { ASTNode, Statement } from '.'

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
