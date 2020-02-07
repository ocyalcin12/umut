import React from 'react';
//import { Container } from 'react-bootstrap'; // Container from react-bootstrap/Container

function Layout(props) {
  return (
    <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
      {props.children}
    </div>
  );
}

export default Layout;
