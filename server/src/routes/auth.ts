import { Router } from 'express'
import fetch from 'cross-fetch'

const router = Router()

router.post('', async (req, res) => {
  try {
    const token = await fetch(`${process.env.SF_URI}/services/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: [
          `client_id=${process.env.SF_CLIENT_ID}`,
          `client_secret=${process.env.SF_CLIENT_SECRET}`,
          'grant_type=password',
          `username=${req.body.username}`,
          `password=${req.body.password}`,
        ].join('&')
    }).then(data => data.json())

    if (!token.access_token)
      throw new Error('error generating access token')

    const user = await fetch(`${process.env.SF_URI}/services/data/v57.0/query/?q=SELECT+Id,+Username,+LastName,+FirstName,+Name,+Email,+VCC_Market__c,+Migration_CDS_ID__c,+UserRole.name+FROM+User+Where+Migration_CDS_ID__c+=+'JVALLANC'+Limit+1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token
      }
    }).then(data => data.json())

    if (!user.records[0])
      throw new Error('could not fetch user record')

    res.status(200).json({ 
      token: token.access_token, 
      user: user.records[0] 
    })
  } catch (error) {
    res.status(200).json({ error: (error as Error).message })
  }
})

export default router