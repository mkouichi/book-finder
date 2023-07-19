import { Card, Col, Row } from 'react-bootstrap';

const Book = ({ book }) => {
  const infoLink = `http://books.google.com/books?id=${book.id}`;
  const imageLink = `http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;

  return (
    <Card className='my-3 p-3 rounded'>
      <a href={infoLink} target='_blank' rel='noopener noreferrer'>
        <Card.Img
          src={imageLink}
          alt={book.volumeInfo.title}
          style={{ maxWidth: '200px' }}
          className='d-block mx-auto'
        />
      </a>
      <Card.Body>
        <Card.Title as='div'>
          <a href={infoLink} target='_blank' rel='noopener noreferrer'>
            <strong>{book.volumeInfo.title}</strong>
          </a>
        </Card.Title>

        <Card.Text as='div'>
          <Row>
            <Col sm={3} md={5}>
              Author(s):
            </Col>
            <Col sm={9} md={7}>
              <strong>
                {book.volumeInfo.authors?.map((author, index) =>
                  index !== book.volumeInfo.authors.length - 1
                    ? `${author}, `
                    : author
                )}
              </strong>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text as='div'>
          <Row>
            <Col sm={3} md={5}>
              Category:
            </Col>
            <Col sm={9} md={7}>
              <strong>{book.volumeInfo.categories}</strong>
            </Col>
          </Row>
        </Card.Text>

        <Card.Text as='div'>
          <Row>
            <Col sm={3} md={5}>
              Published:
            </Col>
            <Col sm={9} md={7}>
              <strong>{book.volumeInfo.publishedDate}</strong>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Book;
