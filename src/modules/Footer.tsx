import lemurLogo from '../assets/PonderousLogo.png'
import './Footer.css'
import { Link, useNavigate } from 'react-router-dom';

function Footer() {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('tplemur@gmail.com');
    } catch {
      // Ignore clipboard errors
    }
  };

  return (
    <>

      <section id="footer">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Static Links</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={lemurLogo} alt="" />
                Resume (TODO)
              </a>
            </li>
            <li>
              <Link to="/">
                <img className="button-icon" src={lemurLogo} alt="" />
                QE privacy policy? TODO
              </Link>
            </li>
            <li>
              <Link to="/cueUtil">
                <img className="button-icon" src={lemurLogo} alt="" />
                .cue Utility
              </Link>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with me</h2>
          <p>Socials & Emails</p>
          <ul>
            <li>
              <a href="https://github.com/TPlemur" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/sprite.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://discordapp.com/users/299708625545592833" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/sprite.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/thomas-price-5a0957145/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/sprite.svg#linkedin"></use>
                </svg>
                LinkedIn
              </a>
            </li>
            <div>
              <li>
                <a href="https://mail.google.com/mail/?view=cm&to=tplemur@gmail.com&su=Hi" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href="/sprite.svg#email"></use>
                  </svg>
                  Gmail
                </a>
              </li>
              <li>
                <button type="button" onClick={handleCopyEmail} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}>
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href="/sprite.svg#copy"></use>
                  </svg>
                  Copy
                </button>
              </li>
            </div>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Footer
