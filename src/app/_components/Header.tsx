'use client'
import React, { useState } from 'react'
import pb from '../utils/pocketbase';
import { Button, Container, Form, InputGroup, Navbar } from 'react-bootstrap';

const Header: React.FC = () => {
  const [alias, setAlias] = useState('');
  const [isUserIdInArray, setIsUserIdInArray] = useState(false);

  const handleAliasSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const collection = await pb
      .collection("WarehouseAssociates")
      .getFullList();
    setIsUserIdInArray(collection.some((obj) => obj.alias === alias));
    if (isUserIdInArray) {
      localStorage.setItem("alias", alias);
    } else {
      setAlias('');
    }
  };

  const onLogout = async () => {
    setAlias("");
    setIsUserIdInArray(false);
  };

  return (
    <Navbar className="navbar navbar-dark bg-dark">
      <Container>
        <Navbar.Brand className="text-white">
          Amazon {' '}
          <span style={{ color: "#5f90f1" }}>Kuiper</span> {' '}
          Translogistics</Navbar.Brand>
        {isUserIdInArray ? (
          <>
            <Navbar.Text className="justify-content-end text-white">Alias: {alias}</Navbar.Text>
            <Button type="button" onClick={onLogout} variant="outline-light" className="justify-content-end">Logout</Button>
          </>
        ) : (
          <Form onSubmit={handleAliasSubmit} className="justify-content-end">
            <InputGroup>
              <InputGroup.Text id="login">Enter Alias:</InputGroup.Text>
              <Form.Control
                placeholder="Alias"
                aria-label="Alias"
                aria-describedby="login"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                required
              >
              </Form.Control>
            </InputGroup>
          </Form>
        )}
        
      </Container>
    </Navbar>
  )
}

export default Header