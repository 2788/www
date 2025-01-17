import fs from 'fs'
import { join } from 'path'

const docsDirectory = join(process.cwd(), 'docs')

export function getDoc(filename: string) {
  return fs.readFileSync(join(docsDirectory, filename)).toString()
}
