
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. // SPDX-License-Identifier: MIT-0

import AppLayout from "@awsui/components-react/app-layout";
import { useState } from "react";
import NavigationDrawer from "./components/Navigation/NavigationDrawer";
import ToolsDrawer from "./components/Navigation/ToolsDrawer";
import Dashboard from "./components/Navigation/Dashboard";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Box from "@awsui/components-react/box";
import AuthorsList from "./components/Authors/AuthorsList";
import Flashbar from "@awsui/components-react/flashbar"
import AuthorDetails from "./components/Authors/AuthorDetails";
import BooksList from "./components/Books/BooksList"
import BookDetails from "./components/Books/BookDetails"

function NotFoundPage() {

  return (
    <Box variant="h1">404 Page Not Found</Box>
  )
}


function App() {
  const [inputValue, setInputValue] = useState('My initial value');
  const [selectValue, setSelectValue] = useState();
  const [notifications, setNotifications] = useState([])

  console.log('inputValue: ', inputValue)

  return (
    <BrowserRouter>
      <AppLayout
        notifications={<Flashbar items={notifications} />}
        navigation={
          <NavigationDrawer></NavigationDrawer>}
        tools={<ToolsDrawer></ToolsDrawer>}

        content={
          <Switch>
            <Route path="/" exact={true} component={Dashboard}/>
            <Route path="/authors" >
              <AuthorsList addNotification={setNotifications}/>
            </Route>
            <Route path="/author/:authorId?">
              <AuthorDetails addNotification={setNotifications}/>
            </Route>
            <Route path="/books/:authorId?" >
              <BooksList addNotification={setNotifications}/>
            </Route>
            <Route path="/book/:bookId?">
              <BookDetails addNotification={setNotifications}/>
            </Route>
            <Route component={NotFoundPage}/>
          </Switch>
        }
      />
    </BrowserRouter>
  );
}

export default App;