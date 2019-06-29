import React from 'react'
import { Grid } from '@material-ui/core';
import DocumentList from './DocumentList';
import DocumentEditor from './DocumentEditor';
import DocumentResult from './DocumentResult';
import ConfirmDialog from './ConfirmDialog';


import { updateDocument,deleteDocument } from './requests/documents';

const titleConfirmDelete = "Confirmacion"
const messageConfirmDelete = "Esta seguro que desea eliminar este elemento?"
const styles = {
    List: {

    },
    Editor: {
      
    },
    Result: {
        background: "#f3f2f2",
    },
    SectionContainer: {

    },
    Section: {
        height: 550,
        overflowY:'auto'
    }
}

export default class Editor extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isDocumentSelected : false,

            documentSelected : {
                name: '',
                markdown_text: ''
            },
            openConfirmDialog:false
        }

        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onChangeEditorValue = this.onChangeEditorValue.bind(this);
        this.onDeleteElement = this.onDeleteElement.bind(this);
        this.onSaveElement = this.onSaveElement.bind(this);
        this.onCancelConfirm = this.onCancelConfirm.bind(this);
        this.onAcceptConfirm = this.onAcceptConfirm.bind(this);

    }
    onSelectionChange(doc) {
        this.setState({documentSelected: doc,isDocumentSelected: true})
    }

    onChangeEditorValue(value) {
        this.setState(prevState => {
            let documentSelected = Object.assign({}, prevState.documentSelected); 
            documentSelected.markdown_text = value;                           
            return { documentSelected };                                 
        })
    }

    onDeleteElement(){
        if(this.state.isDocumentSelected){
            this.setState({openConfirmDialog:true})
        }
    }

    onSaveElement(){
        if(this.state.isDocumentSelected){
            let doc = this.state.documentSelected;
            updateDocument(doc._id, doc).then(jsonR => {
                console.log(jsonR);
            })
        }else{

        }
    }

    onCancelConfirm(){
        this.setState({openConfirmDialog:false})
    }

    onAcceptConfirm(){
        let doc = this.state.documentSelected;
            deleteDocument(doc._id).then(jsonR => {
                console.log(jsonR);
                 this.setState({openConfirmDialog:false})
            })
    }

    render() {
        return (
        <Grid container
            spacing={1}
            style={styles.SectionContainer}>
            <Grid item sm={2}>
                <DocumentList 
                    styles={styles}
                    title="Markdowneditor"
                    onSelectionChange={this.onSelectionChange} />
            </Grid>
            <Grid item sm={5}>
                <DocumentEditor 
                styles={styles} 
                name={this.state.documentSelected.name}
                value={this.state.documentSelected.markdown_text}
                onChangeEditorValue={this.onChangeEditorValue}
                onDeleteElement={this.onDeleteElement}
                onSaveElement={this.onSaveElement}
                />
            </Grid>
            <Grid item sm={5}>
                <DocumentResult styles={styles} document={this.state.documentSelected}/>
            </Grid>
            <ConfirmDialog 
                open={this.state.openConfirmDialog}
                handleCancel = {this.onCancelConfirm}
                handleAccept = {this.onAcceptConfirm}
                title={titleConfirmDelete}
                message={messageConfirmDelete}
            />
        </Grid>)
    }
}
