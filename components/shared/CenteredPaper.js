import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


class CenteredPaper extends React.Component {
    render() {
        const { classes } = this.props

        return (
            <Grid
                container
                alignItems="flex-start"
                justify="center"
            >
                <Grid item>
                    <Paper className={classes.paper}>
                        {this.props.children}
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

CenteredPaper.propTypes = {
    classes: PropTypes.object.isRequired,
}

// Style
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 5,
        height: '100%',
        color: theme.palette.text.secondary,
        maxWidth: 600,
    },
})
export default withStyles(styles)(CenteredPaper)