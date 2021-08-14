import React from 'react';

class MemeGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: '',
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({ allMemeImgs: memes })
            }
        );
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value }) 
    }


    render() {
        return (
            <div>
               <form className="meme-form">
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
            </div>
        );
    }
}

export default MemeGenerator