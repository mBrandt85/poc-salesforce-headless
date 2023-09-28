import { Router } from 'express'
import fetch from 'cross-fetch'

const router = Router()

router.post('', async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw new Error('access token missing')

    const data = await fetch(`${process.env.SF_URI}/services/data/v57.0/actions/standard/emailSimple`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      body: JSON.stringify({
        "inputs" : [{
          "emailAddresses" : req.body.to,
          "emailBody" : req.body.body,
          "emailSubject" : req.body.subject
        }]
      })
    }).then(data => data.json())

    res.status(200).json({ success: data[0].isSuccess ?? false })
  } catch (error) {
    res.send({ error: (error as Error).message })
  }
})

export default router