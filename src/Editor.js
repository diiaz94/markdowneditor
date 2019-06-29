import React from 'react'
import { Grid } from '@material-ui/core';
import DocumentList from './DocumentList';
import DocumentEditor from './DocumentEditor';
import DocumentResult from './DocumentResult';
import ConfirmDialog from './ConfirmDialog';
import NameDialog from './NameDialog';

import { createDocument, getDocuments, updateDocument,deleteDocument } from './requests/documents';


const titleConfirmDelete = "Confirmacion";
const messageConfirmDelete = "Esta seguro que desea eliminar este elemento?";
const contentNameDocumentDialog = "Elija un nombre para este documento";
const titleNewDocumentDialog = "Nuevo documento"

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
            documents: [],
            documentSelected : {
                _id: 0,
                name: '',
                markdown_text: ''
            },
            isDocumentSelected : false,
            openConfirmDialog:false,
            openNameDialog:false
        }

        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onChangeEditorValue = this.onChangeEditorValue.bind(this);
        this.onDeleteElement = this.onDeleteElement.bind(this);
        this.onSaveElement = this.onSaveElement.bind(this);
        this.onCancelConfirm = this.onCancelConfirm.bind(this);
        this.onAcceptConfirm = this.onAcceptConfirm.bind(this);

        this.onCancelName = this.onCancelName.bind(this);
        this.onAcceptName = this.onAcceptName.bind(this);

        getDocuments().then(jsonR => {
            this.setState({documents: jsonR.data})
        });
    }

    onSelectionChange(doc) {
        if(this.state.documentSelected._id === doc._id){
            this.setState({documentSelected: {_id:0,name:'',markdown_text:''}, isDocumentSelected: false})
        }else{
            this.setState({documentSelected: doc, isDocumentSelected: true})
        }
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
                this.setState({
                    documents: this.state.documents.map(item => item._id === doc._id ?
                    { ...item, name: doc.name, markdown_text: doc.markdown_text } : 
                    item
                )})
                
            })
        }else{
            this.setState({openNameDialog:true})
        }
    }

    onCancelConfirm(){
        this.setState({openConfirmDialog:false})
    }

    onAcceptConfirm(){
        let doc = this.state.documentSelected;
            deleteDocument(doc._id).then(jsonR => {
                console.log(jsonR);
                 this.setState({
                     documents:this.state.documents.filter(item => item._id !== doc._id),
                     documentSelected:Object.assign({}, {name:'',markdown_text:'',id:0}),
                     openConfirmDialog:false,
                     isDocumentSelected:false})
            })
    }

    onCancelName(){
        this.setState({openNameDialog:false})
    }

    onAcceptName(value){
        if(value === "") return;

        let {markdown_text} = this.state.documentSelected;
        createDocument({name:value,markdown_text}).then(jsonR => {
            this.setState(prevState => {
                return {  
                    documents: [jsonR.data, ...prevState.documents ],
                    documentSelected: Object.assign({}, jsonR.data),
                    isDocumentSelected:true,
                    openNameDialog: false,
                    selected: jsonR.data._id };                                 
            })
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
                    documents= {this.state.documents}
                    selected = {this.state.documentSelected._id}
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
            <NameDialog 
                open={this.state.openNameDialog}
                handleCancel = {this.onCancelName}
                handleAccept = {this.onAcceptName}
                title={titleNewDocumentDialog}
                content={contentNameDocumentDialog}
            />
             </Grid>
            )
    }
}
