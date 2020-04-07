import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import './App.css';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
};

class App extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: ""
    },
  };
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "firstName":
        errors.firstName = value.length < 3 ? "Minimum 3 characters long!" : "";
        break;
      case "lastName":
        errors.lastName = value.length < 3 ? "Minimum 3 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        errors.password = value.length < 8 ? "Minimum 8 characters long!" : "";
        break;
      case "repeatPassword":
        errors.repeatPassword =
          value.length < 8 ? "Minimum 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ event, [name]: value }, () => {
      console.log(errors);
    });
  };

  handleSubmit = (event) => {
    const { firstName, lastName, password, email, repeatPassword, errors } = this.state;
    event.preventDefault();
    if (firstName == "" || lastName == "" || password == "" || email == "" || repeatPassword == "") {
      console.error("Invalid Form: may input(s) is/are empty");
    } else if (password != repeatPassword) {
      console.error("Invalid form: password confirmation is not correct");
    } else if (validateForm(errors)) {
      console.info("Valid form");
    } else {
      console.error("Invalid Form: Check errors");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <Container fluid={true}>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1 className="text-center">Create your account</h1>
              <Form noValidate onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      <Label for="firstName">First name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First name ..."
                        onChange={this.handleChange}
                        value={this.state.firstName}
                      />
                      {errors.firstName.length > 0 && (
                        <span className="error">{errors.firstName}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xs={6}>
                    <FormGroup>
                      <Label for="lastName">Last name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last name ..."
                        onChange={this.handleChange}
                        value={this.state.lastName}
                      />
                      {errors.lastName.length > 0 && (
                        <span className="error">{errors.lastName}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email ..."
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                      {errors.email.length > 0 && (
                        <span className="error">{errors.email}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password ..."
                        onChange={this.handleChange}
                        value={this.state.password}
                      />
                      {errors.password.length > 0 && (
                        <span className="error">{errors.password}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for="repeatPassword">Confirm password</Label>
                      <Input
                        type="password"
                        name="repeatPassword"
                        placeholder="Password again ..."
                        onChange={this.handleChange}
                        value={this.state.repeatPassword}
                      />
                      {errors.repeatPassword.length > 0 && (
                        <span className="error">{errors.repeatPassword}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Button type="submit" color="primary">
                  Submit
                </Button>
                <a href="http://www.google.com" className="text-center">
                  Already have an account?
                </a>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;

