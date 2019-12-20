import React, { Component } from 'react';
import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'
import {ALL_CANDIDATES,ALL_RECRUITERS,ALL_JOBS,SIGNOUT} from "../constants/Routes";
import {Card,Col,Row} from "antd";
export default class AdminHome extends Component {
    render() {
        document.title = "Admin home";
        return (
              <div>
                <Navbar text="Logout" to={SIGNOUT}/>
                <div style={{ background: '#ECECEC', padding: '15px' }}>
               <span><center><h2>Click on Card to view the list</h2></center></span> 

                  <Row gutter={16}>
                    <Col span={8}><Link to={ALL_CANDIDATES}>
                      <Card title="Candidates" bordered={false}>
                      All candidates with their email and Id's are listed. Manage Candidates here.
                      </Card></Link>
                    </Col>
                    <Col span={8}><Link to={ALL_RECRUITERS}>
                      <Card title="Recruiters" bordered={false}>
                      All Recruiters with their email and Id's are listed. Manage Recruiters here.
                      </Card></Link>
                    </Col>
                    <Col span={8}><Link to={ALL_JOBS}>
                      <Card title="Jobs Available" bordered={false}>
                      Here you can manage the jobs posted by Recruiters. Click on Jobs above to view.
                      </Card></Link>
                    </Col>
                  </Row>
                </div>
            </div>
        )
    }
}
