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

  it('should generate tokens for the gibberish code', () => {
    const input = `
      5 < 10 > 5;
      if (5 < 10) {
        return true;
      } else {
        return false;
      }
    `
    const tests = [
      { expectedType: TOKEN_TYPES.INT, expectedLiteral: '5' },
      { expectedType: TOKEN_TYPES.LT, expectedLiteral: '<' },
      { expectedType: TOKEN_TYPES.INT, expectedLiteral: '10' },
      { expectedType: TOKEN_TYPES.GT, expectedLiteral: '>' },
      { expectedType: TOKEN_TYPES.INT, expectedLiteral: '5' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' },
      { expectedType: TOKEN_TYPES.IF, expectedLiteral: 'if' },
      { expectedType: TOKEN_TYPES.LPAREN, expectedLiteral: '(' },
      { expectedType: TOKEN_TYPES.INT, expectedLiteral: '5' },
      { expectedType: TOKEN_TYPES.LT, expectedLiteral: '<' },
      { expectedType: TOKEN_TYPES.INT, expectedLiteral: '10' },
      { expectedType: TOKEN_TYPES.RPAREN, expectedLiteral: ')' },
      { expectedType: TOKEN_TYPES.LBRACE, expectedLiteral: '{' },
      { expectedType: TOKEN_TYPES.RETURN, expectedLiteral: 'return' },
      { expectedType: TOKEN_TYPES.TRUE, expectedLiteral: 'true' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' },
      { expectedType: TOKEN_TYPES.RBRACE, expectedLiteral: '}' },
      { expectedType: TOKEN_TYPES.ELSE, expectedLiteral: 'else' },
      { expectedType: TOKEN_TYPES.LBRACE, expectedLiteral: '{' },
      { expectedType: TOKEN_TYPES.RETURN, expectedLiteral: 'return' },
      { expectedType: TOKEN_TYPES.FALSE, expectedLiteral: 'false' },
      { expectedType: TOKEN_TYPES.SEMICOLON, expectedLiteral: ';' },
      { expectedType: TOKEN_TYPES.RBRACE, expectedLiteral: '}' }
    ]

    const lexer = Lexer.newLexer(input)

    for (const test of tests) {
      const token = lexer.nextToken()
      console.log(token)
      expect(token.type).toEqual(test.expectedType)
      expect(token.literal).toEqual(test.expectedLiteral)
    }
  })
})
