import Window from './Window';
import React from 'react';

class App extends React.Component {

    render(){
        return(
            <div>
                <Window history={this.props.history} />
            </div>
        );
    }
}

export default App;
