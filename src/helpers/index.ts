import type { Token, TokenType } from '../token'

export const isDigit = (ch: string): boolean => {
  const inputCharCode = ch.charCodeAt(0)
  return '0'.charCodeAt(0) <= inputCharCode && inputCharCode <= '9'.charCodeAt(0)
}

const ASCII_CODES = ['a', 'z', 'A', 'Z', '_'].reduce<Record<string, number>>((acc, char) => {
  acc[char] = char.charCodeAt(0)
  return acc
}, {})

export const isLetter = (ch: string): boolean => {
  const inputCharCode = ch.charCodeAt(0)
  return (ASCII_CODES.a <= inputCharCode && inputCharCode <= ASCII_CODES.z) ||
  (ASCII_CODES.A <= inputCharCode && inputCharCode <= ASCII_CODES.Z) ||
  inputCharCode === ASCII_CODES._
}

export const isWhiteSpaceCharacter = (ch: string): boolean => {
  return ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n'
}

export const newToken = (tokenType: TokenType, literal: string): Token => {
  return {
    type: tokenType,
    literal
  }
}
