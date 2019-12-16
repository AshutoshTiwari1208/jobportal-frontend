import React, { Component } from 'react'
import { Card,
Button,
Icon,
Pagination} from 'antd';
import { connect } from 'react-redux';
import {candidateDelete} from '../redux/actions/candidates';
import {allCandidates} from "../redux/actions/candidates";


class CandidatesList extends Component {

    state = {
        list: [],
        isApplied:false,
        page:1,
        limit:6,
    }

componentDidMount() {
    const pagination={
        page: this.state.page,
        limit:this.state.limit
    }

    this.props.allCandidates(pagination).then(response=>{

        this.setState({//set state will render the view again..
        list: response.results,
        total:response.metadata.count,
        list:response.results
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

     
 
onChange = page => {
    console.log("PAGE CLICKED ::::",page);
    const pagination={
        page: page,
        limit:this.state.limit
    }
    this.props.allCandidates(pagination).then(response=>{
        console.log("$$$$$$$$$$$$",response);
        this.setState({//set state will render the view again..
            total:response.metadata.count,
            list:response.results
        });
    })
  };
   


    render() {
        const { list } = this.state
        if(list.length<1){
            return(
                <h2><center>No candidates to Show currently...</center></h2>
            )
        }
        return (
            <React.Fragment>
            {
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
            }
            <Pagination onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>   
            </React.Fragment>
        );
    }
}


export default connect(null, {candidateDelete, allCandidates}) (CandidatesList);//take then send

