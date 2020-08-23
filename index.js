const { execSync } = require('child_process');
const cheerio = require('cheerio');
const os = require('os');
const path = require('path');

const ExtensionConfigPath = path.resolve(os.homedir(), "./.markdown-it-plantuml-ex");

const PlantUMLJarPath = path.resolve(
  path.resolve(__dirname, "./"),
  "./lib/plantuml.jar",
);

module.exports = function markdownItPlantUmlEx(md, options = {}) {

  const openMarker = options.openMarker || '```plantuml'
  const openChar = openMarker.charCodeAt(0)
  const closeMarker = options.closeMarker || '```'
  const closeChar = closeMarker.charCodeAt(0)

  function render(tokens, idx, options, env, slf) {
    const { content, info } = tokens[idx]
    let javaParams = [
      "-Djava.awt.headless=true",
      "-Dfile.encoding=UTF-8",
      "-Dplantuml.include.path=" +
      [this.fileDirectoryPath, ExtensionConfigPath].join(path.delimiter),
      "-jar",
      PlantUMLJarPath,
      "-pipe",
      "-tsvg",
      "-charset",
      "UTF-8"];
    try {
      const svg = execSync('java ' + javaParams.join(' '), { input: content })
      const $svg = cheerio.load(svg, { xmlMode: true })('svg')
      return $svg;
    }
    catch (error) {
      return `<p style="border: 2px dashed red">Failed to render plantumlEx<span>${md.utils.escapeHtml(error.toString())}</span></p>`
    }
  }

  function plantumlEx(state, startLine, endLine, silent) {
    let nextLine
    let i
    let autoClosed = false
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    // Check out the first character quickly,
    // this should filter out most of non-uml blocks
    if (openChar !== state.src.charCodeAt(start)) {
      return false
    }

    // Check out the rest of the marker string
    for (i = 0; i < openMarker.length; ++i) {
      if (openMarker[i] !== state.src[start + i]) {
        return false
      }
    }

    const markup = state.src.slice(start, start + i)
    const params = state.src.slice(start + i, max)

    // Since start is found, we can report success here in validation mode
    if (silent) {
      return true
    }

    // Search for the end of the block
    nextLine = startLine

    for (; ;) {
      nextLine++
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break
      }

      if (closeChar !== state.src.charCodeAt(start)) {
        // didn't find the closing fence
        continue
      }

      if (state.sCount[nextLine] > state.sCount[startLine]) {
        // closing fence should not be indented with respect of opening fence
        continue
      }

      let closeMarkerMatched = true
      for (i = 0; i < closeMarker.length; ++i) {
        if (closeMarker[i] !== state.src[start + i]) {
          closeMarkerMatched = false
          break
        }
      }

      if (!closeMarkerMatched) {
        continue
      }

      // make sure tail has spaces only
      if (state.skipSpaces(start + i) < max) {
        continue
      }

      // found!
      autoClosed = true
      break
    }

    const contents = state.src
      .split('\n')
      .slice(startLine + 1, nextLine)
      .join('\n')

    const token = state.push('plantumlEx', 'fence', 0)
    // token.block = true
    token.info = params
    token.content = contents
    //token.map = [startLine, nextLine]
    // token.markup = markup

    state.line = nextLine + (autoClosed ? 1 : 0)

    return true
  }

  md.block.ruler.before('fence', 'plantumlEx', plantumlEx, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })

  md.renderer.rules.plantumlEx = render
}
