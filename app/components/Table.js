export default function Table({ headers, columns, data }) {
  const tableHeaders = headers || columns;

    return (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {tableHeaders.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  