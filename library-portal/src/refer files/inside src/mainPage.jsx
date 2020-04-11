import React, { Component } from 'react';
import RecentBookList from './recentBooksList';

class MainPage extends Component {
    render() {
        return (
            <div className="col">
                <h4 className="text-center">Recent Books Added</h4>
                <RecentBookList/>
            </div>
        )
        
    }
}

export default MainPage;