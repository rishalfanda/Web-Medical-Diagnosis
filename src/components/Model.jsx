import { useState } from "react";
import DiagnosisRow from "../features/diagnosis/DiagnosisRow";
import CreateAnalystForm from "../features/form/CreateAnalystForm";
import Notification from "../features/form/Notification";

function Model() {
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  return (
    <DiagnosisRow>
      <div className="bg-gray-800 rounded-xl shadow-md p-6">
        {/* Notification Toast */}
        <Notification notification={notification} />

        <div className="mb-5">
          <CreateAnalystForm setNotification={setNotification}/>
        </div>

        {/* <UploadImage diagnosis={diagnosis}  /> */}
      </div>
    </DiagnosisRow>
  );
}

export default Model;