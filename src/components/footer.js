import GithubIcon from '../assets/svg/github.js'
import LinkedinIcon from '../assets/svg/linkedin.js'


function Footer() {
    return (
      <footer className="social">
        <span>
                <a target="_blank" href="https://www.linkedin.com/in/sebastian-neumann-38151b54/" rel="noreferrer">
                        <LinkedinIcon/>
                    <p>Follow me on LinkedIn</p>
                </a>
            </span>
            <span>
                <a target="_blank" href="https://github.com/sebhubdev" rel="noreferrer">
                        <GithubIcon/>
                    <p>See me on Github</p>
                </a>
            </span>
      
      </footer>
    );
  }
  
  export default Footer;