const tech=[
    'React.js',
    'Javascript ES6',
    'Html5',
    'Css3'
]



const Header=()=>{
    return (
      <header id="header">
          <h1>25 + 5 Clock</h1>
          <div id="tech">
                {
                    tech.map((item,key)=>{
                        return <span key={key}>{item}</span>
                    })
                }
          </div>
      
      </header>
    );
  }
  
  export default Header;