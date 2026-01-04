# SN Security Website - Development Plan

## Design Guidelines

### Design References
- **Cyberpunk/Hacker Aesthetic**: Dark navy gradients, neon glows, particle effects
- **Style**: Futuristic HUD + Sci-Fi + Cybersecurity Theme

### Color Palette
- Background Primary: #010913 (Deep Navy)
- Background Secondary: #0A1A2E (Dark Navy)
- Card Background: #07121F (Dark Glass)
- Accent Primary: #00FFB2 (Neon Green)
- Accent Secondary: #00E8FF (Neon Cyan)
- Text Primary: #FFFFFF (White)
- Text Secondary: #B0C4DE (Light Steel Blue)

### Typography
- Heading Font: "Orbitron" (Futuristic/HUD style)
- Body Font: "Rajdhani" (Clean tech font)
- Monospace: "Share Tech Mono" (Code/terminal style)

### Key Component Styles
- **Buttons**: Neon green background with glow, transparent with neon border for secondary
- **Cards**: Dark glass (#07121F) with semi-transparent neon outline, glow shadows
- **Forms**: Dark inputs with neon green focus glow
- **Navigation**: Sticky dark navy with neon green hover effects

### Effects Required
- Particle.js network animation background (all pages)
- Typed.js auto-typing animations
- Neon glow hover effects
- Smooth scroll reveal animations
- Glassmorphism card effects

### Images to Generate
1. **logo-shield-neon.png** - Neon green shield logo for SN Security (Style: vector-style, glowing effect, transparent background)
2. **hero-cyber-network.jpg** - Abstract cyber network with glowing nodes and connections (Style: photorealistic, dark mood, neon accents)
3. **roadmap-background.jpg** - Digital matrix code background with green glow (Style: photorealistic, dark background)
4. **tools-cyber-grid.jpg** - Futuristic grid pattern with neon lines (Style: minimalist, dark theme)
5. **osint-surveillance.jpg** - Digital surveillance theme with data streams (Style: photorealistic, dark mood, tech aesthetic)
6. **about-founder.jpg** - Professional cybersecurity expert in dark tech environment (Style: photorealistic, dramatic lighting)
7. **contact-circuit.jpg** - Circuit board pattern with neon traces (Style: minimalist, dark background)
8. **icon-penetration-testing.png** - Neon green penetration testing icon (Style: vector-style, glowing)
9. **icon-vulnerability-scan.png** - Neon green vulnerability scanner icon (Style: vector-style, glowing)
10. **icon-network-analysis.png** - Neon green network analysis icon (Style: vector-style, glowing)

---

## Development Tasks

### Phase 1: Setup & Core Structure
1. Initialize HTML template structure
2. Generate all required images using ImageCreator
3. Create base CSS with cyberpunk theme variables
4. Integrate Particle.js and Typed.js libraries

### Phase 2: Global Components
5. Create navigation header with neon effects
6. Create footer with social links
7. Setup global animations and transitions

### Phase 3: Page Development
8. **Home Page** - Hero section with typed animation, intro content
9. **Roadmap Page** - Step-by-step learning path with glowing cards
10. **Tools Page** - Grid of 20 ethical hacking tools with neon icons
11. **Tool Detail Template** - Individual tool page with YouTube embed
12. **CTF & News Page** - Two sections for CTF platforms and news sources
13. **OSINT Page** - What is OSINT intro, mobile tracking tool, 100 OSINT tools grid with filters
14. **About Page** - Founder information and SN Security mission
15. **Contact Page** - Contact form with neon styling and success popup

### Phase 4: Interactivity & Effects
16. Implement particle.js background on all pages
17. Add typed.js animations to hero sections
18. Create neon glow hover effects
19. Add smooth scroll and fade-in animations
20. Implement mobile responsive design

### Phase 5: Final Polish
21. Test all pages for responsiveness
22. Optimize assets and code
23. Verify Vercel deployment readiness
24. Final quality check