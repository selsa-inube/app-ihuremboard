import { useParams } from "react-router-dom";
import { ApplicationProcessUI } from "./interface";

function ApplicationProcess() {
  const { id } = useParams();

  return (
    <ApplicationProcessUI
      appName=""
      appRoute={[
        {
          path: `/requests/holiday-request/${id}`,
          label: "",
          id: `/requests/holiday-request/${id}`,
          isActive: true,
        },
      ]}
      navigatePage="/requests"
    />
  );
}

export { ApplicationProcess };
