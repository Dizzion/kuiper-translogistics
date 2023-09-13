"use client";
import { useRouter } from "next/navigation";
import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Navbar } from "react-bootstrap";

interface HeaderProps {
  associates: RecordModel[] | undefined;
}

const Header: React.FC<HeaderProps> = ({ associates }) => {
  const router = useRouter();
  const [alias, setAlias] = useState("");
  const [isUserIdInArray, setIsUserIdInArray] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("alias") !== null && typeof associates !== 'undefined') {
      const newValue: string | null = localStorage.getItem('alias')
      setAlias(newValue as string);
      setIsUserIdInArray(associates.some((obj) => obj.alias === alias));
    }
  }, [alias]);

  const handleAliasSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof associates !== "undefined") {
      setIsUserIdInArray(associates.some((obj) => obj.alias === alias));
      const aliasIndex = associates.findIndex((obj) => obj.alias === alias);
      localStorage.setItem("alias", associates[aliasIndex].alias);
      localStorage.setItem("id", associates[aliasIndex].id);
    }
  };

  const onLogout = () => {
    setAlias("");
    setIsUserIdInArray(false);
    localStorage.clear();
    router.push('/');
  };

  return (
    <Navbar className="navbar navbar-dark bg-dark">
      <Container>
        <Navbar.Brand href="/" className="text-white">
          Amazon <span style={{ color: "#5f90f1" }}>Kuiper</span> Translogistics
        </Navbar.Brand>
        {isUserIdInArray ? (
          <>
            <Navbar.Brand href="/Translogistics" className="text-white" style={{justifyContent: 'center'}}>Warehouse Forms</Navbar.Brand>
            <Navbar.Text style={{justifyContent: 'end'}} className="text-white">
              Alias: {alias}
            </Navbar.Text>
            <Button
              type="button"
              onClick={onLogout}
              variant="outline-light"
              className="justify-content-end"
              style={{justifyContent: 'end'}}
            >
              Logout
            </Button>
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
              ></Form.Control>
            </InputGroup>
          </Form>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
