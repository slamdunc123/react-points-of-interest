import { useState } from 'react';

import HistoryStepper from './HistoryStepper';

import Checkbox from '@mui/material/Checkbox';
import HistoryIcon from '@mui/icons-material/History';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import Tooltip from '@mui/material/Tooltip';

const PointHistory = () => {
	const [isHistoryDisplayed, setIsHistoryDisplayed] = useState(false);

	const handleCheckboxOnChange = () => {
		setIsHistoryDisplayed(
			(prevIsHistoryDisplayed) => !prevIsHistoryDisplayed
		);
	};
	return (
		<div>
			<Tooltip title='History'>
				<Checkbox
					icon={<HistoryOutlinedIcon />}
					checkedIcon={<HistoryIcon />}
					onChange={handleCheckboxOnChange}
          sx={{padding: 0}}
				/>
			</Tooltip>
			{isHistoryDisplayed ? <HistoryStepper /> : null}
		</div>
	);
};

export default PointHistory;
