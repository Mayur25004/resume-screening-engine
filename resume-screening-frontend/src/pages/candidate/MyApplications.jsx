import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Empty from "../../components/common/Empty.jsx";
import Applications from "../../components/candidate/Applications.jsx";

export default function MyApplications() {
  const {
    activeCandidate, myApplications
  } = useApp();
    return (
      <>
        <Header eyebrow="Your progress" title="My applications">
          Track your applications and screening outcomes in one place.
        </Header>
        
        {activeCandidate ? (
          <section className="card">
            <Applications data={myApplications.slice().reverse()} />
          </section>
        ) : (
          <Empty
            title="Candidate profile not found"
  detail="Your account is not linked to a candidate profile yet."
          />
        )}
      </>
    );
  }
