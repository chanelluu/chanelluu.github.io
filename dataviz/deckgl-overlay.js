/* global window */
import React, {Component} from 'react';
import DeckGL, {HexagonLayer} from 'deck.gl';

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

const colorRange = [

  [73, 227, 206],

  [254, 237, 177],

  [209, 55, 78]
];

// const colorRange = [
//   [1, 152, 189],
//   [73, 227, 206],
//   [216, 254, 181],
//   [254, 237, 177],
//   [254, 173, 84],
//   [209, 55, 78]
// ];

const elevationScale = {min: 1, max: 50};

const defaultProps = {
  radius: 100,
  upperPercentile: 70,
  lowerPercentile:0,
  coverage: 1
};



export default class DeckGLOverlay extends Component {
  static get defaultColorRange() {
    return colorRange;
  }

  static get defaultViewport() {
    return {
      longitude: -73.9442,
      latitude: 40.700610,
      zoom: 10,
      pitch: 45,
      bearing: -40
    };
  }

  constructor(props) {
    super(props);
    this.startAnimationTimer = null;
    this.intervalTimer = null;
    this.state = {
      elevationScale: elevationScale.min,
      hoveredObject: null,
      x: null,
      y: null
    };

    this._startAnimate = this._startAnimate.bind(this);
    this._onHover = this._onHover.bind(this);
    this._animateHeight = this._animateHeight.bind(this);
  }

  componentDidMount() {
    this._animate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== this.props.data.length) {
      this._animate();
    }
  }

  componentWillUnmount() {
    this._stopAnimate();
  }

  _animate() {
    this._stopAnimate();

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 4000);
  }

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 40);
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  _animateHeight() {
    if (this.state.elevationScale === elevationScale.max) {
      this._stopAnimate();
    } else {
      this.setState({elevationScale: this.state.elevationScale + 1});
    }
  }

  _onHover(data) {
    this.setState({
      hoveredObject: data.object,
      x: data.x,
      y: data.y
    });
  }

  _renderTooltip() {
    const { hoveredObject, x, y } = this.state;

    if (hoveredObject) {
      const rows = hoveredObject.points.map((point) => {
        return (
          <div key={point.row[0]}>
            {point.row[7].toLowerCase()}
          </div>
        );
      });

      return (
        <div className="tooltip" style={
          {position: 'absolute',
           fontFamily: 'Roboto',
           fontSize:12,
           lineHeight:1.5, 
           top: y, 
           left: x, 
           zIndex: 10, 
           padding: 12, 
           backgroundColor: 'rgb(30,60,98)',
           pointerEvents:'none', 
           color: 'white',
           opacity:0.8}
        }>
          {rows}
        </div>
      );
    }
  }

  render() {
    const { hoveredObject } = this.state;
    const {viewport, data, radius, coverage, upperPercentile,lowerPercentile} = this.props;

    if (!data) {
      return null;
    }

    const layers = [
      new HexagonLayer({
        id: 'heatmap',
        colorDomain:[0,20],
        colorRange,
        coverage,
        data,
        elevationRange: [0, 23000],
        elevationScale: this.state.elevationScale,
        extruded: true,
        getPosition: d => d.position,
        lightSettings: LIGHT_SETTINGS,
        onHover: this._onHover,
        opacity: 1,
        pickable: true,
        radius,
        upperPercentile,
        lowerPercentile
      })
    ];

    return (
      <div>
        {this._renderTooltip()}
        <DeckGL {...viewport} layers={layers} />
      </div>
    );
  }
}

DeckGLOverlay.displayName = 'DeckGLOverlay';
DeckGLOverlay.defaultProps = defaultProps;
