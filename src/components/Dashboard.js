import React, { Component } from 'react'
import NavigationBar from './NavigantionBar'

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <h1>Home Component</h1>
            </div>
        )
    }
}

export default Dashboard
