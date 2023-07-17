import { Navbar, Container } from 'react-bootstrap';
import { ImBooks } from 'react-icons/im';

const Header = () => {
  return (
    <header>
      <Navbar
        className='bg-primary'
        variant='dark'
        expand='md'
        collapseOnSelect>
        <Container>
          <Navbar.Brand className='fs-2 fw-bold'>
            <ImBooks className='me-2' />
            Book Finder
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
