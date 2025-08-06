import { Html } from "@react-three/drei";
import { features } from "../data/features";
import { phases, useAppStore } from "../stores/useAppStore";

const FeatureMarkers = () => {
  const phase = useAppStore((state) => state.phase);
  const activeFeatureIndex = useAppStore((state) => state.activeFeatureIndex)
  const setActiveFeatureIndex = useAppStore((state) => state.setActiveFeatureIndex)

  return (
    <>
      {features.map((feature, index) => {
        const isActive = activeFeatureIndex === index;
        return (
          <Html
            key={index}
            position={feature.position}
            wrapperClass="label"
            distanceFactor={1.2}
            occlude
          >
            <div 
              onClick={() => setActiveFeatureIndex(index)}
              className="group size-36 flex justify-center items-center cursor-pointer"
            >
              <div
                className={`
                  size-18 rounded-full cursor-pointer transition-all duration-500 ease-in-out
                  ${isActive ? "scale-110 bg-[#a1ffa1]" : "bg-[#eaffea]"}
                  ${phase === phases.FEATURES ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                  ${isActive
                    ? "shadow-[0_0_25px_12px_rgba(198,255,198,1),0_0_50px_30px_rgba(198,255,198,0.8),0_0_80px_60px_rgba(198,255,198,0.5)]"
                    : "shadow-[0_0_15px_6px_rgba(234,255,234,0.9),0_0_30px_15px_rgba(234,255,234,0.6),0_0_50px_30px_rgba(234,255,234,0.4)] group-hover:shadow-[0_0_20px_10px_rgba(234,255,234,1),0_0_40px_20px_rgba(234,255,234,0.8),0_0_60px_40px_rgba(234,255,234,0.6)]"}
                `}
              />
            </div>
          </Html>
        );
      })}
    </>
  );
};

export default FeatureMarkers;
