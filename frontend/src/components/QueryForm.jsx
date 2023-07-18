import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const QueryForm = () => {
  const [totalItems, setTotalItems] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [query, setQuery] = useState('');

  const queryUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  useEffect(() => {
    if (totalItems > 0 && result) {
      console.log(result);

      setContent(
        <>
          <Row className='justify-content-md-center'>
            <Col xs={12} md={10}>
              Items found: {totalItems}
            </Col>
          </Row>
          <Row className='justify-content-md-center'>
            <Col xs={12} md={10}>
              {result.map((item) => (
                <div key={item.id}>{item.volumeInfo.title}</div>
              ))}
            </Col>
          </Row>
        </>
      );
    } else if (error) {
      setContent(
        <Row className='justify-content-md-center'>
          <Col xs={12} md={10}>
            <div>Something went wrong: {error.message}</div>
          </Col>
        </Row>
      );
    }
  }, [totalItems, result, error]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function sendQuery() {
      try {
        const response = await axios.get(queryUrl);
        setTotalItems(response.data.totalItems);
        setResult(response.data.items);
      } catch (error) {
        setError(error);
      }
    }

    sendQuery();
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-4' controlId='query'>
              <Form.Control
                type='text'
                placeholder='Enter a book name'
                autoFocus
                onChange={handleChange}
                value={query}
              />
            </Form.Group>

            <Button variant='primary' type='submit' className='btn-lg'>
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      {content}
    </Container>
  );
};

export default QueryForm;
