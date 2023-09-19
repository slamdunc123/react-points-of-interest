import { useState } from 'react';

import { HistoryType } from '../../types';

import HistoryStepper from './HistoryStepper';

import Checkbox from '@mui/material/Checkbox';
import HistoryIcon from '@mui/icons-material/History';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

type PointHistoryPropsType = {
	history: HistoryType[];
};

const PointHistory = ({ history }: PointHistoryPropsType) => {
	const [isHistoryDisplayed, setIsHistoryDisplayed] = useState(false);

	const handleCheckboxOnChange = () => {
		setIsHistoryDisplayed(
			(prevIsHistoryDisplayed) => !prevIsHistoryDisplayed
		);
	};
	return (
		<Box sx={{ mt: 1 }}>
			<Tooltip title='History'>
				<Checkbox
					icon={<HistoryOutlinedIcon />}
					checkedIcon={<HistoryIcon />}
					onChange={handleCheckboxOnChange}
					sx={{ padding: 0 }}
				/>
			</Tooltip>
			{isHistoryDisplayed ? <HistoryStepper history={history} /> : null}
		</Box>
	);
};

export default PointHistory;
