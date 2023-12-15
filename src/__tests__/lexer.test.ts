import { Lexer } from '../lexer/lexer'
import { TOKEN_TYPES } from '../token/token'

describe('Lexer', () => {
  it('should generate the correct tokens', () => {
    const input = '+=(){},;'
    const tests = [
      { expectedType: TOKEN_TYPES.PLUS, expectedLiteral: '+' },
      { expectedType: TOKEN_TYPES.ASSIGN, expectedLiteral: '=' },
      { expectedType: TOKEN_TYPES.LPAREN, expectedLiteral: '(' },
      { expectedType: TOKEN_TYPES.RPAREN, expectedLiteral: ')' },
      { expectedType: TOKEN_TYPES.LBRACE, expectedLiteral: '{' },
      { expectedType: TOKEN_TYPES.RBRACE, expectedLiteral: '}' },
      { expectedType: TOKEN_TYPES.COMMA, expectedLiteral: ',' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' },
      { expectedType: TOKEN_TYPES.EOF, expectedLiteral: '' }
    ]

    const lexer = Lexer.newLexer(input)
    for (const test of tests) {
      const token = lexer.nextToken()
      expect(token.literal).toEqual(test.expectedLiteral)
      expect(token.type).toEqual(test.expectedType)
    }
  })

  it('should generate tokens for the code', () => {
    const input = `let five = 5;
      let ten = 10;
      let add = fn(x, y) {
        x + y;
      };
      let result = add(five, ten);
    `
    const tests = [
      { expectedType: TOKEN_TYPES.LET, expectedLiteral: 'let' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'five' },
      { expectedType: TOKEN_TYPES.ASSIGN, expectedLiteral: '=' },
      { expectedType: TOKEN_TYPES.INT, expectedLiteral: '5' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' },
      { expectedType: TOKEN_TYPES.LET, expectedLiteral: 'let' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'ten' },
      { expectedType: TOKEN_TYPES.ASSIGN, expectedLiteral: '=' },
      { expectedType: TOKEN_TYPES.INT, expectedLiteral: '10' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' },
      { expectedType: TOKEN_TYPES.LET, expectedLiteral: 'let' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'add' },
      { expectedType: TOKEN_TYPES.ASSIGN, expectedLiteral: '=' },
      { expectedType: TOKEN_TYPES.FUNCTION, expectedLiteral: 'fn' },
      { expectedType: TOKEN_TYPES.LPAREN, expectedLiteral: '(' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'x' },
      { expectedType: TOKEN_TYPES.COMMA, expectedLiteral: ',' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'y' },
      { expectedType: TOKEN_TYPES.RPAREN, expectedLiteral: ')' },
      { expectedType: TOKEN_TYPES.LBRACE, expectedLiteral: '{' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'x' },
      { expectedType: TOKEN_TYPES.PLUS, expectedLiteral: '+' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'y' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' },
      { expectedType: TOKEN_TYPES.RBRACE, expectedLiteral: '}' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' },
      { expectedType: TOKEN_TYPES.LET, expectedLiteral: 'let' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'result' },
      { expectedType: TOKEN_TYPES.ASSIGN, expectedLiteral: '=' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'add' },
      { expectedType: TOKEN_TYPES.LPAREN, expectedLiteral: '(' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'five' },
      { expectedType: TOKEN_TYPES.COMMA, expectedLiteral: ',' },
      { expectedType: TOKEN_TYPES.IDENT, expectedLiteral: 'ten' },
      { expectedType: TOKEN_TYPES.RPAREN, expectedLiteral: ')' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' }
    ]

    const lexer = Lexer.newLexer(input)

    for (const test of tests) {
      const token = lexer.nextToken()
      expect(token.type).toEqual(test.expectedType)
      expect(token.literal).toEqual(test.expectedLiteral)
    }
  })
})
