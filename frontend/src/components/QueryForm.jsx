import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const submitHandler = (e) => {
  e.preventDefault();
  console.log('search');
};

const QueryForm = () => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={10}>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-4' controlId='query'>
              <Form.Control type='text' placeholder='Enter a book name' />
            </Form.Group>

            <Button variant='primary' type='submit' className='btn-lg'>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default QueryForm;
