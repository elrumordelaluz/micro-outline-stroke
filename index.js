const { send, json } = require('micro')
const cors = require('micro-cors')()
const outlineStroke = require('svg-outline-stroke')
const parse = require('urlencoded-body-parser')

const handler = async (req, res) => {
  const { input } = await parse(req)
  if (input) {
    console.log(input);
    try {
      return await outlineStroke(input)
    } catch (err) {
      return send(res, 400, `Error: ${err}`)
    }
  } else {
    return send(res, 400, '"input" field is required')
  }
}

module.exports = cors(handler)
