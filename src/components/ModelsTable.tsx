import checkmarkIcon from "@/assets/check-mark.svg";
import basicIcon from "@/assets/basic.svg";
import secureIcon from "@/assets/secure.svg";
import ultraSecureIcon from "@/assets/ultra-secure.svg";
import infoIcon from "@/assets/info.svg";

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
    { key: "Name", label: "Models" },
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
          <tr className="text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 border-b font-semibold text-md text-gray-700"
              >
                <div className="flex items-center">
                  {col.label}
                  <img
                    src={infoIcon}
                    alt="Info Icon"
                    className="w-4 h-4 ml-1"
                  />
                </div>
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
              <td className="px-6 py-4 font-semibold">{model.Price}</td>
              <td className="px-6 py-4">{model.ZGAlignmentScore}</td>
              <td className="px-6 py-4 flex items-center space-x-1">
                {model.Verifiability === "Ultra-Secure" && (
                  <img
                    src={ultraSecureIcon}
                    alt="Ultra-Secure Icon"
                    className="w-8 h-8 mr-1"
                  />
                )}
                {model.Verifiability === "Secure" && (
                  <img
                    src={secureIcon}
                    alt="Secure Icon"
                    className="w-8 h-8 mr-1"
                  />
                )}
                {model.Verifiability === "Basic" && (
                  <img
                    src={basicIcon}
                    alt="Basic Icon"
                    className="w-8 h-8 mr-1"
                  />
                )}
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm italic text-[#484848] ${
                    model.Verifiability === "Ultra-Secure"
                      ? "font-bold"
                      : model.Verifiability === "Secure"
                        ? "font-bold"
                        : ""
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
