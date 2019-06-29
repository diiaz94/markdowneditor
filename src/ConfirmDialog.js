


import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ConfirmDialog extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleCancelConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   {this.props.message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.handleCancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={this.props.handleAccept} color="primary" autoFocus>
                    Aceptar
                </Button>
                </DialogActions>
        </Dialog>
        )
    }

}