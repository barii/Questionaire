import React from "react";

export default class JokeGenerator extends React.Component {
  state = {
    joke: null
  }

  render () {
    const { joke } = this.state;

    return (
      <React.Fragment>
        {!joke && <div>You haven't loaded any jokes yet!</div>}
      </React.Fragment>
    );
  }
}
