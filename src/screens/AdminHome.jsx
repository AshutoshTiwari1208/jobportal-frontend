import React, { Component } from 'react';
import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'
import { Card, CardDeck,  } from 'react-bootstrap';
import {ALL_CANDIDATES,ALL_RECRUITERS,ALL_JOBS,SIGNOUT} from "../constants/Routes";

export default class AdminHome extends Component {
    render() {
        return (
            <div>
                <Navbar text="Logout" to={SIGNOUT}/>
                <CardDeck>
  <Card>
    <Card.Body><Link to={ALL_CANDIDATES}>
      <Card.Title>Candidates</Card.Title></Link>
      <Card.Text>
         All candidates with their email and Id's are listed. Manage Candidates here.
      </Card.Text>
    </Card.Body>
    {/* <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer> */}
  </Card>
  <Card>
    <Card.Body><Link to={ALL_RECRUITERS}>
      <Card.Title>Recruiters</Card.Title></Link>
      <Card.Text>
         All Recruiters with their email and Id's are listed. Manage Recruiters here.
      </Card.Text>
    </Card.Body>
    {/* <Card.Footer>
      <small className="">Last updated 3 mins ago</small>
    </Card.Footer> */}
  </Card>
  <Card>
    <Card.Body><Link to={ALL_JOBS}>
      <Card.Title>Jobs Available</Card.Title></Link>
      <Card.Text>
        Here you can manage the jobs posted by Recruiters. Click on Jobs above to view.
      </Card.Text>
    </Card.Body>
    {/* <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer> */}
  </Card>
</CardDeck>
            </div>
        )
    }
}
