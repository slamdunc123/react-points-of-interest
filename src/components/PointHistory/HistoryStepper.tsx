import { useState } from 'react';

import { HistoryType } from '../../types';

import HistoryInfo from './HistoryInfo';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

type HistoryStepperPropsType = {
	history: HistoryType[];
};

const HistoryStepper = ({ history }: HistoryStepperPropsType) => {
	const [activeStep, setActiveStep] = useState(0);

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper nonLinear activeStep={activeStep} orientation='vertical'>
				{history.map((item, index) => (
					<Step key={item.id}>
						<StepButton color='inherit' onClick={handleStep(index)}>
							{item.date}
						</StepButton>
					</Step>
				))}
			</Stepper>
			<HistoryInfo historicalInfo={history[activeStep]} />
		</Box>
	);
};

export default HistoryStepper;
