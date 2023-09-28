import { useEffect } from "react"
import { Link as RouterLink } from 'react-router-dom'
import { Chip, CircularProgress, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

import { useCustomers } from "../providers"
import CreateCustomer from "../components/create-customer"

export default function Customers() {
  const { loading, customers, getCustomers, clearCustomers } = useCustomers()

  useEffect(() => {
    getCustomers()
    return () => clearCustomers()
  }, [])

  return (
    <div style={{
      padding: 32
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        margin: '32px 0 16px 0'
      }}>
        <Typography variant="h4">Customers</Typography>
        <CreateCustomer variant="outline" />
      </div>
      {loading && !customers.length ? (
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
                <TableCell>Status</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Preferred contact</TableCell>
                <TableCell>Model of interest</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Assigned to</TableCell>
                <TableCell>More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map(i => (
                <TableRow
                  key={i.Id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell><Chip label={i.Status} /></TableCell>
                  <TableCell>{i.Name}</TableCell>
                  <TableCell>{i.Preferred_Contact_Date__c}</TableCell>
                  <TableCell>{i.Model__c}</TableCell>
                  <TableCell>{i.LeadSource}</TableCell>
                  <TableCell>{i.Owner.Name}</TableCell>
                  <TableCell>
                    <Link component={RouterLink} to={`/customers/${i.Id}`}>
                      Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}