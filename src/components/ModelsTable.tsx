import { Badge, Button, Spacer } from "@nextui-org/react";

export default function ModelsTable() {
  const rows = [
    {
      model: "Meta llama 1.1 Turbo",
      author: "Meta",
      type: "chat",
      pricing: "$0.10-$0.20",
      alignment: "2.3",
      verifiability: "Secure",
    },
    {
      model: "Meta llama 1.2 Turbo",
      author: "Meta",
      type: "chat",
      pricing: "$0.10-$0.30",
      alignment: "2.2",
      verifiability: "Ultra-Secure",
    },
    {
      model: "Meta llama 1.3 Turbo",
      author: "Meta",
      type: "image",
      pricing: "See pricing",
      alignment: "2.1",
      verifiability: "Basic",
    },
    {
      model: "Microsoft llama 1.1 Turbo",
      author: "Microsoft",
      type: "chat",
      pricing: "$5.00-$10.00",
      alignment: "2.3",
      verifiability: "Basic",
    },
    {
      model: "Microsoft llama 1.2 Turbo",
      author: "Microsoft",
      type: "image",
      pricing: "$0.10-$1.10",
      alignment: "2.2",
      verifiability: "Secure",
    },
    {
      model: "Microsoft llama 1.3 Turbo",
      author: "Microsoft",
      type: "image",
      pricing: "$1.20-$5.00",
      alignment: "2.1",
      verifiability: "Ultra-Secure",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h3>All Models</h3>
      <p style={{ color: "gray", fontSize: "small" }}>
        Models provided by 0G Serving available by API or chatbot.
      </p>
      <Spacer y={1} />
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr>
            <th>Models</th>
            <th>Author</th>
            <th>Type</th>
            <th>Pricing (per 1M Tokens)</th>
            <th>0G Alignment Score</th>
            <th>Verifiability Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.model}</td>
              <td>{row.author}</td>
              <td>{row.type}</td>
              <td>{row.pricing}</td>
              <td>{row.alignment}</td>
              <td>
                <Badge
                  color={
                    row.verifiability === "Ultra-Secure"
                      ? "success"
                      : row.verifiability === "Secure"
                        ? "primary"
                        : "default"
                  }
                >
                  {row.verifiability}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Spacer y={1} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color="secondary" auto>
          $10.00 Deposit
        </Button>
      </div>
    </div>
  );
}
