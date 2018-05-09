import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button, Dropdown } from "semantic-ui-react";
import { feedback, recruiters } from "../../common/common";
import { Link } from "react-router-dom";

class SubmissionsForm extends Component {
  render() {
    const { submissions } = this.props;

    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell textAlign="center">{submissions.createdAt}</Table.Cell>
          <Table.Cell textAlign="center">
            {submissions.consultantName}
          </Table.Cell>
          <Table.Cell textAlign="center">{submissions.skillset}</Table.Cell>
          <Table.Cell textAlign="center">
            {submissions.interviewDate}
          </Table.Cell>
          <Table.Cell textAlign="center" width={3}>
            <Dropdown placeholder="Status" fluid selection options={feedback} />
          </Table.Cell>
          <Table.Cell textAlign="center" width={3}>
            <Dropdown
              placeholder="Status"
              fluid
              selection
              options={recruiters}
            />
          </Table.Cell>
          <Table.Cell textAlign="center">
            <Button.Group>
              <Button
                as={Link}
                to={`/editSubmission/${submissions._id}`}
                size="mini"
              >
                Edit
              </Button>
              <Button.Or />
              <Button size="mini">Save</Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }
}

SubmissionsForm.propTypes = {
  submissions: PropTypes.object.isRequired
};

export default SubmissionsForm;
