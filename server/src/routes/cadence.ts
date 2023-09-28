import { Router } from 'express'
import fetch from 'cross-fetch'

const router = Router()

router.get('/:id', async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw new Error('access token missing')
  
    const data = await fetch(`${process.env.SF_URI}/services/data/v57.0/composite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      body: JSON.stringify({
        "compositeRequest" : [
          {
            "method" : "GET",
            "url" : `/services/data/v57.0/query/?q=SELECT+id,+StepTitle,+State,+target.Name,+ActionCadenceStep.StepComments,+StepType+FROM+ActionCadenceStepTracker+WHERE+targetId+=+'${req.params.id}'+AND+State+=+'Active'`,
            "referenceId" : "currentCadenceStep"
          },
          {
            "method" : "GET",
            "url" : `/services/data/v57.0/query/?q=SELECT+id,+StepTitle,+State,+target.Name,+ActionCadenceStep.StepComments,+StepType+FROM+ActionCadenceStepTracker+WHERE+targetId+=+'${req.params.id}'+AND+State+=+'Completed'`,
            "referenceId" : "completedCadenceSteps"
          }
        ]
      })
    }).then(data => data.json())

    res.status(200).json({  data: {
      current: data.compositeResponse[0].body.records,
      completed: data.compositeResponse[1].body.records
    }})
  } catch (error) {
    res.status(200).json({  error: (error as Error).message })
  }
})

router.post('/:id', async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw new Error('access token missing')
    
    const data = await fetch(`${process.env.SF_URI}/services/data/v57.0/actions/standard/assignTargetToSalesCadence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      body: JSON.stringify({
        "inputs": [{
          "salesCadenceNameOrId": "Sales Hub",
          "targetId": req.params.id
        }]
      })
    }).then(data => data.json())

    res.status(200).json({ ...data[0] })
  } catch (error) {
    res.status(200).json({  error: (error as Error).message })
  }
})

export default router