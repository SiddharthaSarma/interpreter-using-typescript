export const TOKEN_TYPES = {
  ILLEGAL: 'ILLEGAL',
  EOF: 'EOF',
  // Identifiers + literals
  IDENT: 'IDENT', // add, foobar, x, y, ...,
  INT: 'INT', // 1343456,
  // Operators
  ASSIGN: '=',
  PLUS: '+',
  // Delimiters
  COMMA: ',',
  SEMICOLON: ';',
  LPAREN: '(',
  RPAREN: ')',
  LBRACE: '{',
  RBRACE: '}',
  // Keywords
  FUNCTION: 'FUNCTION',
  LET: 'LET'
} as const

export type TokenType = (typeof TOKEN_TYPES)[keyof typeof TOKEN_TYPES]

export interface Token {
  type: TokenType
  literal: string
}
