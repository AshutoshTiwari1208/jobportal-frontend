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

    console.log("#########",this.props.id);
    this.props.availablejobs(this.props.id,pagination).then(response=>{
        this.setState({//set state will render the view again..
        list: response.results,
        total:response.metadata.count,
        list:response.results
        })
    })
}






onChange = page => {
    console.log("PAGE CLICKED ::::",page);
    const pagination={
        page: page,
        limit:this.state.limit
    }
    this.props.availablejobs(this.props.id,pagination).then(response=>{
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
                <h2><center>No Jobs to show at this moment....</center></h2>
            )
        }
        return (
            <React.Fragment>
            {
                list.map(item=>{
                return (
                    <Card style={{ width: 300 }} hoverable>
                    <title>{item.job_title}</title>
                    <p>{item.job_description}</p>
                    <Button onClick={(e) => this.applyToJob(e,item.uuid)} disabled={item.isApplied}>Apply</Button>
                    </Card>
                ) 
                })
            }
            <Pagination onChange={this.onChange} total={this.state.total} pageSize={this.state.limit}/>   
            </React.Fragment>
        );
    }
}


export default connect(null, { availablejobs}) (JobsList);//take then send

