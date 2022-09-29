import { FormControl, Grid, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const AddressInput = ({ name, label, required }) => {
  const { register } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <TextField {...register(`${name}`)} label={label} variant='standard' />
      </FormControl>
    </Grid>
  );
};

export default AddressInput;
