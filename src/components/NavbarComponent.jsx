import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <Container>
            <Navbar>
                <Container>
                    <Navbar.Brand href="./../.../index.html">EcoDrive</Navbar.Brand>
                    <NavLink to={"/register"}>Opa</NavLink>
                </Container>
            </Navbar>
        </Container>
    );
};

export default NavbarComponent;