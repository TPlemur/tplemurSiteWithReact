import CardComponent from '../components/cardComponent.tsx';
import '../components/cardComponent.css';
import lemurLogo from '../assets/PonderousLogo.png';

function Home() {


  return (
    <>
    <section id="content">
      <h1>Welcome to TPlemur.com</h1>
      <p>
        Character select!
        Pick a Thomas, any Thomas.
      </p>
    </section>
    <section id="cards">
      <CardComponent
        title="Hackerman"
        subtitle="Hacking code"
        to="/Portfolio"
        image={lemurLogo}
      />
      <CardComponent
        title="Chocolatier"
        subtitle="Buy some chocolate"
        to="/Chocolate"
        image={lemurLogo}
      />
      <CardComponent
        title="Engineer"
        subtitle="Woodworking and robots."
        to="/Engineer"
        image={lemurLogo}
      />
    </section>
    </>
  )
}

export default Home
