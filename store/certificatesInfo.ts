// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create, StateCreator } from "zustand";
import { Certificate } from "@/app/(mainApp)/education/pageTypes";
import { persist } from "zustand/middleware";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

type State = {
  certificates: Certificate[] | [];
  hiddenCertificates: { [key: string]: boolean } | null;
  hideAll: boolean;
  isLoading: boolean;
  error: any;
};

type Actions = {
  setHiddenCertificate: (key: string) => void;
  setHideAll: () => void;
  fetchCertificates: () => void;
};

const INITIAL_STATE: State = {
  certificates: [], // should be []
  hideAll: false,
  hiddenCertificates: null,
  isLoading: false,
  error: null,
};

async function getData() {
  try {
    const res = await fetch(`/api/certificatesInfo`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

const storeCache: Record<string, any> = {};

export const createCertificateInfo = (certificateHeaderID: string) => {
  if (storeCache[certificateHeaderID]) {
    return storeCache[certificateHeaderID];
  }

  const useCertificatesInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE, // Spread the initial state
        fetchCertificates: async () => {
          set({ isLoading: true });
          try {
            const certificates: Certificate[] | null =
              (await getData()).certificates || INITIAL_STATE.certificates;

            const hiddenCertificates = certificates
              ? certificates.reduce((acc, certificate) => {
                  acc[certificate._id] = false;
                  return acc;
                }, {} as { [key: string]: boolean })
              : null;

            set({
              certificates: certificates ? certificates : [],
              hiddenCertificates: hiddenCertificates,
              isLoading: false,
            });
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
