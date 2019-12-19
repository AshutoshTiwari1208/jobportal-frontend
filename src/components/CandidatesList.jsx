import React, { Component } from 'react'
import { Card,
Button,
Icon,
Pagination,
Spin} from 'antd';
import { connect } from 'react-redux';
import {candidateDelete} from '../redux/actions/candidates';
import {allCandidates} from "../redux/actions/candidates";


class CandidatesList extends Component {

    state = {
        list: [],
        isApplied:false,
        page:1,
        limit:6,
        loading:true
    }

componentDidMount() {
    const pagination={
        page: this.state.page,
        limit:this.state.limit
    }

    this.props.allCandidates(pagination).then(response=>{

        this.setState({//set state will render the view again..
        total:response.metadata.count,
        list:response.data,
        loading:false
        })
    })
}


deleteCandidate=(e,candidateUuid)=>{
        
        e.preventDefault();

        let candidateDetail= this.props.candidateDelete(candidateUuid).then(data=>{
            const updatedCandidates = this.state.list.map(candidate=>{
                return candidate.id === candidateUuid ? 
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
   const pagination={
        page: page,
        limit:this.state.limit
    }
    this.props.allCandidates(pagination).then(response=>{
       this.setState({//set state will render the view again..
            total:response.metadata.count,
            list:response.data
        });
    })
  };
   


    render() {
        const { list,loading } = this.state
        if(loading){
            return(
                <center><Spin /></center>
            )
        }
        if(list.length<1){
            return(
                <h2><center>No candidates to Show currently...</center></h2>
            )
        }
        return (
            
            <React.Fragment>
                <h2 align="center">LIST OF CANDIDATES</h2>

            {
                list.map(candidate=>{
                return (
                    <div className="cards">
                    <Card title={candidate.email}><p>Name:{candidate.name}<br/>ID:{candidate.id}</p>
                     <Button type="danger" onClick={(e) =>  this.deleteCandidate(e,candidate.id)} disabled={candidate.isApplied}>Delete</Button>
                     </Card>
              </div>
                ) 
                })
            }
            <Pagination onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>   
            </React.Fragment>
        );
    }
}


export default connect(null, {candidateDelete, allCandidates}) (CandidatesList);//take then send