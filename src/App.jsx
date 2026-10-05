import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Droplets,
  House,
  Leaf,
  Lightbulb,
  MapPin,
  MessageCircle,
  Plus,
  Search,
  Sprout,
  Sun,
  ThermometerSun,
  Wind,
  X,
} from 'lucide-react'
import './App.css'

const initialPlants = [
  {
    id: 1,
    name: 'Milo',
    species: 'Monstera deliciosa',
    room: 'Living room',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85',
    waterDue: false,
    waterText: 'Watered 3 days ago',
    frequency: 'Every 10–14 days',
    light: 'Bright, indirect light',
    waterGuide: 'Let the top 2 inches of soil dry out, then water thoroughly until it drains. Empty the saucer after 15 minutes.',
    humidity: 'Average home humidity is fine',
    temperature: '65–85°F (18–29°C)',
    note: 'Rotate a quarter turn every week for even growth.',
    health: 'Looking happy',
  },
  {
    id: 2,
    name: 'Fern',
    species: 'Bird’s nest fern',
    room: 'Bathroom',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85',
    waterDue: true,
    waterText: 'Water is due today',
    frequency: 'Keep soil lightly moist',
    light: 'Medium, filtered light',
    waterGuide: 'Water when the surface just begins to feel dry. Pour around the edge of the pot; keep the crown dry to prevent rot.',
    humidity: 'Enjoys extra humidity',
    temperature: '60–80°F (16–27°C)',
    note: 'Brown tips often mean dry air, not a thirsty root ball.',
    health: 'A little thirsty',
  },
  {
    id: 3,
    name: 'Ziggy',
    species: 'ZZ plant',
    room: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85',
    waterDue: false,
    waterText: 'Watered 8 days ago',
    frequency: 'Every 2–3 weeks',
    light: 'Low to bright indirect light',
    waterGuide: 'Wait until the soil is completely dry from top to bottom. When in doubt, wait a few more days; ZZ plants store water in their rhizomes.',
    humidity: 'No extra humidity needed',
    temperature: '65–85°F (18–29°C)',
    note: 'Yellow leaves can be a sign of too-frequent watering.',
    health: 'Easy-going',
  },
]

const initialTasks = [
  { id: 1, plantId: 2, title: 'Water Fern', detail: 'Bird’s nest fern · Bathroom', kind: 'water', done: false },
  { id: 2, plantId: 1, title: 'Rotate Milo', detail: 'Monstera · Living room', kind: 'rotate', done: false },
  { id: 3, plantId: 3, title: 'Check Ziggy’s soil', detail: 'ZZ plant · Bedroom', kind: 'check', done: true },
]

const initialSwaps = [
  {
    id: 1,
    name: 'Pothos cuttings',
    detail: 'Golden pothos · 3 rooted cuttings',
    distance: '0.4 mi away',
    owner: 'Jules R.',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=85',
    color: 'mint',
  },
  {
    id: 2,
    name: 'Tiny terracotta pots',
    detail: 'Set of 2 · 3 inch, handmade',
    distance: '1.2 mi away',
    owner: 'Amara K.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=85',
    color: 'peach',
  },
  {
    id: 3,
    name: 'Spider plant baby',
    detail: 'Well-rooted pup · beginner friendly',
    distance: '2.1 mi away',
    owner: 'Theo M.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=85',
    color: 'lime',
  },
]

const navItems = [
  { id: 'home', label: 'Overview', icon: House },
  { id: 'plants', label: 'My plants', icon: Leaf, count: '3' },
  { id: 'swaps', label: 'Plant swap', icon: RepeatIcon },
]

function RepeatIcon(props) {
  return <ArrowUpRight {...props} />
}

function App() {
  const [activeView, setActiveView] = useState('home')
  const [plants, setPlants] = useState(initialPlants)
  const [tasks, setTasks] = useState(initialTasks)
  const [swaps] = useState(initialSwaps)
  const [search, setSearch] = useState('')
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [showAddPlant, setShowAddPlant] = useState(false)
  const [plantName, setPlantName] = useState('')
  const [plantSpecies, setPlantSpecies] = useState('')
  const [notice, setNotice] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)

  const filteredPlants = useMemo(() => plants.filter((plant) =>
    `${plant.name} ${plant.species} ${plant.room}`.toLowerCase().includes(search.toLowerCase()),
  ), [plants, search])

  const filteredSwaps = useMemo(() => swaps.filter((swap) =>
    `${swap.name} ${swap.detail} ${swap.owner}`.toLowerCase().includes(search.toLowerCase()),
  ), [swaps, search])

  const showNotice = (message) => {
    setNotice(message)
    window.clearTimeout(showNotice.timeout)
    showNotice.timeout = window.setTimeout(() => setNotice(''), 2800)
  }

  const markWatered = (plantId) => {
    setPlants((current) => current.map((plant) => plant.id === plantId
      ? { ...plant, waterDue: false, waterText: 'Watered just now', health: 'Looking happy' }
      : plant,
    ))
    setTasks((current) => current.map((task) => task.plantId === plantId && task.kind === 'water'
      ? { ...task, done: true }
      : task,
    ))
    showNotice('Watering logged. Nice work.')
  }

  const toggleTask = (taskId) => {
    const task = tasks.find((item) => item.id === taskId)
    if (task?.kind === 'water' && !task.done) {
      markWatered(task.plantId)
      return
    }
    setTasks((current) => current.map((item) => item.id === taskId ? { ...item, done: !item.done } : item))
  }

  const addPlant = (event) => {
    event.preventDefault()
    if (!plantName.trim() || !plantSpecies.trim()) return
    const newPlant = {
      id: plants.reduce((highestId, plant) => Math.max(highestId, plant.id), 0) + 1,
      name: plantName.trim(),
      species: plantSpecies.trim(),
      room: 'New spot',
      image: 'https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=900&q=85',
      waterDue: false,
      waterText: 'Care schedule starts today',
      frequency: 'Check soil before watering',
      light: 'Bright, indirect light',
      waterGuide: 'Check the soil before you water. Most houseplants prefer to dry slightly between drinks; avoid leaving roots in standing water.',
      humidity: 'Average home humidity is fine',
      temperature: '65–80°F (18–27°C)',
      note: 'Keep an eye on the leaves as your plant settles in.',
      health: 'New to your home',
    }
    setPlants((current) => [newPlant, ...current])
    setPlantName('')
    setPlantSpecies('')
    setShowAddPlant(false)
    setActiveView('plants')
    showNotice(`${newPlant.name} has a new home in your collection.`)
  }

  const messageSwap = (swapName) => showNotice(`Message sent about ${swapName}.`)

  const pageTitle = activeView === 'plants' ? 'My plants' : activeView === 'swaps' ? 'Plant swap' : 'Your little corner of green'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" onClick={(event) => { event.preventDefault(); setActiveView('home') }} aria-label="Verdant home">
          <span className="brand-mark"><Sprout size={19} strokeWidth={2.2} /></span>
          <span>verdant<span className="brand-period">.</span></span>
        </a>

        <div className="sidebar-label">YOUR SPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon, count }) => (
            <button className={`nav-link ${activeView === id ? 'active' : ''}`} key={id} aria-label={label} onClick={() => { setActiveView(id); setSearch('') }}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {count && <span className="nav-count">{plants.length}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-spotlight">
          <div className="spotlight-icon"><Lightbulb size={17} /></div>
          <p className="spotlight-kicker">A little reminder</p>
          <p className="spotlight-copy">A droopy leaf can mean too much water, not too little.</p>
          <button onClick={() => setSelectedPlant(plants[0] ?? initialPlants[0])}>Learn your plant <ArrowUpRight size={14} /></button>
        </div>

        <button className="profile-button" onClick={() => showNotice('You’re all caught up, Maya.') }>
          <span className="profile-avatar">M</span>
          <span className="profile-meta"><strong>Maya Chen</strong><small>Plant person, learning</small></span>
          <ChevronDown size={16} />
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="location-chip"><MapPin size={14} /><span>Portland, OR</span><span className="location-divider">·</span><span>72° and bright</span></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input aria-label="Search plants and swaps" placeholder="Search your garden" value={search} onChange={(event) => setSearch(event.target.value)} />
              {search && <button className="clear-search" aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button>}
            </label>
            <div className="notification-wrap">
              <button className={`icon-button notification-button ${showNotifications ? 'selected' : ''}`} aria-label="Notifications" onClick={() => setShowNotifications((open) => !open)}>
                <Bell size={18} /><span className="notification-dot" />
              </button>
              {showNotifications && <div className="notification-popover"><strong>One small thing today</strong><span>Fern is ready for a drink. Your other plants are doing just fine.</span><button onClick={() => { setShowNotifications(false); setActiveView('home') }}>See today’s care <ChevronRight size={14} /></button></div>}
            </div>
            <span className="top-avatar" aria-hidden="true">M</span>
          </div>
        </header>

        <div className="page-wrap">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> MONDAY, OCTOBER 5, 2026</div>
              <h1>{activeView === 'home' ? <>Good morning, Maya<span className="heading-flower">.</span></> : pageTitle}</h1>
              <p className="welcome-subtitle">{activeView === 'home' ? 'A good day to check in on your leafy roommates.' : activeView === 'plants' ? 'A little care goes a long way.' : 'Good plants, good people, close to home.'}</p>
            </div>
            <button className="primary-button add-button" onClick={() => setShowAddPlant(true)}><Plus size={17} /> Add a plant</button>
          </section>

          {activeView === 'home' && (
            <section className="conditions-banner" aria-label="Today’s indoor conditions">
              <div className="conditions-intro"><span className="conditions-icon"><Sun size={19} /></span><span><strong>A bright, easy day</strong><small>Soft window light is lovely for most of your plants today.</small></span></div>
              <div className="condition-stat"><ThermometerSun size={17} /><span><b>72°</b><small>indoors</small></span></div>
              <div className="condition-stat"><Wind size={17} /><span><b>48%</b><small>humidity</small></span></div>
              <div className="conditions-stamp"><span>GROWING</span><span>TOGETHER</span><Sprout size={24} /></div>
            </section>
          )}

          {(activeView === 'home' || activeView === 'plants') && (
            <section className="collection-section">
              <div className="section-heading">
                <div><div className="section-kicker">YOUR COLLECTION</div><h2>{activeView === 'home' ? 'Your plants' : 'All your plants'} <span className="heading-count">{plants.length}</span></h2></div>
                <button className="text-link" onClick={() => setActiveView('plants')}>View collection <ArrowUpRight size={15} /></button>
              </div>
              {filteredPlants.length ? <div className="plant-grid">
                {filteredPlants.map((plant) => (
                  <article className="plant-card" key={plant.id}>
                    <button className="plant-photo-button" onClick={() => setSelectedPlant(plant)} aria-label={`View care profile for ${plant.name}`}>
                      <img className="plant-photo" src={plant.image} alt={`${plant.species} in a home`} />
                      <span className={`health-pill ${plant.waterDue ? 'needs-water' : ''}`}><span />{plant.health}</span>
                    </button>
                    <div className="plant-card-body">
                      <div className="plant-name-row"><div><h3>{plant.name}</h3><p>{plant.species}</p></div><button className="round-arrow" aria-label={`Open ${plant.name} care profile`} onClick={() => setSelectedPlant(plant)}><ChevronRight size={17} /></button></div>
                      <div className="plant-card-bottom">
                        <span className={`water-status ${plant.waterDue ? 'water-status-due' : ''}`}><Droplets size={14} />{plant.waterText}</span>
                        {plant.waterDue && <button className="water-button" onClick={() => markWatered(plant.id)}>Water <Check size={13} /></button>}
                      </div>
                    </div>
                  </article>
                ))}
                <button className="add-plant-tile" onClick={() => setShowAddPlant(true)}><span><Plus size={20} /></span><strong>Make room for one more</strong><small>Add to your collection</small></button>
              </div> : <div className="empty-state"><Sprout size={25} /><strong>No plants found</strong><span>Try another name or clear your search.</span></div>}
            </section>
          )}

          {activeView === 'home' && (
            <div className="dashboard-lower">
              <section className="care-section">
                <div className="section-heading compact-heading">
                  <div><div className="section-kicker">JUST WHAT NEEDS DOING</div><h2>Today’s care <span className="task-count">{tasks.filter((task) => !task.done).length} left</span></h2></div>
                  <button className="text-link" onClick={() => showNotice('Your care routine is up to date.')}>Care history <ArrowUpRight size={15} /></button>
                </div>
                <div className="task-list">
                  {tasks.map((task) => {
                    const plant = plants.find((item) => item.id === task.plantId)
                    return <div className={`task-row ${task.done ? 'task-done' : ''}`} key={task.id}>
                      <button className={`task-check ${task.done ? 'checked' : ''}`} aria-label={`${task.done ? 'Mark incomplete' : 'Complete'}: ${task.title}`} onClick={() => toggleTask(task.id)}>{task.done && <Check size={14} />}</button>
                      <span className={`task-icon task-icon-${task.kind}`}>{task.kind === 'water' ? <Droplets size={16} /> : task.kind === 'rotate' ? <Sun size={16} /> : <Search size={15} />}</span>
                      <span className="task-copy"><strong>{task.title}</strong><small>{plant ? `${plant.species} · ${plant.room}` : task.detail}</small></span>
                      <span className="task-time">{task.done ? 'Done' : task.kind === 'water' ? 'Today' : 'Anytime'}</span>
                    </div>
                  })}
                </div>
                <div className="care-note"><span><Lightbulb size={16} /></span><p><strong>When in doubt, check the soil.</strong> Your finger is a better watering reminder than a calendar.</p></div>
              </section>

              <section className="swap-section">
                <div className="section-heading compact-heading">
                  <div><div className="section-kicker">AROUND THE NEIGHBORHOOD</div><h2>Swap shelf</h2></div>
                  <button className="text-link" onClick={() => setActiveView('swaps')}>See all <ArrowUpRight size={15} /></button>
                </div>
                <div className="swap-list">
                  {filteredSwaps.slice(0, 2).map((swap) => (
                    <article className="swap-item" key={swap.id}>
                      <img src={swap.image} alt="Plant available to swap" />
                      <div className="swap-item-copy"><strong>{swap.name}</strong><small>{swap.detail}</small><span><MapPin size={12} />{swap.distance}</span></div>
                      <button className="swap-contact" onClick={() => messageSwap(swap.name)} aria-label={`Message ${swap.owner} about ${swap.name}`}><MessageCircle size={16} /></button>
                    </article>
                  ))}
                  {!filteredSwaps.length && <div className="swap-empty">No nearby swaps match that search.</div>}
                </div>
                <button className="swap-cta" onClick={() => setActiveView('swaps')}>Find your next plant <ArrowUpRight size={15} /></button>
              </section>
            </div>
          )}

          {activeView === 'swaps' && (
            <section className="swap-page-section">
              <div className="swap-intro-band"><div><span className="section-kicker">GIVE A LEAF, GET A LEAF</span><h2>Good things grow<br />when they’re shared.</h2><p>Find cuttings, pots, and plant friends around Portland.</p></div><span className="swap-intro-art"><Sprout size={58} strokeWidth={1.2} /></span></div>
              <div className="section-heading swap-page-heading"><div><div className="section-kicker">NEAR YOU · PORTLAND, OR</div><h2>On the swap shelf <span className="heading-count">{filteredSwaps.length}</span></h2></div><button className="secondary-button" onClick={() => showNotice('Your swap listing draft is ready to start.') }><Plus size={16} /> List something</button></div>
              {filteredSwaps.length ? <div className="swap-page-grid">{filteredSwaps.map((swap) => <article className="swap-card" key={swap.id}><div className={`swap-card-photo ${swap.color}`}><img src={swap.image} alt={`${swap.name} available from ${swap.owner}`} /><span className="distance-tag"><MapPin size={12} />{swap.distance}</span></div><div className="swap-card-body"><div className="swap-owner"><span className="owner-avatar">{swap.owner.charAt(0)}</span><span>From {swap.owner}</span></div><h3>{swap.name}</h3><p>{swap.detail}</p><button className="primary-button swap-message" onClick={() => messageSwap(swap.name)}><MessageCircle size={16} /> Message about this</button></div></article>)}</div> : <div className="empty-state"><Sprout size={25} /><strong>No swaps found</strong><span>Try a different search nearby.</span></div>}
              <div className="swap-guideline"><span className="guideline-icon"><Leaf size={18} /></span><p><strong>Keep swaps kind and local.</strong> Meet in a public place, share plant details honestly, and only offer what you’re happy to part with.</p></div>
            </section>
          )}

          {activeView === 'plants' && <div className="plant-care-footer"><span className="footer-mark"><Sprout size={16} /></span><p><strong>Care that makes sense.</strong> We’ll remind you when a plant needs attention, not just because a date says so.</p><button onClick={() => setActiveView('home')}>Back to today <ChevronRight size={14} /></button></div>}
          <footer className="page-footer"><span>Made for the love of growing things.</span><span>VERDANT <span>·</span> EST. 2026</span></footer>
        </div>
      </main>

      {selectedPlant && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedPlant(null) }}><section className="plant-modal" role="dialog" aria-modal="true" aria-labelledby="plant-modal-title"><button className="modal-close" onClick={() => setSelectedPlant(null)} aria-label="Close care profile"><X size={18} /></button><img className="modal-plant-image" src={selectedPlant.image} alt={selectedPlant.species} /><div className="modal-content"><span className="section-kicker">YOUR CARE GUIDE · {selectedPlant.room.toUpperCase()}</span><h2 id="plant-modal-title">{selectedPlant.name}<span>.</span></h2><p className="modal-species">{selectedPlant.species}</p><div className="care-guide-callout"><span className="guide-droplet"><Droplets size={18} /></span><div><strong>Watering, made simple</strong><p>{selectedPlant.waterGuide}</p></div></div><div className="care-facts"><div><Sun size={16} /><span><small>LIGHT</small><strong>{selectedPlant.light}</strong></span></div><div><Clock3 size={16} /><span><small>WATER RHYTHM</small><strong>{selectedPlant.frequency}</strong></span></div><div><Wind size={16} /><span><small>HUMIDITY</small><strong>{selectedPlant.humidity}</strong></span></div><div><ThermometerSun size={16} /><span><small>TEMPERATURE</small><strong>{selectedPlant.temperature}</strong></span></div></div><div className="plant-tip"><Lightbulb size={16} /><span>{selectedPlant.note}</span></div><div className="modal-actions">{selectedPlant.waterDue && <button className="primary-button" onClick={() => { markWatered(selectedPlant.id); setSelectedPlant(null) }}><Droplets size={16} /> Log watering</button>}<button className="secondary-button" onClick={() => setSelectedPlant(null)}>Got it</button></div></div></section></div>}

      {showAddPlant && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAddPlant(false) }}><section className="add-modal" role="dialog" aria-modal="true" aria-labelledby="add-modal-title"><button className="modal-close" onClick={() => setShowAddPlant(false)} aria-label="Close add plant form"><X size={18} /></button><span className="add-modal-mark"><Sprout size={23} /></span><span className="section-kicker">A NEW LITTLE ROOMMATE</span><h2 id="add-modal-title">Add a plant<span>.</span></h2><p className="add-modal-subtitle">Let’s get to know your new leafy friend.</p><form onSubmit={addPlant}><label htmlFor="plant-name">What do you call it?</label><input id="plant-name" autoFocus placeholder="e.g. Fernanda" value={plantName} onChange={(event) => setPlantName(event.target.value)} required /><label htmlFor="plant-species">Plant type</label><input id="plant-species" placeholder="e.g. Boston fern" value={plantSpecies} onChange={(event) => setPlantSpecies(event.target.value)} required /><button className="primary-button add-submit" type="submit"><Plus size={16} /> Add to my plants</button></form></section></div>}

      {notice && <div className="toast" role="status"><span className="toast-check"><Check size={14} /></span>{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}><X size={14} /></button></div>}
    </div>
  )
}

export default App
