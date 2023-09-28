import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Avatar, Button, CircularProgress, Divider, Typography } from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'

import { useCadence } from "../providers"
import { Cadence } from "../providers/cadence/types";

function CadenceCard({ cadence }: { cadence: Cadence }) {
  const [label, setLabel] = useState('Buttom')

  useEffect(() => {
    if (cadence.StepType === 'CreateTask')
      setLabel('Book')

    if (cadence.StepType === 'SendAnEmail')
      setLabel('Create')

    if (cadence.StepType === 'MakeACall')
      setLabel('Call')
  }, [cadence])

  return (
    <div style={{
      display: 'flex',
      columnGap: '16px',
      alignItems: 'center'
    }}>
      <Avatar>
        <DirectionsCarIcon />
      </Avatar>

      <div style={{
        flexGrow: 1
      }}>
        <Typography variant="h6">{cadence.StepTitle}</Typography>
      </div>

      <Button 
        variant="contained"
      >{label}</Button>
    </div>
  )
}

export default function SalesCadence() {
  const { loading, current, completed, getCadence, addCadence, clearCadence } = useCadence()
  const { id } = useParams()

  useEffect(() => {
    if (!id) return

    getCadence(id)
    return () => clearCadence()
  }, [])

  const createCadence = async () => {
    if (!id) return

    addCadence(id)
  }

  return (
    <div style={{
      backgroundColor: '#eee',
      padding: 24
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6">Sales Cadence</Typography>
        {(!loading) ? (
          !current.length && !completed.length && <Button 
            variant="text" 
            startIcon={<ControlPointIcon />}
            onClick={createCadence}
          >Add to sales cadence</Button>
        ) : <CircularProgress />}
      </div>

      {!loading && (!!current.length || !!completed.length) && <>
        <Divider sx={{ margin: '16px 0' }} />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '16px'
        }}>
          {!!completed.length && completed.map(i => <CadenceCard key={i.Id} cadence={i} />)}
          {!!current.length && current.map(i => <CadenceCard key={i.Id} cadence={i} />)}
        </div>
      </>}
    </div>
  )
}