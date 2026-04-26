import { createSignal, Show } from 'solid-js'
import Overview from './components/Overview'
import Explore from './components/Explore'
import Compose from './components/Compose'
import Navigate from './components/Navigate'
import Recover from './components/Recover'
import Components from './components/Components'

const TABS = [
  { id: 'home', label: 'Overview' },
  { id: 'explore', label: 'Explore' },
  { id: 'compose', label: 'Compose' },
  { id: 'navigate', label: 'Navigate' },
  { id: 'recover', label: 'Recover' },
  { id: 'components', label: 'Components' },
]

export default function App() {
  const [surface, setSurface] = createSignal('home')
  const isFullViewport = () => surface() === 'navigate'

  return (
    <>
      <Show when={!isFullViewport()}>
        <nav class="nav">
          <img src="/assets/logos/hostliday-wordmark.svg" alt="Hostliday" class="nav-logo" />
          <div class="nav-tabs">
            {TABS.map(t => (
              <button
                class={`nav-tab ${surface() === t.id ? 'active' : ''}`}
                onclick={() => setSurface(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>
      </Show>
      <main class={`main ${isFullViewport() ? 'full-viewport' : ''}`}>
        <div class={`surface ${surface() === 'home' ? 'active' : ''}`}>
          <Overview onNavigate={setSurface} />
        </div>
        <div class={`surface ${surface() === 'explore' ? 'active' : ''}`}>
          <Explore />
        </div>
        <div class={`surface ${surface() === 'compose' ? 'active' : ''}`}>
          <Compose />
        </div>
        <div class={`surface ${surface() === 'navigate' ? 'active' : ''}`}>
          <Navigate onExit={() => setSurface('home')} />
        </div>
        <div class={`surface ${surface() === 'recover' ? 'active' : ''}`}>
          <Recover />
        </div>
        <div class={`surface ${surface() === 'components' ? 'active' : ''}`}>
          <Components />
        </div>
      </main>
    </>
  )
}
