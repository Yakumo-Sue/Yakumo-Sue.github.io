import test from 'node:test'
import assert from 'node:assert/strict'
import {selectStories,restoreCursor,safeURL,splitLines} from './archive.js'
const story=(id,time,release,type='SideStory') => ({id,time,release,type})
test('Terra ordering puts unknown and non-positive dates after known chronology',() => {
 const input=[story('unknown',null,'2019-01-01'),story('late',1097,'2020-01-01'),story('early',1096,'2022-01-01'),story('branch',-1,'2021-01-01')]
 assert.deepEqual(selectStories(input,'all','terra').map(s => s.id),['early','late','unknown','branch'])
 assert.equal(input[0].id,'unknown')
 assert.deepEqual(selectStories(input,'all','release').map(s => s.id),['unknown','late','branch','early'])
})
test('A direct link to another scene does not restore the previous scene line',() => {
 const s={scenes:[{text:'甲。乙。'},{text:'丙。丁。'}]}
 assert.deepEqual(restoreCursor(s,{scene:0,line:1},'1'),{scene:1,line:0})
 assert.deepEqual(restoreCursor(s,{scene:0,line:1},'0'),{scene:0,line:1})
 assert.deepEqual(restoreCursor(s,{scene:999,line:999}),{scene:1,line:1})
 assert.deepEqual(restoreCursor(s,{scene:-20,line:-50}),{scene:0,line:0})
 assert.deepEqual(restoreCursor(s,{scene:0,line:Infinity},'invalid'),{scene:0,line:0})
})
test('External source links reject script and file URLs',() => {
 assert.equal(safeURL('javascript:alert(1)'),'#');assert.equal(safeURL('file:///private'),'#');assert.equal(safeURL('https://prts.wiki/'),'https://prts.wiki/')
})
test('Dialogue splitting keeps sentence endings and an unfinished last sentence',() => {
 assert.deepEqual(splitLines('选择？回答。回忆仍未结束'),['选择？','回答。','回忆仍未结束'])
})
