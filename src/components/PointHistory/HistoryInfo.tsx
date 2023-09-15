import { HistoryType } from '../../types';

import Typography from '@mui/material/Typography';

type HistoryInfoPropsType = {
	historicalInfo: HistoryType;
};

const HistoryInfo = ({ historicalInfo }: HistoryInfoPropsType) => {
	return (
		<>
			<Typography sx={{ mt: 2, mb: 1, py: 1 }}>
				{historicalInfo.date}
			</Typography>
			<Typography sx={{ mt: 2, mb: 1, py: 1 }}>
				{historicalInfo.name}
			</Typography>
			<Typography sx={{ mt: 2, mb: 1, py: 1 }}>
				{historicalInfo.description}
			</Typography>
		</>
	);
};

export default HistoryInfo;
