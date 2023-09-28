import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoadingButton } from "@mui/lab"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import Select from "react-select"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, TextField } from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint'

import { useCustomers } from "../providers"
import { Customer } from "../providers/customers/types"

type Inputs = {
  LastName: string
  FirstName: string
  Email: string
  Phone: number
  Rating: string
  Status: { label: string; value: string },
  LeadSource: string
  //Preferred_Communication_Channels__c: string
  //Preferred_Contact_Timeslot__c: string
  Model__c: { label: string; value: string }
}

export default function CreateCustomer({ variant }: { variant: 'contained' | 'outline' }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { loading, createCustomer } = useCustomers()
  const { control, handleSubmit } = useForm<Inputs>()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data)
    const redirectID = await createCustomer({
      ...data,
      Model__c: data.Model__c.value,
      Status: data.Status.value
    } as Customer)

    if (redirectID)
      navigate(`/customers/${redirectID}`)
  }

  return <>
    {variant === 'contained' && <Button 
      variant="contained"
      onClick={handleOpen}
    >Add customer</Button>}

    {variant === 'outline' && <Button 
      variant="text" 
      startIcon={<ControlPointIcon />}
      onClick={handleOpen}
    >Add Customer</Button>}

    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create Customer</DialogTitle>
        <DialogContent>
          <div style={{ 
            width: '400px',
            padding: '8px 0',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '16px'
          }}>
            <Controller
              name="LastName"
              control={control}
              render={({ field }) => <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                disabled={loading}
                {...field}
              />}
            />

            <Controller
              name="FirstName"
              control={control}
              render={({ field }) => <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                disabled={loading}
                {...field}
              />}
            />

            <Controller
              name="Email"
              control={control}
              render={({ field }) => <TextField
                fullWidth
                label="Email"
                variant="outlined"
                disabled={loading}
                {...field}
              />}
            />

            <Controller
              name="Phone"
              control={control}
              render={({ field }) => <TextField
                fullWidth
                label="Phone number"
                variant="outlined"
                disabled={loading}
                {...field}
              />}
            />

            <Controller
              name="Status"
              control={control}
              render={({ field }) => <Select 
                {...field}
                placeholder="Add customer status" 
                options={[
                  { value: "New", label: "New" },
                  { value: "Test Drive", label: "Test Drive" },
                  { value: "Car Configuration", label: "Car Configuration" },
                  { value: "Offer Sent", label: "Offer Sent" },
                  { value: "Order Placed", label: "Order Placed" },
                  { value: "Handover", label: "Handover" },
                  { value: "On Hold", label: "On Hold" },
                ]} 
              />}
            />

            <FormControl>
              <FormLabel>Customer intrest</FormLabel>
              <Controller
                rules={{ required: true }}
                control={control}
                name="Rating"
                render={({ field }) => <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                  <FormControlLabel
                    value="Cold"
                    control={<Radio />}
                    label="Cold"
                  />
                  <FormControlLabel
                    value="Warm"
                    control={<Radio />}
                    label="Warm"
                  />
                  <FormControlLabel
                    value="Hot"
                    control={<Radio />}
                    label="Hot"
                  />
                </RadioGroup>}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Incoming Channel</FormLabel>
              <Controller
                rules={{ required: true }}
                control={control}
                name="LeadSource"
                render={({ field }) => <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                  <FormControlLabel
                    value="Chat"
                    control={<Radio />}
                    label="Chat"
                  />
                  <FormControlLabel
                    value="Email"
                    control={<Radio />}
                    label="Email"
                  />
                  <FormControlLabel
                    value="Web"
                    control={<Radio />}
                    label="Web"
                  />
                </RadioGroup>}
              />
            </FormControl>

            <Controller
              name="Model__c"
              control={control}
              render={({ field }) => <Select 
                {...field}
                placeholder="Car model interest" 
                options={[
                  { value: "S90", label: "S90" },
                  { value: "V60", label: "V60" },
                  { value: "V90", label: "V90" },
                  { value: "XC40", label: "XC40" }
                ]} 
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
          >Create</LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  </>
}