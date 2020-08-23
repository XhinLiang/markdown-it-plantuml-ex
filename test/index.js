'use strict';

var md = require('markdown-it');
var plantuml = require('../');
var assert = require('assert');

var defaultParser = md().use(plantuml);

/*eslint-env mocha*/

describe('plantumlEx', function () {


  let doc1 = "\n\
```plantuml \n\
@startuml \n\
Bob -> Alice : hello \n\
@enduml \n\
``` \n\
  ";

  console.log('input:')
  console.log(doc1);
  let out1 = defaultParser.render(doc1);

  console.log('output:')
  console.log(out1);
  it('should contains svg text', function () {
    assert.equal(out1.includes('Bob</text>'), true)
  });

});

describe('plantumlEx2', function () {


  let doc1 = "\n\
# ThisIsHead1 \n\
```plantuml \n\
@startuml \n\
Bob -> Alice : hello \n\
@enduml \n\
``` \n\
\n\
**ThisIsBoldText**\n\
  ";

  console.log('input:')
  console.log(doc1);
  let out1 = defaultParser.render(doc1);

  console.log('output:')
  console.log(out1);
  
  it('should contains svg text', function () {
    assert.equal(out1.includes('Bob</text>'), true)
    assert.equal(out1.includes('<h1>ThisIsHead1</h1>'), true)
    assert.equal(out1.includes('<strong>ThisIsBoldText</strong>'), true)
  });

  it('should contains markdown head and bold text', function () {
    assert.equal(out1.includes('<h1>ThisIsHead1</h1>'), true)
    assert.equal(out1.includes('<strong>ThisIsBoldText</strong>'), true)
  });

});