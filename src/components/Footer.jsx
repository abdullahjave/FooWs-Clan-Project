import Logo from './Logo';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'YouTube', url: '#' },
    { name: 'Twitch', url: '#' },
  ];

  return (
    <footer className="glass-card border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <Logo size="lg" showText={false} />
          
          <div className="text-center">
            <p className="text-xl font-bold mb-1" style={{ fontFamily: 'Cinzel, serif', color: 'var(--color-accent-silver)' }}>FooW Clan</p>
            <p style={{ color: 'rgba(192, 199, 212, 0.8)' }}>Founded 1999</p>
            <p className="text-sm" style={{ color: 'rgba(192, 199, 212, 0.6)' }}>Age of Kings: The Conquerors Community</p>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="w-10 h-10 flex items-center justify-center glass-card rounded-full hover:scale-110 transition-all duration-300"
                aria-label={social.name}
                style={{ borderRadius: '50%' }}
              >
                <span className="text-sm" style={{ color: 'var(--color-accent-silver)' }}>{social.name[0]}</span>
              </a>
            ))}
          </div>

          <p className="text-sm" style={{ color: 'rgba(192, 199, 212, 0.4)' }}>
            © {new Date().getFullYear()} FooW Clan. All rights reserved.
          </p>
          <div
            className="px-5 py-3 rounded-xl border-2 text-center"
            style={{
              borderColor: 'rgba(212, 175, 55, 0.55)',
              background: 'rgba(212, 175, 55, 0.12)',
              boxShadow: '0 0 25px rgba(212, 175, 55, 0.18)',
            }}
          >
            <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'rgba(192, 199, 212, 0.9)' }}>
              Website Credits
            </p>
            <p className="text-lg md:text-xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
              <span style={{ color: '#FFFFFF' }}>Credit goes to </span>
              <span style={{ color: 'var(--color-accent-gold)' }}>&gt;FooW&lt;_N&Oslash;_&Oslash;NE&trade;</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
