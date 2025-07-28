import { create } from "zustand";

const useGuestDiagnosisStore = create((set) => ({
    guestDiagnosisData: null,
    setGuestDiagnosisData: (data) => set({guestDiagnosisData: data}),
    clearGuestDiagnosisData: () => set({guestDiagnosisData: null})
}))

export default useGuestDiagnosisStore