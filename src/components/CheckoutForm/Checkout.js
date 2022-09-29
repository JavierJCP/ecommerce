import { Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';
import AddressForm from './AddressForm';
import Confirmation from './Confirmation';
import PaymentForm from './PaymentForm';
import './styles/checkout.css';

export default function Checkout() {
  const steps = ['Shipping address', 'Payment details'];
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm nextStep={nextStep} />
    ) : (
      <PaymentForm backStep={backStep} nextStep={nextStep} />
    );

  return (
    <div className='container'>
      <main className='layout'>
        <Paper className='papper'>
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ padding: 2 }}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            <Form className='formulario' />
          )}
        </Paper>
      </main>
    </div>
  );
}
