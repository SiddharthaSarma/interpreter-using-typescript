export { Identifier } from './identifier'
export { ReturnStatement } from './returnStatement'
export { LetStatement } from './letStatement'
export { Program } from './program'

export interface ASTNode {
  tokenLiteral: () => string
}

export interface Statement extends ASTNode {
  statementNode: () => void
}

export interface Expression extends ASTNode {
  expressionNode: () => void
}
