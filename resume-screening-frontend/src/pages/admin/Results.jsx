import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Button from "../../components/common/Button.jsx";
import Table from "../../components/common/Table.jsx";

export default function Results() {
  const {
    results, load
  } = useApp();
    return (
      <>
        <Header eyebrow="Candidate fit" title="Screening results">
          Compare candidates by match score and screening outcome.
        </Header>
        <div className="top-action">
          <Button className="secondary" onClick={load}>
            ↻ Refresh
          </Button>
        </div>
        <section className="card">
          <Table data={[...results].reverse()} />
        </section>
      </>
    );
  }
