const { send, json } = require('micro')
const outlineStroke = require('svg-outline-stroke')

const parse = require('urlencoded-body-parser')

module.exports = async (req, res) => {
  const { input, width, height } = await parse(req)
  if (input) {
    try {
      return await outlineStroke(input, { width, height })
    } catch (err) {
      send(res, 400, `Error: ${err}`)
    }
  } else {
    send(res, 400, '"input" field is required')
  }

  return 'Data logged to your console'
}
