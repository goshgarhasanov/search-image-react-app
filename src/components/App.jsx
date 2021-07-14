import React, { Component } from 'react'
import SearchInput from './SearchInput';
import ImageLists from './ImageLists';
import axios from 'axios';

class App extends Component {

    constructor(props) {

        super(props)
        this.state = { images: [] }
    }
    onSearchSubmit = async (entry) => {
        const response = await axios.get(`https://pixabay.com/api/?key=22495977-b39eb11e1b18c5f2c16a6c595&q=${entry}&image_type=photo&pretty=true`);
        this.setState({ images: response.data.hits })
    }


    render() {
        return (
            <div className='ui container main' style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <h1 style={{ textAlign: 'center', backgroundColor: '#555', color: 'white', width: '60%', padding: '20px' }}>Axtarış Edəcəyiniz Şəkili yazıb Enter CLick Edin</h1>
                <SearchInput onSearchSubmit={this.onSearchSubmit} />
                <ImageLists images={this.state.images} />
            </div>
        )
    }
}


export default App;