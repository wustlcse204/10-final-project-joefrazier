import React, {Component} from 'react'


class RepoItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <p>{this.props.name}</p>
                {"Item"}
            </div>
        );
    }

}
export default RepoItem