import { AlertTriangle } from 'lucide-react';

interface Props {
  onAcknowledge: () => void;
}

function RiskGate({ onAcknowledge }: Props) {
  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate-card">
        <div className="gate-kicker">
          <AlertTriangle size={14} />
          Read before you begin
        </div>

        <h1 id="gate-title">This course is about a product that loses most people money.</h1>

        <div className="gate-stat">
          <div className="gate-stat-num">70&ndash;85%</div>
          <p className="gate-stat-text">
            of retail Contract for Difference accounts lose money. That is not marketing
            caution. It is an audited figure that regulated brokers in the UK, EU and
            Australia are legally required to publish, and it barely moves between rising
            and falling markets.
          </p>
        </div>

        <ul className="gate-list">
          <li>
            <strong>Losing is the default outcome</strong>, not the result of insufficient
            effort. Everything taught here follows from taking that seriously.
          </li>
          <li>
            <strong>This is education, not financial advice.</strong> Nothing here
            recommends any instrument, strategy or broker.
          </li>
          <li>
            <strong>CFDs are not available to retail clients in the United States.</strong>{' '}
            The material is still useful as an explanation of leverage and margin.
          </li>
          <li>
            <strong>Every practical exercise runs on a demo account.</strong> You need no
            money to take this course, and deciding not to trade is a successful outcome.
          </li>
        </ul>

        <div className="gate-actions">
          <button className="btn btn-primary" onClick={onAcknowledge}>
            I understand &mdash; start the course
          </button>
        </div>

        <p className="gate-foot">
          If trading ever stops feeling like a decision &mdash; chasing losses, hiding it
          from people close to you, or trading money you said you would not &mdash; support
          is listed in the full risk disclosure, which is the first page of the course.
        </p>
      </div>
    </div>
  );
}

export default RiskGate;
