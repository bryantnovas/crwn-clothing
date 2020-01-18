import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import SignInAndUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import "./App.css";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }
  unsubcribeFromAuth = null;
  componentDidMount() {
    // subscribes to auth and listens to changes
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // returns userRef after creating profile

        // if snapshot exists adds it to state
        userRef.onSnapshot(snapshot => {
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            },
            () => console.log(this.state)
          );
        });
      } else {
        this.setState({ currentUser: userAuth });
      } // sets state to null
    });
  }
  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
