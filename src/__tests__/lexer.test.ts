import { Lexer } from '../lexer/lexer'
import { TOKEN_TYPES } from '../token/token'

describe('Lexer', () => {
  it('should generate the correct tokens', () => {
    const input = '(){},;'
    const tests = [
      { expectedType: TOKEN_TYPES.LPAREN, expectedLiteral: '(' },
      { expectedType: TOKEN_TYPES.RPAREN, expectedLiteral: ')' },
      { expectedType: TOKEN_TYPES.LBRACE, expectedLiteral: '{' },
      { expectedType: TOKEN_TYPES.RBRACE, expectedLiteral: '}' },
      { expectedType: TOKEN_TYPES.COMMA, expectedLiteral: ',' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' }
    ]

    const lexer = Lexer.newLexer(input)
    for (const test of tests) {
      const token = lexer.nextToken()
      expect(token.literal).toEqual(test.expectedLiteral)
      expect(token.type).toEqual(test.expectedType)
    }
  })
})
