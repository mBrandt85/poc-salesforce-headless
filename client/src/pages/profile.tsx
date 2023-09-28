import { useEffect } from "react"
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Breadcrumbs, Chip, CircularProgress, Divider, Link, Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

import { useCustomers } from "../providers"
import SalesCadence from "../components/sales-cadence"
import ProfileTasks from "../components/profile-tasks"

export default function Profile() {
  const { loading, customers, getCustomer, clearCustomers } = useCustomers()
  const { id } = useParams()

  useEffect(() => {
    if (!id)
      return 

    getCustomer(id)
    return () => clearCustomers()
  }, [])

  return (
    <div style={{
      padding: 32
    }}>
      {loading || !customers.length ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32
        }}>
          <CircularProgress />
        </div>
      ) : <>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '48px' }}>
          <Link underline="hover" color="inherit" component={RouterLink} to="/customers">
            Customers
          </Link>
          <Typography color="text.primary">{customers[0].Name}</Typography>
        </Breadcrumbs>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div style={{
            width: '40%'
          }}>
            <Chip label={customers[0].Status} />
            <Typography variant="h4" sx={{ margin: '24px 0' }}>{customers[0].Name}</Typography>
            <Divider />

            <div style={{
              padding: '16px 0'
            }}>
              <div style={{ color: '#999', fontSize: '9pt', marginBottom: '8px' }}>Email</div>
              <div style={{ 
                display: 'flex',
                columnGap: '16px',
                alignItems: 'center'
              }}>
                <EmailIcon />
                <span>{customers[0].Email ?? 'N/A'}</span>
              </div>
            </div>

            <Divider />

            <div style={{
              padding: '16px 0'
            }}>
              <div style={{ color: '#999', fontSize: '9pt', marginBottom: '8px' }}>Phone</div>
              <div style={{ 
                display: 'flex',
                columnGap: '16px',
                alignItems: 'center'
              }}>
                <PhoneIcon />
                <span>{customers[0].Phone ?? 'N/A'}</span>
              </div>
            </div>

            <Divider />

            <div style={{
              padding: '16px 0'
            }}>
              <div style={{ color: '#999', fontSize: '9pt', marginBottom: '8px' }}>Incomming channel</div>
              <div style={{ 
                display: 'flex',
                columnGap: '16px',
                alignItems: 'center'
              }}>
                <span>{customers[0].LeadSource ?? 'N/A'}</span>
              </div>
            </div>

            <Divider />

            <div style={{
              padding: '16px 0'
            }}>
              <div style={{ color: '#999', fontSize: '9pt', marginBottom: '8px' }}>Customer Intrerest</div>
              <div style={{ 
                display: 'flex',
                columnGap: '16px',
                alignItems: 'center'
              }}>
                <span>N/A</span>
              </div>
            </div>
          </div>

          <div style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 24
          }}>
            <SalesCadence />
            <ProfileTasks />
          </div>
        </div>
      </>}
    </div>
  )
}