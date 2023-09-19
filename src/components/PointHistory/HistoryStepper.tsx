import { useCallback, useEffect, useState } from 'react';

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
	const [historySortedByDateAsc, setHistorySortedByDateAsc] =
		useState<HistoryType[]>();

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const sortHistoryByDate = useCallback(() => {
		const historyToSort = [...history];
		const historySorted = historyToSort.sort(
			(a: any, b: any) => a.date - b.date
		);
		setHistorySortedByDateAsc(historySorted);
	}, [history]);

	useEffect(() => {
		sortHistoryByDate();
	}, [sortHistoryByDate]);

	return (
		<Box sx={{ width: '100%', mt: 1 }}>
			<Stepper nonLinear activeStep={activeStep} orientation='vertical'>
				{historySortedByDateAsc?.map((item, index) => (
					<Step key={item.id}>
						<StepButton color='inherit' onClick={handleStep(index)}>
							{item.date}
						</StepButton>
					</Step>
				))}
			</Stepper>
			{historySortedByDateAsc && (
				<HistoryInfo
					historicalInfo={historySortedByDateAsc[activeStep]}
				/>
			)}
		</Box>
	);
};

export default HistoryStepper;
