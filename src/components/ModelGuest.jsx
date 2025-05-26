import { useState } from "react";
import DiagnosisRow from "../features/diagnosis/DiagnosisRow";
import GuestForm from "../features/form/GuestForm";
import Notification from "../features/form/Notification";

function ModelGuest() {
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
          <GuestForm setNotification={setNotification}/>
        </div>

      </div>
    </DiagnosisRow>
  );
}

export default ModelGuest;