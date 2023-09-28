import { Divider, Typography } from "@mui/material"
import SendEmail from "./send-email"

export default function ProfileTasks() {
  return (
    <div style={{
      backgroundColor: '#eee',
      padding: 24
    }}>
      <Typography variant="h6">Task</Typography>
      <Divider sx={{ margin: '16px 0' }} />
      <SendEmail />
    </div>
  )
}