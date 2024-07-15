import { useEffect, useState } from "react";
import './resultPage.css';
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const { result } = state || { result: [] };
  const [distributed, setDistributed] = useState<[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (result) setDistributed(result);
  }, [result])


  useEffect(() => {
      const resultsBody = document.getElementById('results-body') as HTMLTableSectionElement | null;
  
      if (!resultsBody) {
          throw new Error('Results body not found');
      }
  
      if (distributed.length > 0) {
  
        distributed.forEach((amount, index) => {
          console.log(amount, index)
            const row = document.createElement('tr');
  
            const participantCell = document.createElement('td');
            participantCell.textContent = `Participant ${index + 1}`;
            row.appendChild(participantCell);
  
            const amountCell = document.createElement('td');
            amountCell.textContent = `$${amount}`;
            row.appendChild(amountCell);
  
            if (resultsBody) {
                resultsBody.appendChild(row);
            }
        });
      }
  }, [distributed])


  return (
    <div>
      <header className="result-header">
        <h1>Angpao Distribution Result</h1>
      </header>
      <div className="result">
        <table id="results-table">
            <thead>
                <tr>
                    <th>Participants</th>
                    <th>Amount Received</th>
                </tr>
            </thead>
            <tbody id="results-body"></tbody>
        </table>
        <button onClick={()=>{navigate("../")}}>Redistribute Angpao</button>
      </div>
    </div>
  );
}

export default Result;
