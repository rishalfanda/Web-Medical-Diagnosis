import { create } from "zustand";
import supabase from "../services/supabase"

const useAuthStore = create((set) => ({
    currentUser: null,
    id: 0,
    name: null,
    avatar: null,
    role: null,
    error: null,
    loading: true,

    getCurrentUser: async () => {
        set({loading: true})

        const { data: { user }, error } = await supabase.auth.getUser();
        if(error || !user) {
            set({ currentUser: null, id: 0, name: null, avatar: null, role: null, loading: false, error });
        } else {
            set({ currentUser: user, error: null });

            let fetchedId = 0, fetchedName = null, fetchedAvatar = null, fetchedRole = null, fetchedError = null;
            try { // kalau hasil query db empty bakal error tadi kucoba gitu
                const { data: { id, name, avatar, role }, error } = await supabase
                .from('users')
                .select('id, name, avatar, role') 
                .eq('auth_uuid', user.id)
                .single()
                fetchedId = id
                fetchedName = name
                fetchedAvatar = avatar
                fetchedRole = role
                fetchedError = error
            } catch {
                set({ role: "user", loading: false });
                return
            }

            if(fetchedError || !fetchedRole) {
                set({ id: fetchedId, name: fetchedName, avatar: fetchedAvatar, role: "user", loading: false, error: fetchedError });
            } else {
                set({ id: fetchedId, name: fetchedName, avatar: fetchedAvatar, role: fetchedRole, loading: false });
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
            set({ currentUser: null, id: 0, name: null, avatar: null, role: null, loading: false, error });
            return { user: null, role: null, error }
        } else {
            set({ currentUser: user, error: null });

            let fetchedId = 0, fetchedName = null, fetchedAvatar = null, fetchedRole = null, fetchedError = null;
            try { // kalau hasil query db empty bakal error tadi kucoba gitu
                const { data: { id, name, avatar, role }, error } = await supabase
                .from('users')
                .select('id, name, avatar, role') 
                .eq('auth_uuid', user.id)
                .single()
                fetchedId = id
                fetchedName = name
                fetchedAvatar = avatar
                fetchedRole = role
                fetchedError = error
            } catch {
                set({ role: "user", loading: false });
                return { user, role: "user" }
            }

            if(fetchedError || !fetchedRole) {
                set({ id: fetchedId, name: fetchedName, avatar: fetchedAvatar, role: "user", loading: false, error: fetchedError });
                return { user, role: "user", error: fetchedError }
            } else {
                set({ id: fetchedId, name: fetchedName, avatar: fetchedAvatar, role: fetchedRole, loading: false });
                return { user, role: fetchedRole, error }
            }
        }
    },

    handleLogout: async () => {
        await supabase.auth.signOut()
        setTimeout(() => {
            set({ user: null, name: null, avatar: null, role: null, loading: false, error: null })
        }, 50)
    }

}))

export default useAuthStore