import { Router } from 'express'
import fetch from 'cross-fetch'

const router = Router()

router.get('', async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw new Error('access token missing')

    if (!req.query.userId)
      throw new Error('query params missing')

    const uri = process.env.SF_URI
      + `/services/data/v57.0/composite`

    const r = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      body: JSON.stringify({
        "compositeRequest" : [
          {
            "method" : "GET",
            "url" : `/services/data/v57.0/query/?q=SELECT+Count(Id)+FROM+Task+WHERE+OwnerId+=+'${req.query.userId}'+AND+Status+!=+'Cancelled'+AND+CreatedDate+=+THIS_MONTH`,
            "referenceId" : "GetTotalTasksAssigned"
          },
          {
            "method" : "GET",
            "url" : `/services/data/v57.0/query/?q=SELECT+Count(Id)+FROM+Task+WHERE+OwnerId+=+'${req.query.userId}'+AND+Status+=+'Completed'+AND+CreatedDate+=+THIS_MONTH`,
            "referenceId" : "GetTotalCompletedTasks"
          },
          {
            "method" : "GET",
            "url" : `/services/data/v57.0/query/?q=SELECT+Count(Id)+FROM+Lead+WHERE+OwnerId+=+'${req.query.userId}'+AND+CreatedDate+=+THIS_MONTH`,
            "referenceId" : "GetTotalLeads"
          },
        ]
      })
    })

    const data: any = await r.json()

    res.send({ data: {
      assigned: data.compositeResponse[0].body.records[0].expr0,
      completed: data.compositeResponse[1].body.records[0].expr0,
      total: data.compositeResponse[2].body.records[0].expr0
    }})
  } catch (error) {
    res.send({ error: (error as Error).message })
  }
})

export default router