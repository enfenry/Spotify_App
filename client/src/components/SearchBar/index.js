import React, { useEffect } from 'react';
import './SearchBar.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SearchBar({ path, setPath }) {

    const renderLabel = (path) => {
        if (path === "/") {
            return (
                <Form.Row>
                    <Col>
                        <Form.Label>Search for concerts in your area</Form.Label>
                    </Col>
                </Form.Row>
            );
        }
    };

    const renderHelperText = (path) => {
        if (path === "/") {
            return (
                <Form.Row>
                    <Col>
                        <Form.Text className="text-muted">
                            <small>You can search by city, state, or zip.</small>
                        </Form.Text>
                    </Col>
                </Form.Row>
            )
        }
    };

    return (
        <div className="SearchBar">
            <Container>
                <Row>
                    <Col xs="12">
                        <Form>
                            <Form.Group controlId="formLocation">

                                {renderLabel(path)}

                                <Form.Row>
                                    <Col>
                                        <Form.Control type="location" placeholder="Enter location" />
                                    </Col>
                                    <Col sm="auto">
                                        <Button variant="primary" type="submit" className="btn-search" onClick={() => setPath("/results")}>
                                            Search
                                        </Button>
                                    </Col>
                                </Form.Row>

                                {renderHelperText(path)}

                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
