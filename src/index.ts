import readline from 'readline'
import { TOKEN_TYPES } from './token/token'
import { Lexer } from './lexer/lexer'

const repl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '->'
})

repl.prompt()
repl.on('line', (input: string) => {
  const lexer = Lexer.newLexer(input)
  while (true) {
    const token = lexer.nextToken()
    console.log(token)
    if (token.type === TOKEN_TYPES.EOF) {
      break
    }
  }
  repl.prompt()
})

repl.on('close', () => {
  console.log('have a nice day')
  process.exit(0)
})
