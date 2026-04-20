const NAV_LINKS = [
	{ href: '/', label: 'Home' },
	{ href: '/how-it-works', label: 'How It Works' },
	{ href: '/games', label: 'Games' },
	{ href: '/venues', label: 'Venues' },
	{ href: '/locations', label: 'Locations' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' },
];

function currentPath() {
	let p = window.location.pathname;
	if (p === '' || p === '/') return '/';
	return p.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
}

function activeClass(href) {
	return currentPath() === href ? 'active' : '';
}

class SiteHeader extends HTMLElement {
	connectedCallback() {
		const navItems = NAV_LINKS.map(
			(l) => `<li><a href="${l.href}" class="${activeClass(l.href)}">${l.label}</a></li>`
		).join('');

		const mobileNavItems = NAV_LINKS.map(
			(l) => `<li class="mobile-menu-li"><a href="${l.href}" class="${activeClass(l.href)}">${l.label}</a></li>`
		).join('');

		this.innerHTML = `
			<a href="#main-content" class="skip-link">Skip to main content</a>
			<header>
				<div id="headerContent">
					<a href="/" aria-label="Fun City Games home">
						<picture>
							<source type="image/webp" srcset="/images/logo-horizontal-256.webp 1x, /images/logo-horizontal-512.webp 2x">
							<img class="header-logo" src="/images/logo-horizontal-256.png" srcset="/images/logo-horizontal-256.png 1x, /images/logo-horizontal-512.png 2x" alt="Fun City Games" width="141" height="70">
						</picture>
					</a>

					<button class="hamburger-icon" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-menu-container">
						<div class="bar1"></div>
						<div class="bar2"></div>
						<div class="bar3"></div>
					</button>

					<div class="desktop-menu">
						<nav aria-label="Primary">
							<ul>
								${navItems}
							</ul>
						</nav>
					</div>

					<a href="tel:+18776242637" class="header-phone" aria-label="Call (877) 62-GAMES">(877) 62-GAMES</a>

					<div class="mobile-menu-container" id="mobile-menu-container" aria-hidden="true">
						<button class="mobile-menu-outside" aria-label="Close navigation menu" tabindex="-1"></button>
						<div class="mobile-menu" id="mobile-menu">
							<nav class="mobile-menu-nav" aria-label="Mobile">
								<ul>
									${mobileNavItems}
									<li class="mobile-menu-cta"><a href="/contact" class="btn btn-magenta">Partner With Us</a></li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</header>
		`;

		const headerContent = this.querySelector('#headerContent');
		const hamburger = this.querySelector('.hamburger-icon');
		const menuContainer = this.querySelector('#mobile-menu-container');
		const outsideButton = this.querySelector('.mobile-menu-outside');

		const openMenu = () => {
			hamburger.setAttribute('aria-expanded', 'true');
			menuContainer.setAttribute('aria-hidden', 'false');
			headerContent.classList.add('hamburger-icon-click');
			document.body.style.overflow = 'hidden';
			const firstLink = this.querySelector('.mobile-menu-nav a');
			if (firstLink) firstLink.focus();
		};

		const closeMenu = () => {
			hamburger.setAttribute('aria-expanded', 'false');
			menuContainer.setAttribute('aria-hidden', 'true');
			headerContent.classList.remove('hamburger-icon-click');
			document.body.style.overflow = '';
			hamburger.focus();
		};

		hamburger.addEventListener('click', () => {
			const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
			if (isOpen) closeMenu();
			else openMenu();
		});

		outsideButton.addEventListener('click', closeMenu);

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
				closeMenu();
			}
		});
	}
}

class SiteFooter extends HTMLElement {
	connectedCallback() {
		const year = new Date().getFullYear();
		this.innerHTML = `
			<footer>
				<div class="footer-container">
					<div class="footer-brand">
						<a href="/">
							<picture>
								<source type="image/webp" srcset="/images/logo-horizontal-256.webp 1x, /images/logo-horizontal-512.webp 2x">
								<img src="/images/logo-horizontal-256.png" srcset="/images/logo-horizontal-256.png 1x, /images/logo-horizontal-512.png 2x" alt="Fun City Games" width="180" height="90" loading="lazy" decoding="async">
							</picture>
						</a>
						<p>Arcade game route partner serving Northwest Arkansas at zero cost to your business.</p>
					</div>
					<div class="footer-col">
						<h4>Explore</h4>
						<ul>
							<li><a href="/how-it-works">How It Works</a></li>
							<li><a href="/games">Our Games</a></li>
							<li><a href="/venues">Venues We Partner With</a></li>
							<li><a href="/locations">Service Areas</a></li>
							<li><a href="/about">About</a></li>
						</ul>
					</div>
					<div class="footer-col">
						<h4>Contact</h4>
						<ul>
							<li><a href="tel:+18776242637">(877) 62-GAMES</a></li>
							<li><a href="mailto:info@funcitygamesnwa.com">info@funcitygamesnwa.com</a></li>
							<li><a href="/contact">Request a Consultation</a></li>
						</ul>
					</div>
					<div class="footer-col">
						<h4>Service Areas</h4>
						<ul>
							<li>Fayetteville, AR</li>
							<li>Rogers, AR</li>
							<li>Bentonville, AR</li>
							<li>Springdale, AR</li>
						</ul>
					</div>
				</div>
				<div class="footer-bottom">
					<div>&copy; ${year} Fun City Games. All rights reserved.</div>
					<a href="https://www.loganrdavis.com" rel="noopener noreferrer" aria-label="Built by Logan R. Davis">
						<img src="/images/lrd-tag.svg" alt="www.loganrdavis.com" width="150" height="75" loading="lazy" decoding="async">
					</a>
				</div>
			</footer>
		`;
	}
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
