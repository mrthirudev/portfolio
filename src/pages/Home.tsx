import React, {useState} from 'react'

const avatarUrl = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
const heroBg = 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1400&q=80'

export default function Home(){
  return (
    <main className="portfolio-hero">
      <div className="portfolio-inner container">
        <header className="portfolio-nav">
          <div className="nav-left">
            <div className="site-title">Thiruppathi.M</div>
          </div>
          {/* <nav className="nav-right">
            <a className="nav-link active">Home</a>
            <a className="nav-link">About</a>
            <a className="nav-link">Skills</a>
            <a className="nav-link">Contact</a>
          </nav> */}
        </header>

        <section className="hero-grid">
          <div className="hero-copy">
            <p className="intro">Hi, I'm</p>
            <h1 className="hero-title">Thiruppathi<br/><span className="accent">Mahalingam</span></h1>
            <p className="subtitle">Website Developer | React Developer | Freelancer</p>
            <p className="lead">I build responsive, modern and user-friendly websites that help businesses grow online.</p>
            {/* <div className="hero-cta">
              <a className="btn primary" href="#">Hire Me</a>
              <a className="btn ghost" href="#">Download CV</a>
            </div>
            <div className="socials small">
              <span className="dot"/> <span className="dot"/> <span className="dot"/>
            </div> */}
          </div>

          <div className="hero-art" style={{backgroundImage:`url(${heroBg})`}}>
            <div className="avatar-wrap">
              <img src={avatarUrl} alt="avatar" />
            </div>
          </div>
        </section>
 
        {/* ABOUT */}
        <section className="about-section container">
          <div className="about-grid">
            <div className="about-art">
              <div className="about-img-wrap">
                <img src={avatarUrl} alt="Thiruppathi" />
              </div>
            </div>
            <div className="about-copy">
              <h3 className="small-heading">ABOUT ME</h3>
              <h2>Let me introduce myself</h2>
              <p className="muted">Hello! I am Thiruppathi Mahalingam, a passionate Website Developer with experience in building responsive websites and web applications. I specialize in React.js, JavaScript, and modern UI/UX.</p>

              <div className="stats-row">
                <div className="stat">
                  <strong>14+</strong>
                  <span>Years Experience</span>
                </div>
                <div className="stat">
                  <strong>20+</strong>
                  <span>Projects</span>
                </div>
                <div className="stat">
                  <strong>15+</strong>
                  <span>Clients</span>
                </div>
                <div className="stat">
                  <strong>24/7</strong>
                  <span>Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* SKILLS */}
        <section className="skills-section container">
          <h3 className="small-heading">MY SKILLS</h3>
          <div className="skills-grid">
            {[
              ['HTML5',90],['CSS3',90],['JavaScript',90],['React.js',90],['React Native',85],['Node.js',85], ['iOS Development',80],['Android Development',80],['UI/UX Design',75]
            ].map(([label, pct])=> (
              <div className="skill" key={String(label)}>
                <div className="skill-head"><strong>{label}</strong><span>{pct}%</span></div>
                <div className="skill-bar"><div style={{width:`${pct}%`}}/></div>
              </div>
            ))}
          </div>
        </section>
 
        {/* SERVICES */}
        <section className="services-section container">
          <h3 className="small-heading">MY SERVICES</h3>
          <div className="services-grid">
            {[
              'Website Development','Mobile App Development','UI/UX Design','Website Maintenance','SEO Optimization','Landing Pages'
            ].map(s=> (
              <div className="service-card" key={s}>
                <div className="service-icon">★</div>
                <h4>{s}</h4>
                <p className="muted">Brief description about {s} and how it helps clients.</p>
              </div>
            ))}
          </div>
        </section>
 
        {/* PROJECTS */}
        <section className="projects-section container">
          <h3 className="small-heading">MY PROJECTS</h3>
          <div className="projects-grid">
            {[1,2,3,4,5].map(i=> (
              <div className="project-card" key={i}>
                <div className="project-media" style={{backgroundImage:`url(https://picsum.photos/seed/p${i}/600/360)`}} />
                <div className="project-body">
                  <h4>Project {i}</h4>
                  <p className="muted">Short description of the project and key features.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
 
        {/* TESTIMONIALS */}
        <section className="testimonials-section container">
          <h3 className="small-heading">TESTIMONIALS</h3>
          <div className="testimonials-grid">
            {["Great work!","Highly recommended","Very professional"].map((t,idx)=> (
              <div className="testimonial" key={idx}>
                <p>“{t} — the project exceeded expectations.”</p>
                <div className="t-author"><strong>Client {idx+1}</strong><span className="muted">Business Owner</span></div>
              </div>
            ))}
          </div>
        </section>
 
        {/* CONTACT */}
        <section className="contact-section container">
          <h3 className="small-heading">GET IN TOUCH</h3>
          <div className="contact-grid">
            <aside className="contact-card">
              <h4>Let’s talk about your project</h4>
              <p className="muted">I'm available for freelance projects and full-time roles. Tell me about your goals and I'll get back within 24 hours.</p>

              <ul className="contact-list">
                <li><span className="ci-icon">✉️</span><div><strong>Email</strong><br/><a href="mailto:mrthirudev@gmail.com">mrthirudev@gmail.com</a></div></li>
                <li><span className="ci-icon">📞</span><div><strong>Phone</strong><br/><a href="tel:+917845678032">+91 7845678032</a></div></li>
                <li><span className="ci-icon">📍</span><div><strong>Location</strong><br/>Chennai, India</div></li>
              </ul>

              <div className="contact-cta">
                <a className="btn ghost" href="#">Schedule Call</a>
                <a className="btn" href="#">Download CV</a>
              </div>
            </aside>

            <ContactForm />
          </div>
        </section>
      </div>
    </main>
  )
}

function ContactForm(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [subject,setSubject] = useState('');
  const [message,setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setStatus('sending');
    try{
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      const data = await res.json();
      if(res.ok){ setStatus('sent'); setName(''); setEmail(''); setSubject(''); setMessage(''); }
      else { setStatus('error'); console.error(data); }
    }catch(err){ setStatus('error'); console.error(err); }
  }

  return (
    <form className="contact-form card-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required />
      </div>
      <div className="field-row">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@domain.com" required />
      </div>
      <div className="field-row">
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Project / Inquiry" />
      </div>
      <div className="field-row">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={message} onChange={e=>setMessage(e.target.value)} rows={6} placeholder="Tell me about your project, timeline and budget." required />
      </div>
      <div style={{display:'flex',gap:12,alignItems:'center',marginTop:6}}>
        <button className="btn primary" type="submit">{status==='sending'?'Sending...':'Send Message'}</button>
        <button className="btn ghost" type="button" onClick={()=>{setName('');setEmail('');setSubject('');setMessage('');setStatus(null)}}>Reset</button>
      </div>
      {status==='sent' && <p style={{color:'green',marginTop:8}}>Message sent — I will reply shortly.</p>}
      {status==='error' && <p style={{color:'crimson',marginTop:8}}>Failed to send — try again later.</p>}
    </form>
  );
}
