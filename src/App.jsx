import { useEffect, useRef, useState } from 'react';
const heroReelSrc = '/media/hero-portrait.mp4';
const heroLandscapeSrc = '/media/hero-landscape.mp4';

const projects = [
  { format: 'Community stories', title: 'Raw videos to fully edited content', result: 'Event coverage · short-form recaps', client: 'Edited event coverage and story-led recaps for Community Development Service.', tags: ['Video editing', 'Storytelling', 'Short-form'], videoSrc: '/media/raw-to-edited-content.mp4' },
  { format: 'Instagram Reel', title: 'Before I Turned 18', result: 'Creator story · Sep 2026', client: 'A short-form personal story about the things I wish I had known before turning eighteen.', tags: ['Storytelling', 'Editing'], vertical: true, videoSrc: '/media/before-i-turned-18.mp4', url: 'https://www.instagram.com/reel/DdwTMIaONc_/' },
  { format: 'Instagram Reel', title: 'Turning the Ordinary into a Cinematic Scene', result: 'Cinematic POV · Aug 2026', client: 'A lifestyle creator piece transforming everyday moments through cinematic visual storytelling.', tags: ['Concept development', 'Editing'], vertical: true, delay: '.12s', videoSrc: '/media/turning-the-ordinary-cinematic.mp4', url: 'https://www.instagram.com/reel/DcHCbAcinSc/' },
 
  { format: 'Brand content', title: 'KnitNest Content', result: 'From concept to final cut', client: 'Short- and long-form content created and produced for my own brand, KnitNest.', tags: ['Content strategy', 'Video production'], videoSrc: '/media/knitnest-content.mp4', url: 'https://www.instagram.com/reel/DdRpxutuN3p/' },
];

const highlights = [
  { value: 'End-to-end', label: 'concept, scripting, editing and finishing' },
  { value: 'Multi-format', label: 'vertical social and longer-form video' },
  { value: 'Story-first', label: 'pacing and visuals shaped for the audience' },
];

const skillGroups = [
  {
    name: 'Technical',
    items: ['Adobe Premiere Pro', 'CapCut', 'InShot', 'Pacing and visual continuity', 'Multi-camera editing', 'Sound mixing and SFX', 'Captions and on-screen typography', 'Platform optimization', 'Content calendars and engagement tracking'],
  },
  {
    name: 'Creative strengths',
    items: ['Creative thinking and concept development', 'Writing and visual storytelling', 'Attention to detail', 'Adaptability and continuous learning', 'Communication and collaboration'],
  },
];

const experience = [
  { title: 'Social Media Manager & Video Editor Intern', organization: 'African Film Institute', description: 'Managed post-production and supported digital content strategy; edited short- and long-form content, developed scripts and concepts, and created platform-specific visuals aligned with the institute’s brand.' },
  { title: 'Media Production Assistant', organization: 'Advent Cable Network, Abuja', description: 'Organized and edited media assets, supported post-production workflows, and collaborated with production teams to deliver clear pacing, clean audio, and visual continuity on deadline.' },
  { title: 'Freelance Video Editor & Content Strategist', organization: 'Self-employed', description: 'Provided end-to-end editing and content strategy, translating creative briefs into vertical and long-form videos while managing client feedback and project timelines.' },
];

const services = [
  { name: 'Video editing', description: 'Short- and long-form edits for TikTok, Instagram Reels, YouTube Shorts, YouTube and WhatsApp—with pacing, sound, captions and visual continuity.', deliverable: 'Editing' },
  { name: 'Content strategy', description: 'Creative concepts, scriptwriting, platform-specific optimization and content planning built around clear digital storytelling.', deliverable: 'Strategy' },
  { name: 'Creative production', description: 'From rough ideas and raw footage to polished visual stories, including sound design and post-production.', deliverable: 'Production' },
];

function PlaceholderFrame({ children }) {
  return <div className="frame"><div><span className="play" aria-hidden="true" />{children}</div></div>;
}

function LoopVideo({ src, title }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    const loadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        loadObserver.unobserve(video);
      }
    }, { rootMargin: '300px 0px', threshold: 0 });
    visibilityObserver.observe(video);
    loadObserver.observe(video);
    return () => {
      visibilityObserver.disconnect();
      loadObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (shouldLoad && videoRef.current) videoRef.current.load();
  }, [shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldLoad && isVisible && !userPaused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [shouldLoad, isVisible, userPaused]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      setShouldLoad(true);
      setIsVisible(true);
    } else {
      video.pause();
      setIsPlaying(false);
      setUserPaused(true);
    }
  };

  const toggleMuted = () => {
    const video = videoRef.current;
    if (!video) return;
    const muted = !isMuted;
    video.muted = muted;
    setIsMuted(muted);
  };

  return (
    <div className="loop-video-wrap">
      <video
        ref={videoRef}
        className="loop-video"
        src={shouldLoad ? src : undefined}
        muted={isMuted}
        loop
        playsInline
        preload="none"
        aria-label={title}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="video-controls" aria-label={`${title} video controls`}>
        <button type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause video' : 'Play video'} title={isPlaying ? 'Pause' : 'Play'}>
          <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span>
        </button>
        <button type="button" onClick={toggleMuted} aria-label={isMuted ? 'Unmute video' : 'Mute video'} title={isMuted ? 'Unmute' : 'Mute'}>
          <span aria-hidden="true">{isMuted ? '♪̸' : '♫'}</span>
        </button>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const classes = ['proj', project.vertical && 'v', project.full && 'full', 'rv'].filter(Boolean).join(' ');
  return (
    <article className={classes} style={project.delay ? { '--d': project.delay } : undefined}>
      <div className="box rv-clip" style={project.delay ? { '--d': project.delay } : undefined}>
        {project.videoSrc ? <div className="frame"><LoopVideo src={project.videoSrc} title={project.title} /></div> : project.embedSrc ? <div className="frame"><iframe className="project-embed" src={project.embedSrc} title={`${project.title} Instagram Reel`} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen /></div> : <PlaceholderFrame>{project.format}</PlaceholderFrame>}
      </div>
      <div className="meta"><h3>{project.title}</h3><span className="res">{project.result}</span></div>
      <p className="who">{project.client}</p>
      <ul className="tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      {project.url && <a className="project-open" href={project.url} target="_blank" rel="noreferrer">View work <span aria-hidden="true">↗</span></a>}
    </article>
  );
}

function App() {
  const [formNote, setFormNote] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setLoaded(true)));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealNodes = document.querySelectorAll('.rv, .rv-clip');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealNodes.forEach((node) => revealObserver.observe(node));

    let lastScrollY = 0;
    const nav = document.querySelector('.nav');
    const progress = document.querySelector('.progress');
    const navLinks = [...document.querySelectorAll('.nav nav a')];
    const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href')));
    const portrait = document.querySelector('#pframe');
    const onScroll = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${maxScroll > 0 ? y / maxScroll : 0})`;
      nav.classList.toggle('solid', y > 20);
      nav.classList.toggle('hide', y > lastScrollY && y > 400);
      lastScrollY = y;
      let current = -1;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top < window.innerHeight * 0.4) current = index;
      });
      navLinks.forEach((link, index) => link.classList.toggle('on', index === current));
      if (!reduceMotion && portrait) {
        const rect = portrait.parentNode.getBoundingClientRect();
        const parallax = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        portrait.style.transform = `scale(1.15) translateY(${parallax * 30}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const magneticNodes = document.querySelectorAll('.mag');
    const onMagneticMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      event.currentTarget.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    };
    const resetMagnetic = (event) => { event.currentTarget.style.transform = ''; };
    if (finePointer && !reduceMotion) {
      magneticNodes.forEach((node) => {
        node.addEventListener('mousemove', onMagneticMove);
        node.addEventListener('mouseleave', resetMagnetic);
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      magneticNodes.forEach((node) => {
        node.removeEventListener('mousemove', onMagneticMove);
        node.removeEventListener('mouseleave', resetMagnetic);
      });
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const type = String(form.get('type') || '');
    if (!name || !email) {
      setFormNote('Add your name and email so I can reply.');
      return;
    }
    const body = `Name: ${name}\nEmail: ${email}\nProject: ${type}\n\n${form.get('msg') || ''}`;
    window.location.href = `mailto:akobedorkiee7@gmail.com?subject=${encodeURIComponent(`New project: ${type}`)}&body=${encodeURIComponent(body)}`;
    setFormNote('Your email app should open with the message ready to send.');
  };

  return (
    <div className={loaded ? 'site loaded' : 'site'}>
      <div className="progress" aria-hidden="true" />
      <header className="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#top"><span className="ph">Dorcas Akobe</span></a>
          <nav aria-label="Main navigation"><ul>
            <li><a href="#work">Work</a></li><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#contact">Contact</a></li>
          </ul></nav>
          <a className="btn mag" href="#contact">Work with me</a>
        </div>
      </header>

      <main id="top">
        <div className="wrap hero">
          <div>
            <h1 id="headline" aria-label="Story-first video editing for content that earns attention.">{'Story-first video editing for content that earns attention.'.split(' ').map((word, index) => <span className="w" key={`${word}-${index}`}><span style={{ transitionDelay: `${0.1 + index * 0.07}s` }}>{word}</span></span>)}</h1>
            <p className="intro fade" style={{ transitionDelay: '.7s' }}>I’m Dorcas Akobe—a video editor, content creator and writer. I take ideas from concept and script through editing, sound design and platform-ready delivery.</p>
            <div className="ctas fade" style={{ transitionDelay: '.85s' }}><a className="btn mag" href="#work">See my work</a><a className="btn quiet mag" href="#contact">Start a project</a></div>
          </div>
          <div className="stage" aria-label="Showreel preview">
            <div className="layer l1" data-depth="12"><div className="frame"><LoopVideo src={heroLandscapeSrc} title="Dorcas Akobe landscape showreel" /></div></div>
            <div className="layer l2" data-depth="28"><div className="in"><div className="frame"><LoopVideo src={heroReelSrc} title="Dorcas Akobe Instagram Reel" /></div></div></div>
            <div className="layer l3" data-depth="40"><span className="chip"><i />Video Editor · Content Strategist</span></div>
          </div>
        </div>

        <div className="marquee" aria-hidden="true"><div className="track">{['Video editing', 'Content strategy', 'Scriptwriting', 'Sound design', 'Digital storytelling', 'TikTok', 'Instagram Reels', 'Video editing', 'Content strategy', 'Scriptwriting', 'Sound design', 'Digital storytelling', 'TikTok', 'Instagram Reels'].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div></div>

        <div className="wrap stats">{highlights.map((highlight, index) => <div className="stat rv" style={{ '--d': `${index * 0.1}s` }} key={highlight.value}><b>{highlight.value}</b><span>{highlight.label}</span></div>)}</div>

        <section id="work"><div className="wrap">
          <div className="head"><h2 className="rv">Selected work</h2><p className="rv" style={{ '--d': '.1s' }}>A selection of community storytelling, creator-led Reels and content for my own brand.</p></div>
          <div className="work">{projects.map((project, index) => <ProjectCard key={`${project.format}-${index}`} project={project} />)}</div>
        </div></section>

        <section id="about" className="about"><div className="wrap grid">
          <div className="pwrap rv"><div className="portrait"><div className="frame" id="pframe"><img src="/images/dorcas-profile.png" alt="Dorcas Akobe smiling in a beige blazer" /></div></div></div>
          <div><h2 className="rv">Hi, I'm <span className="ph">Dorcas</span>.</h2>
            <div className="copy"><p className="rv" style={{ '--d': '.1s' }}>I’m a video editor, content creator and writer who turns raw footage and rough ideas into content people actually stop scrolling for. I work across the full pipeline—scriptwriting, concept development, editing, sound design and platform-specific optimization—with an eye for pacing, rhythm and visual continuity.</p><p className="rv" style={{ '--d': '.2s' }}>I’m fluent in Adobe Premiere Pro, CapCut and InShot, and move comfortably between fast vertical content for TikTok and Reels and longer broadcast-standard cuts. My focus is creative content production, video editing, social media strategy and digital storytelling.</p></div>
            <div className="skills rv" style={{ '--d': '.25s' }}><h3>Core skills</h3><div className="skill-groups">{skillGroups.map((group) => <div className="skill-group" key={group.name}><h4>{group.name}</h4><ul className="tags">{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div></div>
            <div className="mine rv" style={{ '--d': '.3s' }}><h3>Some of my own content</h3><p className="sub">Creator work and content for KnitNest.</p>
              <div className="reels"><div className="r"><LoopVideo src="/media/before-i-turned-18.mp4" title="Before I Turned 18" /></div><div className="r"><LoopVideo src="/media/turning-the-ordinary-cinematic.mp4" title="Turning the Ordinary into a Cinematic Scene" /></div><div className="r knitnest-reel"><LoopVideo src="/media/knitnest-content.mp4" title="KnitNest content" /></div></div>
              <ul className="handles"><li><a href="https://www.instagram.com/iam_justdorkiee/" target="_blank" rel="noreferrer">Instagram @iam_justdorkiee</a></li><li><a href="https://www.instagram.com/_knitnest/" target="_blank" rel="noreferrer">KnitNest @_knitnest</a></li></ul>
            </div>
            <div className="experience rv" style={{ '--d': '.35s' }}><h3>Experience</h3><div className="experience-list">{experience.map((role) => <article className="experience-item" key={role.organization}><h4>{role.title}</h4><p className="sub">{role.organization}</p><p>{role.description}</p></article>)}</div></div>
            <div className="education rv" style={{ '--d': '.4s' }}><h3>Education</h3><p><strong>B.Sc. International Relations</strong><br />Landmark University — Omu-Aran, Kwara State, Nigeria</p></div>
          </div>
        </div></section>

        <section id="services"><div className="wrap"><div className="head"><h2 className="rv">What I can do for you</h2><p className="rv" style={{ '--d': '.1s' }}>From a first concept to a finished cut, I can support your content at every stage.</p></div>
          <div className="services">{services.map((service, index) => <div className="svc rv" style={{ '--d': `${index * 0.1}s` }} key={service.name}><h3>{service.name}</h3><p>{service.description}</p><span className="price">{service.deliverable}</span></div>)}</div>
        </div></section>

        <section id="contact" className="contact"><div className="wrap grid"><div><h2 className="rv">Let's make something.</h2><p className="lead rv" style={{ '--d': '.1s' }}>Have a project, collaboration or content idea? Tell me what you’re working on.</p>
          <div className="direct rv" style={{ '--d': '.2s' }}><span>Jos, Nigeria</span><a href="tel:09116496520">09116496520</a><a className="ph" href="mailto:akobedorkiee7@gmail.com">akobedorkiee7@gmail.com</a><a href="https://www.instagram.com/iam_justdorkiee/" target="_blank" rel="noreferrer">Instagram @iam_justdorkiee ↗</a></div>
        </div><form className="rv" style={{ '--d': '.15s' }} onSubmit={handleSubmit} noValidate>
          <label>Your name<input name="name" autoComplete="name" /></label><label>Email<input name="email" type="email" autoComplete="email" /></label>
          <label>What do you need?<select name="type"><option>Short form</option><option>Long form</option><option>Brand content</option><option>Something else</option></select></label>
          <label>Tell me about it<textarea name="msg" /></label><button className="btn mag" type="submit">Send message</button><p className="note" aria-live="polite">{formNote}</p>
        </form></div></section>
      </main>

      <footer><div className="wrap"><span><span className="ph">Dorcas Akobe</span>, video editor and content strategist</span><span>© 2026</span></div></footer>
    </div>
  );
}

export default App;
