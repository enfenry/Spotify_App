import React from 'react';
import './SearchBar.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SearchBar() {
    return (
        <div className="SearchBar">

            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formLocation">
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Search for concerts in your area</Form.Label>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Control type="location" placeholder="Enter location" />
                                        {/* <Form.Control type="email" placeholder="Enter location" style={{ height: "100%" }, { border: "0px" }} /> */}
                                    </Col>
                                    <Col sm="auto">
                                        <Button variant="success" type="submit">
                                            {/* <Button variant="success" type="submit" style={{ height: "100%" }}> */}
                                            Search
                                        </Button>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Text className="text-muted">
                                            You can search by city, state, or zip.
                                        </Form.Text>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SearchBar;
