import React, { Component } from 'react'
import { Card,
Button,
Icon} from 'antd';
import { connect } from 'react-redux';
import {getAppliedCandidates} from "../redux/actions/candidates";


class ApplicantList extends Component {

    state = {
        list: [],
    }

componentDidMount() {
    this.props.getAppliedCandidates(this.props.jobId).then(response=>{
        this.setState({//set state will render the view again..
        list: response.results
        })

    })
}


    
    render() {
        const { list } = this.state
        if(list.length<1){
            return(
                <h2><center>No Applications Received</center></h2>
            )
        }
        return (
            list.map(candidate=>{
              return (
                <Card style={{ width: 300 }}>
                <p>{candidate.name}</p>
                <p>{candidate.username}</p>
                <p>{candidate.uuid}</p>
                </Card>
              ) 
            })
        );
    }
}

const mapStateToProps=(state)=>{
    return ({
        userData:state
    })
}

export default connect(mapStateToProps, {getAppliedCandidates}) (ApplicantList);//take then send

