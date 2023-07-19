import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Book from './Book';

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
          <Row className='justify-content-md-center mt-5'>
            <Col sm={12} md={6}>
              <h2>Items found: {totalItems}</h2>
            </Col>
          </Row>
          <Row className='justify-content-md-center'>
            {result.map((item) => (
              <Col sm={12} md={6} lg={4} key={item.id}>
                <Book book={item} />
              </Col>
            ))}
          </Row>
        </>
      );
    } else if (error) {
      setContent(
        <>
          <Row className='justify-content-md-center mt-5'>
            <Col sm={12} md={6}>
              <h2>Something went wrong:</h2>
            </Col>
          </Row>
          <Row className='justify-content-md-center'>
            <Col sm={12} md={6}>
              <h2>{error.message}</h2>
            </Col>
          </Row>
        </>
      );
    }
  }, [totalItems, result, error]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTotalItems(null);
    setResult(null);
    setError(null);
    setContent(null);

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
        <Col sm={12} md={6}>
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
