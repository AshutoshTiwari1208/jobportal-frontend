import React, { Component } from 'react'
import { Card,
Button,
Pagination,
Spin,
Popconfirm
} from 'antd';
import { connect } from 'react-redux';
import {recruiterDelete,allRecruiters} from "../redux/actions/recruiters";


class RecruiterList extends Component {

    state = {
        list: [],
        isApplied:false,
        page:1,
        limit:6,
        loading:true,
        textPop:"Want to delete this recruiter"
    }

componentDidMount() {
    const pagination={
        page: this.state.page,
        limit:this.state.limit
    }
    this.props.allRecruiters(pagination).then(response=>{
        this.setState({//check what coming inside list
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
    this.props.allRecruiters(pagination).then(response=>{
        this.setState({//set state will render the view again..
            total:response.metadata.count,
            list:response.data
        });
    })
  };


deleteRecruiter=(e,recruiterUuid)=>{//uuid kahan se ayegi jispe click hoga
    e.preventDefault();
    let recruiterDetails=this.props.recruiterDelete(recruiterUuid).then(data=>{
        const updatedRecruiters = this.state.list.map(recruiter=>{
            return recruiter.id===recruiterUuid ?
            {
                ...recruiter,isApplied:true //only isApplied replace rest same.
            }:
            recruiter
        });
        this.setState({
            list:updatedRecruiters
        })
    })
}


    render(){
        const {list,loading}=this.state //got list form inside current state
        if(loading){
            return(
                <center><Spin /></center>
            )
        }
        if(list.length<1){
            return(
                <h2><center>No Recruiters present...</center></h2>
            )
        }
        return(
            <React.Fragment>
                <h2 align="center">LIST OF RECRUITERS</h2>
            {
            list.map(recruiter=>{
                return(
                    <div className="cards">
                    <Card title={recruiter.email}><p>{recruiter.name}<br/>ID:{recruiter.id}</p>
                    {/* <Button type="danger" onClick={(e) => this.deleteRecruiter(e,recruiter.id)} disabled={recruiter.isApplied}>Delete</Button> */}
                    
                    <Popconfirm placement="right" title={this.state.textPop} disabled={recruiter.isApplied} onConfirm={(e) => this.deleteRecruiter(e,recruiter.id)}   okText="Yes" cancelText="No">
                             <Button type="danger"  disabled={recruiter.isApplied}>Delete</Button>
                             </Popconfirm>
                    
                    
                    </Card>           
                 </div>
                )

            })
        }
             <Pagination onChange={this.onChange} className="paginationblock" total={this.state.total} pageSize={this.state.limit}/>   
             </React.Fragment>
        )
    }  
}


export default connect(null,{allRecruiters,recruiterDelete})(RecruiterList);

