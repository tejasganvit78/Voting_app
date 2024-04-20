import React, { useState } from "react";
import './App.css'

const App = () => {
  const [candidates, setCandidates] = useState([
    { name: "Narendra", votes: 0, voters: [] },
    { name: "Rahul", votes: 0, voters: [] },
    { name: "Arvind", votes: 0, voters: [] },
  ]);
  const [voterName, setVoterName] = useState("");
  const [votedFor, setVotedFor] = useState("");

  const handleInputChange = (event) => {
    setVoterName(event.target.value);
  };

  const handleVote = () => {
    if (!votedFor) {
      alert("Please select a candidate to vote.");
      return;
    }

    // Check if the voter has already voted for any candidate
    const hasVotedAlready = candidates.some((candidate) =>
      candidate.voters.includes(voterName)
    );

    if (hasVotedAlready) {
      alert("You have already voted.");
      return;
    }

    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.name === votedFor) {
        return {
          ...candidate,
          votes: candidate.votes + 1,
          voters: [...candidate.voters, voterName],
        };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
    setVotedFor("");
    setVoterName("");
  };

  const handleSelectCandidate = (event) => {
    setVotedFor(event.target.value);
  };

  return (
    <div>
      <h1>Vote for your candidate</h1>
      <div>
        <input
          type="text"
          value={voterName}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <select value={votedFor} onChange={handleSelectCandidate}>
          <option value="">Select a candidate</option>
          {candidates.map((candidate) => (
            <option key={candidate.name} value={candidate.name}>
              {candidate.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleVote}>Vote</button>
      <div>
        {candidates.map((candidate) => (
          <div key={candidate.name}>
            <h2>{candidate.name}</h2>
            <p>Total Votes: {candidate.votes}</p>
            <p>Voters: {candidate.voters.join(", ")}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Your Vote:</h2>
        <p>
          {voterName} voted for {votedFor}
        </p>
      </div>
      <div>
        <h2>Total Votes Cast:</h2>
        <p>
          {candidates.reduce((total, candidate) => total + candidate.votes, 0)}
        </p>
      </div>
    </div>
  );
};

export default App;
