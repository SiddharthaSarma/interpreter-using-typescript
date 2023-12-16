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
  MINUS: '-',
  BANG: '!',
  ASTERISK: '*',
  SLASH: '/',

  LT: '<',
  GT: '>',

  EQ: '==',
  NOT_EQ: '!=',

  // Delimiters
  COMMA: ',',
  SEMICOLON: ';',
  LPAREN: '(',
  RPAREN: ')',
  LBRACE: '{',
  RBRACE: '}',

  // Keywords
  FUNCTION: 'FUNCTION',
  LET: 'LET',
  TRUE: 'TRUE',
  FALSE: 'FALSE',
  IF: 'IF',
  ELSE: 'ELSE',
  RETURN: 'RETURN'
} as const

export const KEYWORDS = {
  fn: newToken(TOKEN_TYPES.FUNCTION, 'fn'),
  let: newToken(TOKEN_TYPES.LET, 'let'),
  true: newToken(TOKEN_TYPES.TRUE, 'true'),
  false: newToken(TOKEN_TYPES.FALSE, 'false'),
  if: newToken(TOKEN_TYPES.IF, 'if'),
  else: newToken(TOKEN_TYPES.ELSE, 'else'),
  return: newToken(TOKEN_TYPES.RETURN, 'return')
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
