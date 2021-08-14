import React from 'react';

class MemeGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            }
        );
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value }) 
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })        
    }


    render() {
        return (
            <div>
               <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        className="meme-top-text" 
                        placeholder="Top Text" 
                        name="topText" 
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        className="meme-bottom-text" 
                        placeholder="Bottom Text" 
                        name="bottomText" 
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button className="generate-meme">Generate Meme</button>
               </form>
               <div className="meme">
                    <img src={this.state.randomImg} />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
               </div>
            </div>
        );
    }
}

export default MemeGenerator