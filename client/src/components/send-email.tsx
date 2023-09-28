import { useState } from "react"
import { LoadingButton } from "@mui/lab"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Alert, AlertTitle, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

import { useEmail } from "../providers"

type Inputs = {
  to: string
  subject: string
  body: string
}

export default function SendEmail() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const { loading, sendEmail } = useEmail()
  const { control, handleSubmit, reset } = useForm<Inputs>()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  const onSubmit: SubmitHandler<Inputs> = async data => {
    setError(false)
    const success = await sendEmail(data.to, data.subject, data.body)
    if (success) {
      reset()
      handleClose()
    } else {
      setError(true)
    }
  }

  return <>
    <Button 
      variant="contained"
      onClick={handleOpen}
    >Send email</Button>

    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          <div style={{ 
            width: '400px',
            padding: '8px 0',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '16px'
          }}>
            <Collapse in={error}>
              <Alert 
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setError(false)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Error</AlertTitle>
                Something went wrong sending email. Try again...
              </Alert>
            </Collapse>
            
            <Controller
              name="to"
              control={control}
              render={({ field }) => <TextField
                fullWidth
                label="To"
                variant="outlined"
                disabled={loading}
                {...field}
              />}
            />

            <Controller
              name="subject"
              control={control}
              render={({ field }) => <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                disabled={loading}
                {...field}
              />}
            />

            <Controller
              name="body"
              control={control}
              render={({ field }) => <TextField
                fullWidth
                label="Body"
                variant="outlined"
                multiline
                minRows={3}
                disabled={loading}
                {...field}
              />}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <LoadingButton
            type="submit"
            loading={loading}
            loadingPosition="center"
            variant="contained"
          >Send</LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  </>
}