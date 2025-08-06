import { create } from "zustand";

export const phases = {
    HOME: "HOME",
    CUSTOMIZE: "CUSTOMIZE",
    FEATURES: "FEATURES",
}

export const useAppStore = create((set) => ({
  phase: phases.HOME,
  filbotColors: {
      Base: '#009966',
      Side: '#a4f4cf',
      Antenna: '#ff1c1c',
      Eyes: '#4094ff',
      Skeleton: '#c3c3c3',
      Joints: '#a4f4cf',
      Wheels: '#c3c3c3',
  },
  isPlayAnimation: false,
  isStopBlinking: false,
  eyelidLeftMorph: 0,
  eyelidRightMorph: 0,
  isNeedSticker: false,
  stickerTexture: null,
  activeFeatureIndex: 0,

  setPhase: (phase) => {
    window.scrollTo(0, 0);
    set(() => {
      return { phase };
    });
  },

  setFilbotColors: (filbotColors) => {
    set(() => {
      return { filbotColors };
    });
  },

  setPlayAnimation: (isPlayAnimation) => {
    set(() => {
      return { isPlayAnimation }
    })
  },

  setStopBlinking: (isStopBlinking) => {
    set(() => {
      return { isStopBlinking }
    })
  },

  setEyelidLeftMorph: (eyelidLeftMorph) => {
    set(() => {
      return { eyelidLeftMorph }
    })
  },

  setEyelidRightMorph: (eyelidRightMorph) => {
    set(() => {
      return { eyelidRightMorph }
    })
  },

  setNeedSticker: (isNeedSticker) => {
    set(() => {
      return { isNeedSticker };
    });
  },

  setStickerTexture: (stickerTexture) => {
    set(() => {
      return { stickerTexture };
    });
  },

  setActiveFeatureIndex: (activeFeatureIndex) => {
    set(() => {
      return { activeFeatureIndex };
    });
  },

  incrementActiveFeatureIndex: () => {
    set((state) => {
      const newActiveFeatureIndex = state.activeFeatureIndex !== 6 ? state.activeFeatureIndex + 1 : 0
      return { activeFeatureIndex: newActiveFeatureIndex };
    });
  },

  decrementActiveFeatureIndex: () => {
    set((state) => {
      const newActiveFeatureIndex = state.activeFeatureIndex !== 0 ? state.activeFeatureIndex - 1 : 0
      return { activeFeatureIndex: newActiveFeatureIndex };
    });
  }
}));
