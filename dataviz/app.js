/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// Source data CSV
// const DATA_URL =
//   'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'; // eslint-disable-line

const DATA_URL =
  'https://public.enigma.com/api/snapshots/81de4e21-acd4-489d-b507-0fa00c63dd39?&row_limit=10000&row_offset=0'; // eslint-disable-line

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      data: null
    };

    fetch(DATA_URL)
      .then(response => response.json())
      .then((table) => {
        const data = table.table_rows.rows.map((row) => {
          return {
            position: [Number(row[36]), Number(row[34])],
            row
          };
        });
        this.setState({data});
      });

    // requestCsv(DATA_URL, (error, response) => {
    //   if (!error) {
    //     const data = response.map(d => [Number(d.lng), Number(d.lat)]);
    //     this.setState({data});
    //   }
    // });
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  render() {
    const {viewport, data} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/chanelluu/cjfjr8swndfdw2rqgng2cki9l"
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <DeckGLOverlay viewport={viewport} data={data || []} />
      </MapGL>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
