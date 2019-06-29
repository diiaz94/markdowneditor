import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/DescriptionOutlined';
import { Paper } from '@material-ui/core';
import { getDocuments } from './requests/documents';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360
    },
    title:{
        color: "white",
        background: "#383965",
        padding: 10,
        marginTop: 0,
        marginBottom: 0
    }
});


class DocumentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            selected: null
        }

        this.loadDocuments()
    }

    updateSelected(doc) {
        this.setState({selected: doc._id});
        this.props.onSelectionChange(doc)
    }

    loadDocuments() {
        getDocuments().then(jsonR => {
            this.setState({documents: jsonR.data})
        })
    }

    formatDate(iso){
        let result = '';
        let date = new Date(iso);
        let now = new Date();
        let epsilonTime = 10,
            second = 1000,
            min = 60 * second,
            hour = 60 * min,
            day = 24 * hour,
            diff = now.getTime() - date.getTime(),
            isToday = now.getDate() === date.getDate() &&
            now.getMonth() === date.getMonth() &&
            now.getFullYear() === date.getFullYear(),
            isYesterday = now.getDate() - 1 === date.getDate() &&
            now.getMonth() === date.getMonth() &&
            now.getFullYear() === date.getFullYear();
            if(isToday){
                if(diff < epsilonTime){
                    result= "Moment ago";
                }else if(diff < min){
                    result= parseInt(diff/second) + " seconds ago";
                }else if(diff < hour){
                    result = parseInt(diff/min) + " minute" + (diff/min > 1 ? "s" : "") + " ago";
                } else if(diff < day/2){
                    result= parseInt(diff/hour) + " hour" + (diff/hour > 1 ? "s" : "") + " ago";
                }else{
                    result= "Today";
                }
            }else  if (isYesterday){
                result= "Yesterday";
            }else{
                result= date.toLocaleDateString()
            }

            return result;
    }

    documents() {
        const {selected} = this.state;
        return this.state.documents.map((document, index) => {
            return <ListItem button
                key={document._id}
                onClick={() => this.updateSelected(document)}
                selected={selected === document._id}
                document={document}>
                <ListItemIcon>
                    <DescriptionIcon/>
                </ListItemIcon>
                <ListItemText 
                    primary={document.name}
                    secondary={this.formatDate(document.created_at)} />
            </ListItem>
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper style={Object.assign({}, this.props.styles.Section, this.props.styles.List)}>
                <Typography  className={classes.title} variant="subtitle1" gutterBottom>
                 {this.props.title}
                </Typography>

                <div className={classes.root}>
                    <List aria-label="Documents" component="nav"> 
                        {this.documents()}    
                    </List>
                </div>
            </Paper>
        )
    }

}

DocumentList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DocumentList);
