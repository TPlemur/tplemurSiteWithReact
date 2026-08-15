function LinkOut() {

  interface LinkOut{
    text: string;
    link: string;
    icon: string;
  }
  return (
    <>
      <section id="content">
        <li>
          <a href="https://github.com/TPlemur" target="_blank">
            <svg
              className="button-icon"
              role="presentation"
              aria-hidden="true"
            >
              <use href="/sprite.svg#github-icon"></use>
            </svg>
            LinkOut.text
          </a>
        </li>
      </section>
        
    </>
  )


}
export default LinkOut