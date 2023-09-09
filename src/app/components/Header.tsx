// src/components/Header.tsx
import React, { useState } from "react";
import { Button, Container, Form, InputGroup, Navbar } from "react-bootstrap";

interface HeaderProps {
  userId: string | null;
  onUserIdEntered: (userId: string) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userId, onUserIdEntered, onLogout }) => {
  const [inputUserId, setInputUserId] = useState("");

  const handleUserIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onUserIdEntered(inputUserId);
    setInputUserId('');
  };


  return (
    <Navbar>
      <Container>
        <Navbar.Brand className="text-white">
          Amazon {' '}
          <span style={{ color: "#5f90f1" }}>Kuiper</span> {' '}
          Translogistics</Navbar.Brand>
        {userId ? (
          <Navbar.Text className="justify-content-end text-white">Alias: {userId}</Navbar.Text>
        ) : (
          <Form onSubmit={handleUserIdSubmit} className="justify-content-end">
            <InputGroup>
              <InputGroup.Text id="login">Enter Alias:</InputGroup.Text>
              <Form.Control
                placeholder="Alias"
                aria-label="Alias"
                aria-describedby="login"
                value={inputUserId}
                onChange={(e) => setInputUserId(e.target.value)}
                required
              >
              </Form.Control>
            </InputGroup>
          </Form>
        )}
        <Button type="button" onClick={onLogout} variant="outline-light" className="justify-content-end">Logout</Button>
      </Container>
    </Navbar>
  );
};

export default Header;