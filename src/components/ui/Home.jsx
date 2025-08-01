import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { phases, useAppStore } from "../../stores/useAppStore"
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const setPhase = useAppStore((state) => state.setPhase)
  const phase = useAppStore((state) => state.phase)

  useEffect(() => {
    const text1 = document.getElementById("text1");
    const text2 = document.getElementById("text2");

    if (!text1 || !text2) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#section2",
          start: "top bottom",
          end: "50% bottom",
          scrub: true,
        },
      })
      .to(text1, {
        opacity: 0,
        ease: "power2.inOut",
      });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#section2",
          start: "top 50%",
          end: "top top",
          scrub: true,
        },
      })
      .to(text2, {
        opacity: 1,
        ease: "power2.inOut",
      });
  }, []);

  return (
    <div className={`relative z-10 transition-opacity duration-500 ease-in-out ${phase === phases.HOME ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <section 
        id="section1"
        className="min-h-screen flex flex-col justify-center px-20 text-white font-poppins items-end"
      >
        <div
          id="text1"
          className="w-1/2"
        >
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Meet, <span className="text-emerald-400">FILBOT</span>.
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            <strong>FILBOT</strong> is your <strong>smart robotic companion</strong> — stylish, futuristic, and full of personality.
            <br />
            Customize your favorite color, and we'll build and deliver <strong>FILBOT straight to your home.</strong>
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
      </section>

      <section
        id="section2"
        className="min-h-screen flex flex-col justify-center px-20 text-white font-poppins"
      >
        <div
          id="text2"
          className="w-1/2 opacity-0"
        >
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Over 500,000 <span className="text-emerald-400">FILBOTs</span> Delivered Worldwide & Counting.
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            The <strong>future</strong> is rolling in, and it's <strong>more fun</strong> than ever. Ready to <strong>meet yours</strong>?
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
