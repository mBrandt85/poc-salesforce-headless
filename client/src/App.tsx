import { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

import AppBar from './components/appbar'
import { useAuth } from './providers'
import Login from './pages/login'
import Tasks from './pages/tasks'
import Dashboard from './pages/dashboard'
import Customers from './pages/customers'
import Profile from './pages/profile'

interface LinkTabProps {
  label: string;
  to: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={Link}
      {...props}
    />
  )
}

export default function App() {
  const { isAuth } = useAuth()
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return <>
    <AppBar />

    {isAuth && (
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="My dashboard" to="/" />
        <LinkTab label="Tasks" to="/tasks" />
        <LinkTab label="Customers" to="/customers" />
      </Tabs>
    )}

    <Routes>
      {isAuth ? <>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </> : <>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>}
    </Routes>

    <div style={{
      width: '100%',
      height: '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      rowGap: '16px',
      fontSize: '9pt',
      backgroundColor: '#efefef'
    }}>
      <div style={{
        display: 'flex',
        columnGap: '16px'
      }}>
        <span>Cookie Settings</span>
        <span>Legal</span>
        <span>Privacy</span>
        <span>Additional Disclaimers</span>
        <span>CCPA</span>
      </div>
      <div>Copyright © 2020 Volvo Car Corporation (or its affiliates or licensors)</div>
    </div>
  </>
}