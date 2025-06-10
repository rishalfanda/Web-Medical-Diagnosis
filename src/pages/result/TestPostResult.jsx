import { usePostDiagnosis } from "../../hooks/diagnosis/usePostDiagnosis"
import useGuestDiagnosisStore from "../../store/guestDiagnosisStore"

function TestPostResult(){
    const {guestDiagnosisData} = useGuestDiagnosisStore()
    const {isPost, isError} = usePostDiagnosis()
    console.log(guestDiagnosisData)
    return(
        <div>
            <p className="font-bold">ini Untuk testing page</p>
        </div>
    )
}

export default TestPostResult