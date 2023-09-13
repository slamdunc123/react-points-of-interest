import { useState } from 'react';

import HistoryInfo from './HistoryInfo';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

const historicalEvents = [
	{
		id: '1',
		date: '1700',
		name: 'Built in this date',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sit ab praesentium dolore voluptate. Sint veritatis illo quos modi corporis, commodi facere minima, architecto numquam dolorem unde exercitationem expedita eligendi.',
	},
	{
		id: '2',
		date: '1800',
		name: 'Rebuilt',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro quibusdam dicta labore nobis placeat laborum ipsum ducimus tempore atque deleniti, itaque iusto, harum ut pariatur quasi qui obcaecati non ipsa?',
	},
	{
		id: '3',
		date: '1900',
		name: 'Became residential',
		description:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus totam est ex id sit culpa facere autem harum! Incidunt illo nam quidem possimus dolore a, impedit ipsa vel nostrum quae.',
	},
];

const HistoryStepper = () => {
	const [activeStep, setActiveStep] = useState(0);

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper nonLinear activeStep={activeStep} orientation='vertical'>
				{historicalEvents.map((item, index) => (
					<Step key={item.id}>
						<StepButton color='inherit' onClick={handleStep(index)}>
							{item.date}
						</StepButton>
					</Step>
				))}
			</Stepper>
			<HistoryInfo historicalInfo={historicalEvents[activeStep]} />
		</Box>
	);
};

export default HistoryStepper;
