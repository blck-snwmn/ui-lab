import { ShinyText } from "./components/ShinyText";
import { ClickSpark } from "./components/ClickSpark";
import { Magnet } from "./components/Magnet";
import { SpotlightCard } from "./components/SpotlightCard";
import { TiltedCard } from "./components/TiltedCard";
import { Squares } from "./components/Squares";
import { StarBorder } from "./components/StarBorder";
import { Particles } from "./components/Particles";

function App() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">React Bits Demo</h1>
        <p className="text-gray-400">Animated UI Components for React</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-16">
        {/* Text Animations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
            Text Animations
          </h2>
          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-500 mb-4">ShinyText</p>
            <ShinyText
              text="Shimmering Text Effect"
              className="text-4xl font-bold"
              shineColor="#00ffff"
              speed={2}
            />
          </div>
        </section>

        {/* Animations / Interactions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
            Animations & Interactions
          </h2>

          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-500 mb-4">
              ClickSpark - Click anywhere in the box
            </p>
            <ClickSpark
              sparkColor="#ffd700"
              sparkSize={12}
              sparkRadius={25}
              sparkCount={10}
              extraScale={1.5}
            >
              <div className="h-32 flex items-center justify-center border border-dashed border-gray-700 rounded-lg cursor-pointer">
                <span className="text-gray-400">Click me!</span>
              </div>
            </ClickSpark>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-500 mb-4">
              Magnet - Hover near the button
            </p>
            <div className="flex justify-center py-8">
              <Magnet padding={80} magnetStrength={1.5}>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Magnetic Button
                </button>
              </Magnet>
            </div>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-500 mb-4">
              StarBorder - Animated border effect
            </p>
            <div className="flex justify-center py-4">
              <StarBorder color="#00ffff" speed="4s">
                Star Border Button
              </StarBorder>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
            Components
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.4)">
              <h3 className="text-xl font-bold mb-2">SpotlightCard</h3>
              <p className="text-gray-400">
                Move your mouse over this card to see the spotlight effect
                following your cursor.
              </p>
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(236, 72, 153, 0.4)">
              <h3 className="text-xl font-bold mb-2">Another Card</h3>
              <p className="text-gray-400">
                The spotlight color can be customized for each card.
              </p>
            </SpotlightCard>
          </div>

          <div className="p-6 bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-500 mb-4">
              TiltedCard - 3D tilt effect on hover
            </p>
            <div className="flex justify-center">
              <TiltedCard
                imageSrc="https://picsum.photos/300/300"
                altText="Demo image"
                captionText="Hover me!"
                containerHeight="320px"
                imageHeight="280px"
                imageWidth="280px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
              />
            </div>
          </div>
        </section>

        {/* Backgrounds */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
            Backgrounds
          </h2>
          <div className="rounded-lg overflow-hidden">
            <p className="text-sm text-gray-500 mb-4">
              Squares - Animated grid background (hover over squares)
            </p>
            <div className="h-64 relative">
              <Squares
                direction="diagonal"
                speed={0.5}
                borderColor="#333"
                squareSize={50}
                hoverFillColor="#1a1a2e"
              />
            </div>
          </div>

          <div className="rounded-lg overflow-hidden">
            <p className="text-sm text-gray-500 mb-4">
              Particles - WebGL particle system (move mouse to interact)
            </p>
            <div className="h-80 relative bg-black rounded-lg">
              <Particles
                particleCount={300}
                particleSpread={8}
                speed={0.3}
                particleColors={["#00ffff", "#ff00ff", "#ffff00"]}
                moveParticlesOnHover={true}
                particleBaseSize={80}
                alphaParticles={true}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>
          Components from{" "}
          <a
            href="https://www.reactbits.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            React Bits
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
