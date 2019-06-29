import React from 'react'
import {Paper} from '@material-ui/core';
import Markdown from 'react-markdown'

const markdown = {
    width : '100%',
    height : '100%',
    border: 'none',
    overflowY:'auto',
    outline: 'none'
}

export default class DocumentResult extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            src : "",
        }
        
    }
    getSrc(){
       return this.props.document ? this.props.document.markdown_text : this.state.src;
    }
    render() {
        return (
            <Paper style={Object.assign({}, this.props.styles.Section, this.props.styles.Result)}>
                <Markdown styles={markdown} source={this.getSrc()}/>,
            </Paper>
        )
    }

}
