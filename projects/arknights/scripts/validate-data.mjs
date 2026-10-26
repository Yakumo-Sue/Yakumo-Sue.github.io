import {readFile,access} from 'node:fs/promises'
import {gunzipSync} from 'node:zlib'
import assert from 'node:assert/strict'
const root=new URL('../public/',import.meta.url)
const raw=await readFile(new URL('data/archive.json',root))
const archive=JSON.parse(raw),data=JSON.parse(await readFile(new URL('data/operators.json',root),'utf8'))
assert.deepEqual(gunzipSync(await readFile(new URL('data/archive.json.gz',root))),raw,'Archive gzip must match JSON')
assert.equal(archive.stories.length,archive.meta.storyCount)
assert.equal(new Set(archive.stories.map(s => s.id)).size,archive.stories.length,'Duplicate story IDs')
assert.equal(archive.stories.reduce((n,s) => n+s.scenes.length,0),archive.meta.sceneCount)
const files=new Set()
for(const story of archive.stories){
 assert.ok(story.id && story.name && story.scenes.length && story.sources.length)
 assert.match(story.release,/^\d{4}-\d{2}-\d{2}$/)
 assert.ok(story.scenes.every(s => s.text && s.title && s.isOriginalSynopsis === true),'Synopsis label required')
 assert.equal(new Set(story.scenes.map(s => s.id)).size,story.scenes.length)
 for(const scene of story.scenes){if(scene.background && !scene.background.startsWith('http'))files.add(scene.background)}
 if(story.image && !story.image.startsWith('http'))files.add(story.image)
}
assert.equal(data.operators.length,data.meta.count)
assert.equal(new Set(data.operators.map(o => o.id)).size,data.operators.length)
const allForms=[...data.operators,...Object.values(data.formsById || {})],ids=new Set(allForms.map(o => o.id))
for(const o of allForms){assert.ok(o.name && o.profession && o.source);assert.ok(o.formIds.every(id => ids.has(id)),'Broken operator form link');if(o.portrait && !o.portrait.startsWith('http'))files.add(o.portrait)}
for(const path of files)await access(new URL(path,root))
console.log(`Data valid: ${archive.stories.length} stories, ${archive.meta.sceneCount} synopsis scenes, ${data.operators.length} operator entries; ${files.size} local image references.`)
