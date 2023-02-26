import NavbarComponent from "../components/navbar.component.jsx";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Container, FormGroup, Input, Label, Row} from "reactstrap";
import JobListComponent from "../components/job-list.component.jsx";
import {useJobDetail, useJobList} from "../hooks/job.hook.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function JobDetail() {
  const {id} = useParams()
  const [jobData, setJobData] = useState({})

  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data,
  } = useJobDetail(id)

  useEffect(() => {
    if (data !== undefined) {
      setJobData(data.data.data)
    }
  }, [data])

  return (
    <>
      <NavbarComponent backButton={'/'} />

      <Container className="mb-5">
        <Card>
          <CardBody>
            <span className="text-secondary">{jobData.location} / {jobData.type}</span>
            <h4 className="fw-bold">{jobData.title}</h4>
            <hr />
            <Row>
              <Col sm={12} md={8}>
                <div dangerouslySetInnerHTML={{__html: jobData.description}} />
              </Col>
              <Col sm={12} md={4}>
                <Card className="mb-3 shadow">
                  <CardHeader className="fw-bold">
                    {jobData.company}
                  </CardHeader>
                  <CardBody>
                    <img src={jobData.company_logo}/>
                    <a href={jobData.company_url}>{jobData.company_url}</a>
                  </CardBody>
                </Card>
                <Card className="shadow">
                  <CardHeader className="fw-bold" style={{backgroundColor: "#fffef0"}}>
                    How to apply
                  </CardHeader>
                  <CardBody style={{backgroundColor: "#fffef0"}}>
                    <div dangerouslySetInnerHTML={{__html: jobData.how_to_apply}} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}
