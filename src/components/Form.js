import React, { Component } from "react";

class Form extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.getWeather}>
          <input type="text" name="city" />
          <input type="text" name="country" />
          <button className="btn-large">Get Weather</button>
        </form>
      </div>
    );
  }
}

export default Form;
