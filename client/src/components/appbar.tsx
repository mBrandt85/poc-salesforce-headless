import { 
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Divider,
  Avatar
} from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SchoolIcon from '@mui/icons-material/School'

import { useAuth } from '../providers'

export default function AppBar() {
  const { isAuth, user } = useAuth()

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <AppsIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Volvo Sales Hub
        </Typography>

        {isAuth ? (
          <div style={{
            display: 'flex',
            columnGap: 8
          }}>
            <Button color="inherit" startIcon={
              <Avatar sx={{ width: 24, height: 24 }}>{user?.Name.substring(0, 1)}</Avatar>
            } sx={{ textTransform: 'none' }}>{user?.Name}</Button>

            <Divider orientation="vertical" flexItem />
            
            <IconButton
              color="inherit"
              aria-label="settings"
            >
              <SettingsIcon />
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="notifications"
            >
              <NotificationsNoneIcon />
            </IconButton>
            
            <IconButton
              color="inherit"
              aria-label="help"
            >
              <HelpOutlineIcon />
            </IconButton>

            <IconButton
              edge="end"
              color="inherit"
              aria-label="school"
            >
              <SchoolIcon />
            </IconButton>
          </div>
        ) : (
          <Button color="inherit">Login</Button>
        )}
      </Toolbar>
    </MuiAppBar>
  )
}