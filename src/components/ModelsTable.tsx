import { useNavigate } from "react-router-dom";

type Model = {
  Name: string;
  Author: string;
  Type: string;
  Price: string;
  ZGAlignmentScore: string;
  Verifiability: string;
  UserInteractedNumber: number;
};

interface ModelsTableProps {
  models: Model[];
  onModelClick: (modelName: string) => void;
}

const ModelsTable: React.FC<ModelsTableProps> = ({ models, onModelClick }) => {
  const columns = [
    { key: "Name", label: "Model Name" },
    { key: "Author", label: "Author" },
    { key: "Type", label: "Type" },
    { key: "Price", label: "Pricing (per 1M Tokens)" },
    { key: "ZGAlignmentScore", label: "0G Alignment Score" },
    { key: "Verifiability", label: "Verifiability Type" },
  ];

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 border-b font-medium text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr
              key={model.Name}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onModelClick(model.Name)}
            >
              <td className="px-6 py-4">{model.Name}</td>
              <td className="px-6 py-4">{model.Author}</td>
              <td className="px-6 py-4">{model.Type}</td>
              <td className="px-6 py-4">{model.Price}</td>
              <td className="px-6 py-4">{model.ZGAlignmentScore}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                    model.Verifiability === "Ultra-Secure"
                      ? "bg-green-100 text-green-700"
                      : model.Verifiability === "Secure"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {model.Verifiability}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelsTable;
