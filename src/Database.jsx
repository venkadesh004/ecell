import { Component, React } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/database';
import firebaseConfig from "./utils/firebase";

export default class Database extends Component {
  constructor(props) {
    super(props);
    this.state = {
      database: null
    }
  }

  componentDidMount = async () => {
    firebase.initializeApp(firebaseConfig);

    this.setState({
      database: firebase.database()
    });

    console.log(this.state.database);
  }
  render() {
    return (
      <div className="Database">
        
      </div>
    );
  }
}