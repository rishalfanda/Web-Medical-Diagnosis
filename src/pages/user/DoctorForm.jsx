import { useState } from "react";
import DiagnosisRow from "../../features/diagnosis/DiagnosisRow";
import CreateDoctorAnalystForm from "../../features/form/CreateDoctorAnalystForm";
import Notification from "../../features/form/Notification";

function DoctorForm() {
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  console.log("model page is render")

  return (
    <DiagnosisRow>
      <div className="bg-gray-800 rounded-xl shadow-md p-6">
        {/* Notification Toast */}
        <Notification notification={notification} />

        <div className="mb-5">
          <CreateDoctorAnalystForm setNotification={setNotification}/>
        </div>

        {/* <UploadImage diagnosis={diagnosis}  /> */}
      </div>
    </DiagnosisRow>
  );
}

export default DoctorForm;