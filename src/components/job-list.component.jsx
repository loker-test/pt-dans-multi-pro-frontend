import moment from "moment";

export default function JobListComponent(data) {
  function calculateDateBetween(created_at) {
    const now = moment()
    const postedAt = moment(created_at)
    return now.diff(postedAt, 'day')
  }

  return (
    <>
      <hr />
      <a href={`/job/${data.id}`} style={{textDecoration: "none"}}>
        <div>
          <div className="d-flex justify-content-between">
            <div className="fw-bold" style={{color: "#4887bd"}}>{data.title}</div>
            <span>{data.location}</span>
          </div>
          <div className="d-flex justify-content-between">
            <div className="text-secondary">{data.company} - <span className="fw-bold text-success">{data.type}</span></div>
            <span className="text-secondary">{calculateDateBetween(data.created_at)} days ago</span>
          </div>
        </div>
      </a>
    </>
  )
}
