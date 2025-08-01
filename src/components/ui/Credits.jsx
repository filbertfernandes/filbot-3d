import React from 'react'

const Credits = () => {
  return (
    <div className="fixed bottom-4 right-4 z-10 text-gray-300 text-xs bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm max-w-xs">
      <p className="leading-relaxed">
        Developed by{' '}
        <a href="#" className="underline font-medium" target="_blank" rel="noopener noreferrer">Filbert Fernandes</a><span className='mr-1'>.</span>
        (<a href="#" className="underline font-medium" target="_blank" rel="noopener noreferrer">Source Code</a>)
        
        <br /><br />

        <span className="font-semibold">3D Models:</span><br />
        <a href="https://sketchfab.com/3d-models/toy-robot-animated-lowpoly-6bc8f39aac354dfbbd374bb9ba5b4c24" target="_blank" rel="noopener noreferrer" className="underline">
          "Toy Robot Animated - Lowpoly"
        </a> by <a href="https://sketchfab.com/rkmorello" target="_blank" rel="noopener noreferrer" className="underline">rkmorello</a><br />

        <a href="https://sketchfab.com/3d-models/low-poly-truck-98826ebd44e2492298ac925461509216" target="_blank" rel="noopener noreferrer" className="underline">
          "Low Poly Truck"
        </a> by <a href="https://sketchfab.com/Arifido._" target="_blank" rel="noopener noreferrer" className="underline">Arifido._</a><br />

        <a href="https://sketchfab.com/3d-models/cardboard-boxes-713484d8f2284528bbd28ad41e197b24" target="_blank" rel="noopener noreferrer" className="underline">
          "Cardboard Boxes"
        </a> by <a href="https://sketchfab.com/juancarloscr" target="_blank" rel="noopener noreferrer" className="underline">JuanCarlos CR</a>
      </p>
    </div>
  )
}

export default Credits
