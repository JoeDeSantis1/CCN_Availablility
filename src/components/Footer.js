import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Footer extends React.Component {
  
  render() {
    return (
      <Container fluid className="text-center bg-primary fixed-bottom">
          <Row className="row-">
              <Col>
                  <p className="text-center text-white-50">© 2021 Copyright: Joe DeSantis</p>
              </Col>
          </Row>
      </Container>
    );
  }
}