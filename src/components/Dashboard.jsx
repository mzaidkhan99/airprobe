import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibXphaWQ5OSIsImEiOiJja2lna2YxcnQwZnk2MnFtcWN3eXJjOHV4In0.lcLGwPjSuVJ25xJ6YAe7RQ';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: '',
            lat: '',
            zoom: 1
        };
        this.mapContainer = React.createRef();
    }
    
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((pos) =>{
            this.setState({lat:pos.coords.latitude, lng:pos.coords.longitude},()=>{
                const map = new mapboxgl.Map({
                    container: this.mapContainer,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    //   center: [lat, lon],
                    zoom: this.state.zoom
                });
                var marker = new mapboxgl.Marker()
                .setLngLat([this.state.lng,this.state.lat])
                .addTo(map);
            })
        });        
    }

    render() {
        console.log('my location');
        console.log(this.state.lng);
        console.log(this.state.lat);        

    return (
      <div>
        <div className='sidebarStyle'>
            <div>welcome: {this.props.name}</div>  
            <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div className="wrapper">
            <div ref={el => this.mapContainer = el} className='mapContainer' />
            <div className="logoutbtn">
                <button className="btn btn-primary" onClick={this.props.logoutHandle}>LOGOUT</button>
            </div>
        </div>
      </div>

    )
  }
}

export default Dashboard;