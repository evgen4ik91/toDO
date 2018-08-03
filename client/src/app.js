import React from 'react';
import CONST from './constants';
import {Sidebar} from './components/sidebar/sidebar';
import {Content} from './components/content/content';
import {Title} from './components/title/title';
import {GroupList} from './components/group-list/group-list';

import "./styles/styles.sass";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="container fluid">
          <div className="row">
            <Sidebar>
              <Title appName={CONST.appName} />
              <GroupList groupsList={CONST.groupsList} />
            </Sidebar>
            <Content>

            </Content>
          </div>
        </div>
        );
    }
};