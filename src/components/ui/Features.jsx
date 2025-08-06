import React from 'react'
import { phases, useAppStore } from '../../stores/useAppStore'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { features } from '../../data/features';

const Features = () => {
    const phase = useAppStore((state) => state.phase)
    const activeFeatureIndex = useAppStore((state) => state.activeFeatureIndex)
    const incrementActiveFeatureIndex = useAppStore((state) => state.incrementActiveFeatureIndex)
    const decrementActiveFeatureIndex = useAppStore((state) => state.decrementActiveFeatureIndex)

    return (
        <>
            <div
                className={`absolute flex flex-col justify-between z-10 bg-gray-950 text-white py-4 px-6 rounded-2xl shadow-xl font-poppins border border-gray-700 transition-opacity duration-500 
                    top-6 left-1/2 -translate-x-1/2 h-[35%] overflow-y-auto w-[90%]
                    md:top-1/2 md:right-6 md:left-auto md:translate-x-0 md:-translate-y-1/2 md:w-1/3 md:h-4/5
                    ${phase === phases.FEATURES ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            >
                <div>
                    {/* Go back button */}
                    <button
                        onClick={() => useAppStore.getState().setPhase(phases.HOME)}
                        className="text-xs text-gray-300 hover:text-white mb-4 transition font-medium cursor-pointer md:text-sm"
                    >
                        ← Go Back
                    </button>
            
                    {/* Image */}
                    <div className='flex gap-4 items-center w-full mb-2 md:flex-col'>
                        <div className="w-1/2 bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center md:w-full">
                            <img
                                src={features[activeFeatureIndex].image}
                                alt={features[activeFeatureIndex].name}
                                className="object-contain w-full h-full"
                            />
                        </div>

                        {/* Title */}
                        <h2 className="text-base font-semibold md:text-lg">
                            {features[activeFeatureIndex].title}
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-300 mb-6">
                        {features[activeFeatureIndex].description}
                    </p>
                </div>
                
                {/* Navigation Arrows */}
                <div className="flex justify-between w-full px-10 items-center space-x-2 text-base md:text-lg font-bold">
                    <button 
                        className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-600 transition cursor-pointer"
                        onClick={decrementActiveFeatureIndex}
                    >
                        <FaChevronLeft className="text-white" />
                    </button>
                    <span className="text-white">{features[activeFeatureIndex].name}</span>
                    <button 
                        className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-600 transition cursor-pointer"
                        onClick={incrementActiveFeatureIndex}
                    >
                        <FaChevronRight className="text-white" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Features
