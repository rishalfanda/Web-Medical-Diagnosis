import { useState } from "react";
import DiagnosisRow from "../../features/diagnosis/DiagnosisRow";
import CreateGuestAnalystForm from "../../features/form/CreateGuestAnalystForm";
import Notification from "../../features/form/Notification";

function GuestForm() {
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
          <CreateGuestAnalystForm setNotification={setNotification}/>
        </div>

      </div>
    </DiagnosisRow>
  );
}

export default GuestForm;