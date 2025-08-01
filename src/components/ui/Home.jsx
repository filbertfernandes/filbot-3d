import { phases, useAppStore } from "../../stores/useAppStore"

const Home = () => {
  const setPhase = useAppStore((state) => state.setPhase)
  const phase = useAppStore((state) => state.phase)

  return (
    <div
      className={`absolute top-1/2 right-24 transform -translate-y-1/2 w-2/5 text-white font-poppins transition-opacity duration-500 ease-in-out 
        ${phase === phases.HOME ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
        <h1 className="text-6xl font-bold leading-tight mb-6">
            Meet,
            <span className="text-emerald-400"> FILBOT</span>
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
            <strong>FILBOT</strong> is your <strong>smart robotic companion</strong> — stylish, futuristic, and full of personality.
            <br />
            Choose your favorite color, and we'll build and deliver <strong>FILBOT straight to your home.</strong>
        </p>

        <div className="flex gap-4 text-lg">
            <button 
              className="px-6 py-3 rounded-lg font-bold bg-emerald-500 hover:bg-emerald-600 transition cursor-pointer"
              onClick={() => setPhase(phases.CUSTOMIZE)}
            >
              Customize
            </button>
            <button 
              className="px-6 py-3 rounded-lg font-bold bg-emerald-500 hover:bg-emerald-600 transition cursor-pointer"
              onClick={() => setPhase(phases.FEATURES)}  
            >
              Features
            </button>
        </div>
    </div>
  )
}

export default Home
