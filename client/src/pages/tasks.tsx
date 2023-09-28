import { useEffect } from "react"
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} from "@mui/material"

import { useTasks } from "../providers"

export default function Tasks() {
  const { loading, tasks, getTasks, clearTasks } = useTasks()

  useEffect(() => {
    getTasks()
    return () => clearTasks()
  }, [])

  return (
    <div style={{
      padding: 32
    }}>
      <Typography sx={{ margin: '32px 0 16px 0' }} variant="h4">Tasks</Typography>
      {loading || !tasks.length ? (
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