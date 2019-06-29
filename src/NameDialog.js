


import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class NameDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value:''
        }


        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        this.setState({value: event.target.value})
    }
    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                   {this.props.content}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre"
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.handleCancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => this.props.handleAccept(this.state.value)} color="primary">
                    Aceptar
                </Button>
                </DialogActions>
            </Dialog>
        )
    }

}