import { useParams } from "react-router-dom";
import { ApplicationProcessUI } from "./interface";

function ApplicationProcess() {
  const { id } = useParams();

  return (
    <ApplicationProcessUI
      appName=""
      appRoute={[
        {
          path: `/requests/${id}`,
          label: "",
          id: `/requests/${id}`,
          isActive: true,
        },
      ]}
      navigatePage="/requests"
    />
  );
}

export { ApplicationProcess };
