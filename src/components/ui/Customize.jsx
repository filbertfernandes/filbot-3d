import { phases, useAppStore } from '../../stores/useAppStore'

const Customize = () => {
    const phase = useAppStore((state) => state.phase)
    const filbotColors = useAppStore((state) => state.filbotColors)
    const setFilbotColors = useAppStore((state) => state.setFilbotColors)
    const setPlayAnimation = useAppStore((state) => state.setPlayAnimation)

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
    };
      
    return (
        <>
            <div
                className={`absolute z-10 bg-gray-950 text-white py-4 px-6 rounded-2xl shadow-xl font-poppins border border-gray-700 transition-opacity duration-500 
                    top-6 left-1/2 -translate-x-1/2 h-1/3 overflow-scroll
                    md:top-1/2 md:right-20 md:left-auto md:translate-x-0 md:-translate-y-1/2 md:w-1/4 w-[90%] md:h-auto md:overflow-hidden
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
                <h3 className="text-base font-semibold text-white mb-4 md:text-lg">Color Customization</h3>
            
                {/* Color Pickers */}
                <div className="flex flex-wrap justify-between space-y-3 md:flex-col">
                    {Object.keys(filbotColors).map((part) => (
                    <div key={part} className="flex justify-between items-center w-2/5 md:w-full">
                        <span className="text-sm md:text-base">{part} Color</span>
                        <input
                            type="color"
                            value={filbotColors[part]}
                            onChange={(e) => handleColorChange(part, e.target.value)}
                            className="w-1/4 h-8 border-none rounded overflow-hidden cursor-pointer bg-transparent"
                        />
                    </div>
                    ))}
                </div>
            
                {/* Buttons */}
                <div className="mt-6 flex justify-between text-sm md:text-base">
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
