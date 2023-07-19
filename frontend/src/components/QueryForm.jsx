import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import Book from './Book';

const QueryForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [query, setQuery] = useState('');

  const queryUrl = `https://www.googleapis.com/books/v1/volumes?q="${query}"&startIndex=${
    (page - 1) * 10
  }&maxResults=10`;

  useEffect(() => {
    if (totalItems > 0 && results.length > 0) {
      setContent(
        <>
          <Row className='justify-content-md-center mt-5'>
            <Col sm={12} md={6}>
              <h2>Items found: {totalItems}</h2>
            </Col>
          </Row>
          <Row className='justify-content-md-center'>
            {results?.map((item) => (
              <Col sm={12} md={6} lg={4} key={item.id}>
                <Book book={item} />
              </Col>
            ))}
          </Row>
          <Button
            variant='primary'
            type='button'
            className='btn-lg mt-3 mb-5'
            onClick={handleLoadMore}>
            {isLoading ? <Spinner animation='border' /> : 'Load more'}
          </Button>
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

    async function handleLoadMore() {
      try {
        setPage(page + 1);
        setIsLoading(true);

        const response = await axios.get(queryUrl);

        setIsLoading(false);

        const newResults = response.data.items || [];

        setResults((prevResults) => {
          return prevResults
            ? [
                ...prevResults,
                ...newResults.filter(
                  (newItem) =>
                    !prevResults.some((prevItem) => prevItem.id === newItem.id)
                ),
              ]
            : newResults;
        });
      } catch (error) {
        setError(error);
      }
    }
  }, [totalItems, results, error, page, queryUrl, isLoading]);

  const handleChange = (e) => {
    setQuery(encodeURIComponent(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      return;
    }

    setPage(1);
    setTotalItems(null);
    setResults([]);
    setError(null);
    setContent(null);

    try {
      setPage(page + 1);
      setIsLoading(true);

      const response = await axios.get(queryUrl);

      setIsLoading(false);

      setTotalItems(response.data.totalItems);
      setResults(response.data.items);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col sm={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-4' controlId='query'>
              <Form.Control
                type='text'
                placeholder='Enter a book name'
                autoFocus
                onChange={handleChange}
                value={decodeURIComponent(query)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' className='btn-lg'>
              {isLoading ? <Spinner animation='border' /> : 'Search'}
            </Button>
          </Form>
        </Col>
      </Row>

      {content}
    </Container>
  );
};

export default QueryForm;
