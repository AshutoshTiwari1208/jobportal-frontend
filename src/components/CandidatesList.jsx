import React, { Component } from 'react'
import { Card,
Button,
Icon} from 'antd';
import { connect } from 'react-redux';
import {candidateDelete} from '../redux/actions/candidates';
import {allCandidates} from "../redux/actions/candidates";


class CandidatesList extends Component {

    state = {
        list: [],
        isApplied:false,
    }

componentDidMount() {

    this.props.allCandidates().then(response=>{

        this.setState({//set state will render the view again..
        list: response.results
        })
    })
}


deleteCandidate=(e,candidateUuid)=>{
        
        e.preventDefault();

        let candidateDetail= this.props.candidateDelete(candidateUuid).then(data=>{
            const updatedCandidates = this.state.list.map(candidate=>{
                return candidate.uuid === candidateUuid ? 
                {
                    ...candidate, isApplied: true
                } : 
                candidate
            })
            this.setState({
                list: updatedCandidates
            })
        });
    }

        

    render() {
        const { list } = this.state
        return (
            list.map(candidate=>{
              return (
                <Card style={{ width: 300 }}>
                <p>{candidate.name}</p>
                <p>{candidate.username}</p>
                <p>{candidate.uuid}</p>
                <Button type="danger" onClick={(e) => this.deleteCandidate(e,candidate.uuid)} disabled={candidate.isApplied}>Delete</Button>
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

export default connect(mapStateToProps, {candidateDelete, allCandidates}) (CandidatesList);//take then send

