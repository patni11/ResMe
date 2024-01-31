// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { CertificateStore } from "@/lib/types/types";
import { persist } from "zustand/middleware";
import { getCleanedCertificateData } from "@/lib/apiFunctions";
import { fetchResumeSection } from "@/lib/actions/resumes.action";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

export type State = CertificateStore & {
  isLoading: boolean;
  error: any;
};

type Actions = {
  setHiddenCertificate: (key: string) => void;
  setHideAll: () => void;
  fetchDefaultCertificates: () => Promise<void>;
  fetchCertificates: () => Promise<void>;
};

const storeCache: Record<string, any> = {};

export const createCertificateInfo = (certificateHeaderID: string) => {
  if (storeCache[certificateHeaderID]) {
    return storeCache[certificateHeaderID];
  }

  let INITIAL_STATE = {
    certificates: [], // should be []
    hideAll: false,
    hiddenCertificates: null,
    isLoading: false,
    error: null,
  };

  if (typeof window !== "undefined") {
    const savedState = JSON.parse(localStorage.getItem(certificateHeaderID));
    if (savedState) {
      INITIAL_STATE = {
        ...INITIAL_STATE,
        ...savedState,
      };
    }
  }

  const useCertificatesInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: false,
        error: null,
        fetchDefaultCertificates: async () => {
          set({ isLoading: true });
          try {
            const certificates = await getCleanedCertificateData();
            set({ ...certificates, isLoading: false });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        fetchCertificates: async () => {
          set({ isLoading: true });
          const id = certificateHeaderID.split("-").slice(2).join("-");
          try {
            const data = await fetchResumeSection(id, "certificates");
            set({ ...data.certificates, isLoading: false });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        setHiddenCertificate: (key: string) => {
          set((state) => {
            if (!state.hiddenCertificates) return { hiddenCertificates: null };

            return {
              hiddenCertificates: {
                ...state.hiddenCertificates,
                [key]: !state.hiddenCertificates[key],
              },
            };
          });
        },
        setHideAll: () => {
          set((state) => {
            return {
              hideAll: !state.hideAll,
            };
          });
        },
      }),
      {
        name: certificateHeaderID,
      }
    )
  );

  storeCache[certificateHeaderID] = useCertificatesInfo;
  return () => useCertificatesInfo();
};
