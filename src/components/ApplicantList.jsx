import React, { Component } from 'react'
import { Card,
Button,
Icon,
Spin,
Pagination} from 'antd';
import { connect } from 'react-redux';
import {getAppliedCandidates} from "../redux/actions/candidates";


class ApplicantList extends Component {

    state = {
        list: [],
        page:1,
        limit:6,
        loading:true
    }

componentDidMount() {
    const pagination={
        page: this.state.page,
        limit:this.state.limit
    }
    this.props.getAppliedCandidates(this.props.jobId,pagination).then(response=>{
        
        this.setState({//set state will render the view again..
        total:response.metadata.count,
        list:response.data,
        loading:false
        })
    })
}


onChange = page => {
    console.log("PAGE CLICKED ::::",page);
    const pagination={
        page: page,
        limit:this.state.limit
    }
    this.props.getAppliedCandidates(this.props.jobId,pagination).then(response=>{
        console.log("$$$$$$$$$$$$",response);
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
                <h3><center>No Applications Received</center></h3>
            )
        }
        return (
            <React.Fragment>
            {
                list.map(candidate=>{
                return (
                    <div className="cards">
                    <Card title={candidate.email}>Name:{candidate.name}<br/>ID :{candidate.id}</Card>
                   </div>
                ) 
                })
            }
             <Pagination onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>   
             </React.Fragment>
        )

    }
}

const mapStateToProps=(state)=>{
    return ({
        userData:state
    })
}

export default connect(mapStateToProps, {getAppliedCandidates}) (ApplicantList);//take then send

