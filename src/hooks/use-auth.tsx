import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthenticatedUser } from '@shared/types';
interface AuthState {
  user: AuthenticatedUser | null;
  login: (userData: AuthenticatedUser) => void;
  logout: () => void;
}
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => {
        set({ user: null });
        // Optionally clear other persisted state on logout
      },
    }),
    {
      name: 'provident-edge-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);