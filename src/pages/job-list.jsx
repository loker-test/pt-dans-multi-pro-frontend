import NavbarComponent from "../components/navbar.component.jsx";
import {Button, Card, CardBody, Col, Container, FormGroup, Input, Label, Row} from "reactstrap";
import JobListComponent from "../components/job-list.component.jsx";
import {useJobList} from "../hooks/job.hook.js";
import {useEffect, useState} from "react";

export default function JobList() {
  const [payload, setPayload] = useState({page: 1})
  const [jobData, setJobData] = useState([])

  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data,
  } = useJobList(payload)

  useEffect(() => {
    if (data !== undefined) {
      if (data.data.data !== jobData) {
        let prevState = jobData
        prevState = [
          ...prevState,
          ...data.data.data
        ]
        setJobData(prevState)
      }
    }
  }, [data])

  return (
    <>
      <NavbarComponent />
      <Container className="my-3">
        <Row className="align-items-center">
          <Col sm={12} md={4} lg={4}>
            <FormGroup>
              <Label for="jobDesc" className="fw-bold">
                Job Description
              </Label>
              <Input
                id="jobDesc"
                placeholder="Filter by title, benefits, companies, expertise"
                type="text"
                onChange={(e) => {
                  setJobData([])
                  setPayload(prevState => ({
                    ...prevState,
                    search: e.target.value
                  }))
                }}
              />
            </FormGroup>
          </Col>
          <Col sm={12} md={4} lg={4}>
            <FormGroup>
              <Label for="location" className="fw-bold">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Filter by city, state, zip code, or country"
                type="text"
                onChange={(e) => {
                  setJobData([])
                  setPayload(prevState => ({
                    ...prevState,
                    location: e.target.value
                  }))
                }}
              />
            </FormGroup>
          </Col>
          <Col sm={12} md={2} lg={2}>
            <FormGroup check>
              <Input
                type="checkbox"
                onChange={e => {
                  setJobData([])
                  setPayload(prevState => ({
                    ...prevState,
                    full_time: e.target.checked
                  }))
                }}
              />
              {' '}
              <Label check className="fw-bold">
                Full Time Only
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </Container>

      <Container className="mb-5">
        <Card>
          <CardBody>
            <h4 className="fw-bold">Job List</h4>
            {jobData.map(item => (
              <JobListComponent
                {...item}
              />
            ))}
          </CardBody>
          <div className="px-2 py-2">
            <Button
              color="primary"
              block
              onClick={() => {
                setPayload({
                  ...payload,
                  page: payload.page+1
                })
              }}
            >More Jobs</Button>
          </div>
        </Card>
      </Container>
    </>
  )
}
