import { Link } from '../../lib/router.jsx'

export default function SectionHead({ children, to, more }) {
  return (
    <div className="shead">
      <h2 className="h2">{children}</h2>
      {to && <Link className="more" to={to}>{more}</Link>}
    </div>
  )
}
