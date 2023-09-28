import { useEffect } from "react"
import {
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} from "@mui/material"

import { useLeads, useTasks } from "../providers"
import CreateCustomer from "../components/create-customer"

function Card({ label, value, loading }: { label: string, value: any, loading: boolean }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', 
      flexGrow: 1,
      backgroundColor: '#eee',
      height: 140,
      marginTop: 16
    }}>
      {loading 
        ? <CircularProgress />
        : <Typography sx={{ margin: '0 0 8px' }} variant="h3">{value}</Typography>
      }
      <Typography variant="body2">{label}</Typography>
    </div>
  )
}

export default function Dashboard() {
  const { loading: loadingTasks, tasks, getTasks, clearTasks } = useTasks()
  const { loading: loadingLeads, assigned, completed, total, getLeads, clearLeads } = useLeads()

  useEffect(() => {
    getTasks()
    getLeads()

    return () => {
      clearTasks()
      clearLeads()
    }
  }, [])

  return (
    <div style={{
      padding: 32
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div style={{ width: '30%' }}>
          <Typography sx={{ margin: '16px 0' }} variant="h5">Add customer</Typography>
          <Divider sx={{ marginBottom: '16px' }} />
          <CreateCustomer variant="contained" />
        </div>

        <div style={{ width: '60%' }}>
          <Typography sx={{ margin: '16px 0' }} variant="h5">Performance</Typography>
          <Divider />

          <div style={{
            display: 'flex',
            columnGap: 16
          }}>
            <Card label="Assigned tasks:" value={assigned} loading={loadingLeads} />
            <Card label="Total leads:" value={total} loading={loadingLeads} />
            <Card label="Completed tasks:" value={`${completed}/${total}`} loading={loadingLeads} />
          </div>
        </div>
      </div>

      <Typography sx={{ margin: '32px 0 16px 0' }} variant="h4">Tasks</Typography>
      {loadingTasks && !tasks.length ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32
        }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#eee' }}>
              <TableRow>
                <TableCell>Stage</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Due date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Assigned to</TableCell>
                <TableCell>More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map(i => (
                <TableRow
                  key={i.Id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{i.Status}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{i.Who && i.Who.Name ? i.Who.Name : 'N/A'}</TableCell>
                  <TableCell>{i.ActivityDate ?? 'N/A'}</TableCell>
                  <TableCell>{i.Priority}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}