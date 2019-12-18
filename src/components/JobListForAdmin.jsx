import React, { Component } from 'react'
import { Card,
Button,
Pagination} from 'antd';
import { availablejobs} from "../redux/actions/jobs";
import { connect } from 'react-redux';

class JobsList extends Component {

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

    this.props.availablejobs(this.props.id,pagination).then(response=>{
        this.setState({//set state will render the view again..
        list: response.results,
        total:response.metadata.count,
        list:response.results
        })
    })
}






onChange = page => {
    const pagination={
        page: page,
        limit:this.state.limit
    }
    this.props.availablejobs(this.props.id,pagination).then(response=>{
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
                <h3><center>No Jobs to show at this moment....</center></h3>
            )
        }
        return (
            <React.Fragment>
            {
                list.map(item=>{
                return (
                    <div className="cards">
                            <Card title={item.job_title}><p>{item.job_description}</p>
                            <Button type="danger" onClick={(e) => this.applyToJob(e,item.id)} disabled={item.isApplied}>Apply</Button>
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


export default connect(null, { availablejobs}) (JobsList);//take then send

