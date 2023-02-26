import {Alert, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row, Spinner} from "reactstrap";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuthLoginMutation} from "../../hooks/auth.hook.js";
import {useEffect} from "react";
import {useLocalStorage} from "../../hooks/local-storage.hook.js";
import {useNavigate} from "react-router-dom";

const formSchema = yup.object({
  username: yup
    .string()
    .required("Username is Required"),
  password: yup
    .string()
    .required("Password is Required"),
});

export default function AuthLogin() {
  const [user, setUser] = useLocalStorage('user')
  const [token, setToken] = useLocalStorage('token')
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const {
    mutate: authLogin,
    isLoading,
    isError,
    error,
    isSuccess,
    data
  } = useAuthLoginMutation()

  const handleLogin = (data) => {
    authLogin(data)
  }

  useEffect(() => {
    if (data !== undefined) {
      if (data.status === 200) {
        setUser(JSON.stringify(data.data.data.user))
        setToken(data.data.data.token)
        navigate('/')
      }
    }
  }, [isError, isLoading, error, isSuccess, data])

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Container>
        <Row className="d-flex justify-content-center">
          <Col sm={10} md={8} lg={6}>
            <Card className="shadow-lg">
              <CardBody className="p-5">
                <Form className="mb-3 mt-md-4" onSubmit={handleSubmit(handleLogin)}>
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p>Enter your username and password</p>
                  <div className="border border-3 border-primary mb-5"/>
                  {isError && (
                    <Alert
                      color="danger"
                    >
                      {error?.response?.data?.message}
                    </Alert>
                  )}
                  <FormGroup>
                    <Label className="fw-bold text-black-50">
                      Username
                    </Label>
                    <Controller
                      control={control}
                      name="username"
                      render={({ field }) => <Input {...field} type="text" />}
                    />
                    {errors?.username && (
                      <div className="text-danger">
                        {errors?.username?.message}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="fw-bold text-black-50">
                      Password
                    </Label>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => <Input {...field} type="password" />}
                    />
                    {errors?.password && (
                      <div className="text-danger">
                        {errors?.password?.message}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between gap-2 mt-5">
                    <Button
                      color="primary"
                      outline={true}
                      className=""
                      type="button"
                      disabled={isLoading}
                    >
                      Register
                    </Button>
                    <Button
                      color="primary"
                      className="fw-bold text-white px-4"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? <Spinner color="primary" size="sm" /> : 'Login'}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
