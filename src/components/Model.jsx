import { useState } from "react";
import DiagnosisRow from "../features/diagnosis/DiagnosisRow";
import UploadImage from "../features/diagnosis/UploadImage";
import CreateAnalystForm from "../features/form/CreateAnalystForm";
import Notification from "../features/form/Notification";
import { useGetDiagnosis } from "../hooks/diagnosis/useGetDiagnosis";

function Model() {
  const { isGetDiagnosis, diagnosis } = useGetDiagnosis();

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
          <CreateAnalystForm diagnosis={diagnosis} setNotification={setNotification}/>
        </div>

        {/* <UploadImage diagnosis={diagnosis}  /> */}
      </div>
    </DiagnosisRow>
  );
}

export default Model;