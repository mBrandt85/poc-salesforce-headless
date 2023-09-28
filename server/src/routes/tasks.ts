import { Router } from 'express'
import fetch from 'cross-fetch'

const router = Router()

router.get('', async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw new Error('access token missing')

    const uri = process.env.SF_URI
      + '/services/data/v57.0/query/?q=Select+Id+,Status+,Subject+,Who.Name+,ActivityDate+,Priority+,Owner.Name+,WhoId+,OwnerId+From+Task+Order+By+CreatedDate+DESC'

    const r = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      }
    })

    const data: any = await r.json()

    res.send({ data: data.records })
  } catch (error) {
    res.send({ error: (error as Error).message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw new Error('access token missing')

    const uri = process.env.SF_URI
      + `/services/data/v57.0/query/?q=Select+Id+,Status+,Subject+,Who.Name+,ActivityDate+,Priority+,Owner.Name+,WhoId+,OwnerId+From+Task+WHERE+WhoId+=+'${req.params.id}'+Order+By+CreatedDate+DESC`

    const r = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      }
    })

    const data: any = await r.json()

    res.send({ data: data.records })
  } catch (error) {
    res.send({ error: (error as Error).message })
  }
})

export default router