import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Button from "../../components/common/Button.jsx";
import Empty from "../../components/common/Empty.jsx";

export default function MyResume() {
  const {
    busy, file, setFile, fileInput, upload, activeCandidate
  } = useApp();
    return (
      <>
        <Header eyebrow="Your profile" title="My resume">
          Upload a PDF resume to extract your skills.
        </Header>
       
        {activeCandidate ? (
          <section className="card resume-card">
            <h2>
              {activeCandidate.resumePath
                ? activeCandidate.resumePath.split("/").pop()
                : "No resume uploaded"}
            </h2>
            <p>
              {activeCandidate.resumePath
                ? "Your resume is ready for screening."
                : "Upload a PDF to begin skill extraction."}
            </p>
            <label className="drop candidate-drop">
              <input
                ref={fileInput}
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <span>⌁</span>
              <strong>{file ? file.name : "Choose a PDF resume"}</strong>
              <small>PDF files only</small>
            </label>
            <Button disabled={busy === "upload"} onClick={upload}>
              {busy === "upload" ? "Uploading…" : "Upload / replace resume"}
            </Button>
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
