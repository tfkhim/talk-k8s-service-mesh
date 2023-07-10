import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown/markdown.esm'
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm'
import RevealNotes from 'reveal.js/plugin/notes/notes.esm'
import Mermaid from 'reveal.js-mermaid-plugin'

import 'reveal.js/dist/reset.css'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'
import 'reveal.js/plugin/highlight/monokai.css'
import './styles.css'

const scandioPlugin = {
  id: 'scandio-design',
  init(slides) {
    this.setBackgroundAttributes()
  },
  destroy() {},

  setBackgroundAttributes() {
    const slides = document.getElementsByTagName('section')
    const scandioSlides = document.getElementsByClassName('scandio-background')
    for (let i = 0; i < slides.length; i++) {
      const slide = slides.item(i)

      if (slide.classList.contains('stack')) {
        // We can ignore the vertical stack sections because
        // we will apply the attributes to their children.
        continue
      }

      if (slide.hasAttribute('data-disable-scandio-background')) {
        continue
      }

      slide.setAttribute(
        'data-background-image',
        '/hexagon.png,/hexagon.png,/hexagon.png,/hexagon.png,/hexagon.png'
      )
      slide.setAttribute(
        'data-background-size',
        'auto,100px 100px,150px 150px,75px 75px,100px 100px'
      )
      slide.setAttribute(
        'data-background-position',
        '-100px 75px,right 100px bottom -40px,right -80px bottom 80px,right 300px bottom 30px,right 150px bottom 100px'
      )
    }
  },
}

Reveal.initialize({
  width: 1244,
  height: 700,
  hash: true,
  plugins: [Markdown, Mermaid, RevealHighlight, RevealNotes, scandioPlugin],
})
