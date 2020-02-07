import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">EVRAK TAKİP</Navbar.Brand>
      <Nav className="mr auto">
        <Nav.Link href="/">Evrak Listesi</Nav.Link>
        <Nav.Link href="/companies">Firmalar</Nav.Link>
        <Nav.Link href="/documentTypes">Evrak Tipleri</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
