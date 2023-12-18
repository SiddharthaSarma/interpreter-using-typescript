import { Identifier, LetStatement, Program } from '../ast'
import { TOKEN_TYPES } from '../token'

describe('ast', () => {
  it('should return the proper string', () => {
    const program = Program.new()
    const letStmt = LetStatement.new({ type: TOKEN_TYPES.LET, literal: 'let' })
    letStmt.name = Identifier.new({ type: TOKEN_TYPES.IDENT, literal: 'var' }, 'var')
    letStmt.value = Identifier.new({ type: TOKEN_TYPES.IDENT, literal: 'myVar' }, 'myVar')
    program.statements.push(letStmt)
    expect(program.string()).toEqual('let var = myVar;')
  })
})
