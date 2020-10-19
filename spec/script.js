import results from '../results/index.mjs'
import * as display from '../lib/display.mjs'
import { modalOpen } from '../lib/modal.mjs'
import baseTests from '../tests/index.mjs'


function populateLinks() {
  var testAnchors = {}
  baseTests.forEach(suite => {
    if (suite.spec_anchors) {
      suite.spec_anchors.forEach(anchor => {
        adornSpecSection(anchor, suite.id, suite.name)
      })
    }
    suite.tests.forEach(test => {
      if (test.spec_anchors) {
        test.spec_anchors.forEach(anchor => {
          if (anchor in testAnchors) {
            var val = testAnchors[anchor]
            val.push(test.id)
            testAnchors[anchor] = val
          } else {
            testAnchors[anchor] = [test.id]
          }
        })
      }
    })
  })
  for (var anchor in testAnchors) {
    adornSpecSection(anchor, testAnchors[anchor])
  }
}

function adornSpecSection(anchor, target, name) {
  var anchorNode = document.getElementById(anchor)
  if (! anchorNode) {
    console.log(`Anchor ${anchor} not found.`)
    return
  }
  var headerNode = anchorNode.children[0]
  var wrapper = document.createElement('span')
  wrapper.classList.add('adornment')
  wrapper.title = name
  var adornment = document.createTextNode('ℹ️')
  wrapper.appendChild(adornment)
  wrapper.addEventListener('click', function (event) {
    event.preventDefault()
    if (typeof target === 'string') {
      showSuite(target)
    } else {
      showTests(target)
    }
    this.scrollIntoView(true)
  })
  headerNode.appendChild(wrapper)

}

function showSuite(suite_id) {
  var iframeNode = document.createElement('iframe')
  iframeNode.id = 'resultsFrame'
  iframeNode.setAttribute("src", `/index.html?suite=${suite_id}&frame=1`)
  document.body.appendChild(iframeNode)
}

function showTests(test_ids) {
  var iframeNode = document.createElement('iframe')
  iframeNode.id = 'resultsFrame'
  var query = test_ids.map(id => `id=${id}`).join("&")
  iframeNode.setAttribute("src", `/index.html?${query}&frame=1`)
  document.body.appendChild(iframeNode)
}

populateLinks()