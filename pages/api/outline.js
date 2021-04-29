import outlineStroke from 'svg-outline-stroke'

const handler = async (req, res) => {
  const { input, ...rest } = req.body

  if (input) {
    try {
      const data = await outlineStroke(input, rest)
      return res.status(200).json({ data })
    } catch (err) {
      console.log({ err })
      return res.status(400).send({
        status: 'error',
        message: `There's a problem t`,
      })
    }
  } else {
    return res.status(400).send({
      status: 'error',
      message: `"input" field is required`,
    })
  }
}

export default handler
