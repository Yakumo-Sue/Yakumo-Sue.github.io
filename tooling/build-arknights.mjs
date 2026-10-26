import {cp, mkdir, rm} from 'node:fs/promises'
import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'

const root=new URL('../',import.meta.url)
const project=new URL('projects/arknights/',root)
const output=new URL('source/arknights/',root)
for(const args of [['test'],['run','build']]) {
  const result=spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm',args,{cwd:fileURLToPath(project),stdio:'inherit',shell:process.platform === 'win32'})
  if(result.error || result.status !== 0) {console.error('Arknights build failed.',result.error || '');process.exit(result.status || 1)}
}
// This directory is generated and ignored by Git. The React source lives in projects/arknights/.
await rm(output,{recursive:true,force:true})
await mkdir(output,{recursive:true})
await cp(new URL('dist/',project),output,{recursive:true})
console.log('React build copied to source/arknights/ for Hexo Pages publishing.')
