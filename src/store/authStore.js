import { create } from "zustand";
import supabase from "../services/supabase"

const useAuthStore = create((set) => ({
    currentUser: null,
    role: null,
    error: null,
    loading: true,

    getCurrentUser: async () => {
        set({loading: true})

        const { data: { user }, error } = await supabase.auth.getUser();
        if(error || !user) {
            set({ currentUser: null, role: null, loading: false, error });
        } else {
            set({ currentUser: user, error: null });

            const { data: { role }, error } = await supabase
            .from('users')
            .select('role') 
            .eq('auth_uuid', user.id)
            .single()

            if(error || !role) {
                set({ role: null, loading: false, error });
            } else {
                set({ role, loading: false });
            }
        }
    },

    handleLogin: async (email, password) => {
        set({loading: true})
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(error || !user) {
            set({ currentUser: null, loading: false, error })
            return { user: null, role: null, error }
        } else {
            set({ currentUser: user, error: null })

            const { data: { role }, error } = await supabase
            .from('users')
            .select('role') 
            .eq('auth_uuid', user.id)
            .single()

            if(error || !role) {
                set({ role: null, loading: false, error });
            } else {
                set({ role, loading: false });
            }
            return { user, role, error: null }
        }
    },

    handleLogout: async () => {
        await supabase.auth.signOut()
        setTimeout(() => {
            set({ user: null, role: null, loading: false, error: null })
        }, 50)
    }

}))

export default useAuthStore