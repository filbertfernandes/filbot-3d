import { useRef } from 'react'
import { phases, useAppStore } from '../../stores/useAppStore'

const Customize = () => {
    const phase = useAppStore((state) => state.phase)
    const filbotColors = useAppStore((state) => state.filbotColors)
    const setFilbotColors = useAppStore((state) => state.setFilbotColors)
    const setPlayAnimation = useAppStore((state) => state.setPlayAnimation)
    
    const isStopBlinking = useAppStore((state) => state.isStopBlinking)
    const eyelidLeftMorph = useAppStore((state) => state.eyelidLeftMorph)
    const eyelidRightMorph = useAppStore((state) => state.eyelidRightMorph)
    const setStopBlinking = useAppStore((state) => state.setStopBlinking)
    const setEyelidLeftMorph = useAppStore((state) => state.setEyelidLeftMorph)
    const setEyelidRightMorph = useAppStore((state) => state.setEyelidRightMorph)

    const eyelidLeftSliderRef = useRef()
    const eyelidRightSliderRef = useRef()

    const handleColorChange = (part, color) => {
        setFilbotColors({
            ...filbotColors,
            [part]: color,
        })
    }    
    
    const handleReset = () => {
        setFilbotColors({
            Base: '#009966',
            Side: '#a4f4cf',
            Antenna: '#ff1c1c',
            Eyes: '#4094ff',
            Skeleton: '#c3c3c3',
            Joints: '#a4f4cf',
            Wheels: '#c3c3c3',
        })
    }
    
    const handleRandom = () => {
        const randomColor = () =>
            '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    
        const newColors = Object.keys(filbotColors).reduce((acc, part) => {
            acc[part] = randomColor();
            return acc;
        }, {});
    
        setFilbotColors(newColors);

        if (isStopBlinking) {
            const randomLeft = Math.random().toFixed(2)
            const randomRight = Math.random().toFixed(2)
    
            setEyelidLeftMorph(parseFloat(randomLeft))
            setEyelidRightMorph(parseFloat(randomRight))
    
            if (eyelidLeftSliderRef.current) eyelidLeftSliderRef.current.value = randomLeft
            if (eyelidRightSliderRef.current) eyelidRightSliderRef.current.value = randomRight
        }
    };
      
    return (
        <>
            <div
                className={`absolute z-10 bg-gray-950 text-white py-4 px-6 rounded-2xl shadow-xl font-poppins border border-gray-700 transition-opacity duration-500 
                    top-6 left-1/2 -translate-x-1/2 h-1/3 overflow-y-auto
                    md:top-1/2 md:right-20 md:left-auto md:translate-x-0 md:-translate-y-1/2 md:w-1/4 w-[90%] md:h-4/5
                    ${phase === phases.CUSTOMIZE ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            >
                {/* Go Back */}
                <button
                    onClick={() => useAppStore.getState().setPhase(phases.HOME)}
                    className="text-xs text-gray-300 hover:text-white mb-4 transition font-medium cursor-pointer md:text-sm"
                >
                    ← Go Back
                </button>
                
                {/* Title */}
                <h3 className="text-base font-semibold text-white mb-2 md:text-lg">Customization</h3>
            
                {/* Color Pickers */}
                <div className="flex flex-wrap justify-between space-y-3 mb-6 md:flex-col">
                    {Object.keys(filbotColors).map((part) => (
                    <div key={part} className="flex justify-between items-center w-2/5 md:w-full">
                        <span className="text-sm md:text-base">{part} Color</span>
                        <input
                            type="color"
                            value={filbotColors[part]}
                            onChange={(e) => handleColorChange(part, e.target.value)}
                            checked={isStopBlinking}
                            className="w-1/4 h-8 border-none rounded overflow-hidden cursor-pointer bg-transparent"
                        />
                    </div>
                    ))}
                </div>

                {/* Stop Blinking */}
                <div className="flex items-center mb-2">
                    <input
                        id="stop-blinking"
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer mr-2"
                        onChange={(e) => setStopBlinking(e.target.checked)}
                    />
                    <label className="text-sm md:text-base" htmlFor="stop-blinking">
                        Stop Blinking
                    </label>
                </div>

                {/* Eyelid Sliders */}
                <div className="space-y-1 mb-6">
                    <div>
                        <label htmlFor="eyelid-left" className={`block text-sm md:text-base mb-1 ${!isStopBlinking ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Eyelid Left
                        </label>
                        <input
                            ref={eyelidLeftSliderRef}
                            id="eyelid-left"
                            type="range"
                            value={eyelidLeftMorph}
                            min="0"
                            max="1"
                            step="0.01"
                            onChange={(e) => setEyelidLeftMorph(parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg cursor-pointer transition disabled:bg-gray-600 disabled:cursor-not-allowed"
                            disabled={!isStopBlinking}
                        />
                    </div>

                    <div>
                        <label htmlFor="eyelid-right" className={`block text-sm md:text-base mb-1 ${!isStopBlinking ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Eyelid Right
                        </label>
                        <input
                            ref={eyelidRightSliderRef}
                            id="eyelid-right"
                            type="range"
                            value={eyelidRightMorph}
                            min="0"
                            max="1"
                            step="0.01"
                            onChange={(e) => setEyelidRightMorph(parseFloat(e.target.value))}
                            className="w-full h-2 rounded-lg cursor-pointer transition disabled:bg-gray-600 disabled:cursor-not-allowed"
                            disabled={!isStopBlinking}
                        />
                    </div>
                </div>

            
                {/* Buttons */}
                <div className="flex justify-between text-sm md:text-base">
                    <button
                        className="w-[45%] py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white font-semibold transition cursor-pointer"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        className="w-[45%] py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white font-semibold transition cursor-pointer"
                        onClick={handleRandom}
                    >
                        Random
                    </button>
                </div>
                <div className="mt-4 flex text-sm md:text-base">
                    <button
                        className="w-full py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition cursor-pointer"
                        onClick={() => setPlayAnimation(true)}
                    >
                        Play Animation
                    </button>
                </div>
            </div>
        </>
    )
}

export default Customize
