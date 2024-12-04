/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { AuthContext } from "contexts/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  FormFeedback,
} from "reactstrap";
import { handleLogin } from "services/authHandlers";

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await handleLogin(formData);
    if (response.ok) {
      setIsAuthenticated(true);
      navigate("/admin/index");
    } else {
      setError(true);
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form id="form" role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={error}
                    name="usernameoremail"
                    placeholder="Username or Email"
                    type="text"
                    autoComplete="new-email"
                  />
                  <FormFeedback className="text-center">
                    Invalid Credentials
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={error}
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                  <FormFeedback className="text-center">
                    Invalid Credentials
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="submit"
                  value="submit"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
