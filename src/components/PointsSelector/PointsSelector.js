import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PointsSelector = ({ points, activePoint, handlePointOnChange }) => {
	return (
		<FormControl fullWidth>
			<InputLabel id='demo-simple-select-label'>Places</InputLabel>
			<Select
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				value={activePoint}
				label='Places'
				onChange={handlePointOnChange}
			>
				{points.map((point) => (
					<MenuItem value={point} key={point.id}>{point.name}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default PointsSelector;
