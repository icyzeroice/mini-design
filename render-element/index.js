window.onload = main;

function main() {
  render(
    createElement()
  )
}

class App extends Component {
  constructor(props) {
    this.state = {
      words: 'Got it!'
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        words: 'Make it!'
      })
    }, 2000)
  }

  render() {
    return createElement(
      'div',
      {
        class: 'yes',
      },

      createElement(
        'p',
        null,
        this.state.words
      ),

      createElement(
        'footer',
        {
          class: 'demo-footer'
        },
        'this is footer',
        createElement(
          'img',
          {
            src: ''
          },
          null
        )
      )
    )
  }
}