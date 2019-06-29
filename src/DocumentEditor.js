import React from 'react'
import {Paper} from '@material-ui/core';
import DocumentsEditorToolbar from './DocumentEditorToolbar'

const styles={
    textarea: {
        width : '100%',
        height : '100%',
        border: 'none',
        overflow: 'auto',
        outline: 'none',    
        WebkitBoxShadow: 'none',
        MozBoxShadow: 'none',
        boxShadow: 'none',
        resize: 'none',
        padding:10
    },
    toolbar: {
        height: 48,
        background: "#383965",
        color:"white",
        padding: 10,
        marginTop: 0,
        marginBottom: 0
    }
}

export default class DocumentsEditor extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            value : this.props.value,
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(event){
        this.props.onChangeEditorValue(event.target.value)
    }

    render() {  
        return (
            <Paper style={Object.assign({}, this.props.styles.Section, this.props.styles.Editor)}>
                <DocumentsEditorToolbar 
                styles={styles}
                name={this.props.name}
                onDeleteElement = {this.props.onDeleteElement}
                onSaveElement = {this.props.onSaveElement}
                />
                <textarea 
                    style={styles.textarea} 
                    value={this.props.value} 
                    onChange={this.onChange}/>
            </Paper>
        )
    }

}
