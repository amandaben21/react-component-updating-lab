import React, {PureComponent } from "react";      //This was bouns for the lab!

class Timer extends PureComponent {   //When using the PureComponent you don't need shouldComponentUpdate b/c pure component
  constructor() {                     //automatically does a comparison of current and next props & state, & only updated if it register
    super();                          // a change.   Gets an instant easy reduction in unnecessary updates! 
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //Your code here

  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    this.timer.current.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  // shouldComponentUpdate(nextProps, nextState) {      //when PureComponent is used we don't need shouldComponentUpdate
    // if(this.state.time===nextState.time) {
      // return false 
    // }
    // return true

  // }

  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
