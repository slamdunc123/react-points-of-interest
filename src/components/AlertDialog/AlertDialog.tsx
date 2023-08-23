import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type AlertDialogPropsType = {
	description: string;
	alertDialogOpen: boolean;
	handleAlertDialogClose: () => void;
};
export default function AlertDialog({
	description,
	alertDialogOpen,
	handleAlertDialogClose,
}: AlertDialogPropsType) {
	return (
		<div>
			<Dialog
				open={alertDialogOpen}
				onClose={handleAlertDialogClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Error</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAlertDialogClose} autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
