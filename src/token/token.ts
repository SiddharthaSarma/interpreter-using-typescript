import { newToken } from '../helpers'

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

export const KEYWORDS = {
  fn: newToken(TOKEN_TYPES.FUNCTION, 'fn'),
  let: newToken(TOKEN_TYPES.LET, 'let')
} as const

export const lookupIdent = (ident: string): TokenType => {
  const token = KEYWORDS[ident as keyof typeof KEYWORDS]
  if (token) {
    return token.type
  }
  return TOKEN_TYPES.IDENT
}

export type TokenType = (typeof TOKEN_TYPES)[keyof typeof TOKEN_TYPES]

export interface Token {
  type: TokenType
  literal: string
}
