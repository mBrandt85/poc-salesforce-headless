import { Router } from 'express'
import fetch from 'cross-fetch'

const router = Router()

router.get('', async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw new Error('access token missing')

    const uri = process.env.SF_URI
      + '/services/data/v57.0/query/?q=Select+Id+,FirstName+,LastName+,Name+,Email+,Phone+,LeadSource+,Preferred_Contact_Date__c+,Preferred_Contact_Timeslot__c+,Status+,Model__c+,Rating+,CurrencyIsoCode+,Market__c+,Description+,CreatedDate+,LastModifiedDate+,OwnerId+,Owner.Name+From+Lead'

    const data = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      }
    }).then(data => data.json())

    res.send({ data: data.records })
  } catch (error) {
    res.send({ error: (error as Error).message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw new Error('access token missing')
  
    if (!req.params.id)
        throw new Error('path params missing')
  
    const uri = process.env.SF_URI
      +`/services/data/v57.0/query/?q=Select+FirstName+,LastName+,Name+,Email+,Phone+,LeadSource+,Preferred_Contact_Date__c+,Preferred_Contact_Timeslot__c+,Status+,Model__c+,Rating+,CurrencyIsoCode+,Market__c+,Description+,CreatedDate+,LastModifiedDate+,OwnerId+,Owner.Name+From+Lead+Where+Id+=+'${req.params.id}'`
    
    const r = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      }
    })

    const data: any = await r.json()

    res.send({ data: data.records[0] })
  } catch (error) {
    res.send({ error: (error as Error).message })
  }
})

router.post('', async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw new Error('access token missing')
  
    const uri = process.env.SF_URI
      +'/services/data/v55.0/sobjects/Lead'
    
    const r = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      body: JSON.stringify(req.body)
    })

    const data: any = await r.json()

    res.send({ data: data.id })
  } catch (error) {
    res.send({ error: (error as Error).message })
  }
})

export default router