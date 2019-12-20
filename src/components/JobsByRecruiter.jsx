import React, { Component } from 'react'
import { Card,
Button,
Pagination,
Spin
} from 'antd';
import { connect } from 'react-redux';
import {allJobsByRecruiter} from "../redux/actions/jobs";
import { Link } from 'react-router-dom'






class PostedJobList extends Component {

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
    this.props.allJobsByRecruiter(pagination).then(response=>{
        this.setState({//check what coming inside list
            total:response.metadata.count,
            list:response.data,
            loading:false
        })
    })
}

onChange = page => {
    const pagination={
        page: page,
        limit:this.state.limit
    }
    this.props.allJobsByRecruiter(pagination).then(response=>{
        this.setState({//set state will render the view again..
            total:response.metadata.count,
            list:response.data
        });
    })
  };
   



    render(){
        const {list,loading}=this.state //got list form inside current state
        if(loading){
            return(
                <center><Spin /></center>
            )
        }
        if(list.length<1){
            return(
                <h3><center>No Jobs Published!</center></h3>
            )
        }
        return(

            <React.Fragment>
            {
           
                list.map(jobs=>{
                let linkto="/recruiter/jobs/"+jobs.id;
                return(

                    <div className="cards">
                   <Card title={jobs.job_title}><p>{jobs.job_description}</p> 
                    <Link to={linkto}>View Applications</Link>
                    </Card>
              </div>
                )
            })
            }
            <Pagination className="paginationblock" onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>   
            </React.Fragment>
        )
    }  
}



export default connect(null,{allJobsByRecruiter})(PostedJobList);

