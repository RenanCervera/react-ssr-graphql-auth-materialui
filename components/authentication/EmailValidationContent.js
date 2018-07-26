import React from 'react'
import CenteredPaper from '../shared/CenteredPaper'
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";


class EmailValidationContent extends React.Component {
    render() {
        return (
            <CenteredPaper>
                <Typography variant="title" color="secondary" gutterBottom align="center">
                    Auth boilerplate
                </Typography>
                <Typography variant="display1" gutterBottom>
                    Thanks for registering!
                </Typography>
                <Typography gutterBottom>
                    {`
                        A validation e-mail has been sent to ${this.props.email} with an activation link.
                    `}
                </Typography>
                <Typography gutterBottom>
                    {`
                        Please, verify your email address.
                    `}
                </Typography>
            </CenteredPaper>
        )
    }
}

EmailValidationContent.propTypes = {
    email: PropTypes.object.isRequired,
}

export default EmailValidationContent