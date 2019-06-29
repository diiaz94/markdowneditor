import React from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ContentSaveIcon from '@material-ui/icons/Save';


const styles = theme => ({
      icon: {
        fontSize: 24,
        align: "end",
        cursor: "pointer"
      },
      sectionIcons:{
          textAlign: "end"
      }
});


class DocumentEditorToolbar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            value : this.props.value,
        }
    }

    render(){
        const {classes} = this.props;
        return(
            <Grid container style={this.props.styles.toolbar}>
              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1">
                 {this.props.name}
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.sectionIcons}> 
                <DeleteOutlinedIcon className={classes.icon}  onClick={this.props.onDeleteElement}/>
                <ContentSaveIcon className={classes.icon}  onClick={this.props.onSaveElement}/>
              </Grid>
            </Grid>
        )
    }
}

DocumentEditorToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DocumentEditorToolbar);