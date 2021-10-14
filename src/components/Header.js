import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Header extends React.Component {
  
  render() {
    return (
      <Container fluid className="text-center bg-primary text-white">
          <Row className="row-">
              <Col><h1>CCN Availability</h1></Col>
          </Row>
      </Container>
    );
  }
}
