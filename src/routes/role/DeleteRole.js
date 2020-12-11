import {React, Component} from 'react';
import Button from 'react-bootstrap/Button';

class DeleteRole extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <table id='deleteRole' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr>
                    <p class='closeButton' onClick={() => this.props.closePopup('deleteRole')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{ fontSize: 25 + 'px', textAlign: 'center' }}>
                        <b>Delete Role Confirmation</b>
                    </p>
                </tr>
                <tr class='center' style={{ marginTop: 15 + 'px', padding: 25 + 'px' }}>
                    <label>Are you sure you want to delete <b>{this.props.roleName}</b>? This operation cannot be undone.</label>
                </tr>
                <tr class='center'>
                    <td style={{display: 'inline-block', marginLeft: 10 + 'px', marginRight: 20 + 'px'}}>
                        <Button
                            variant='danger'
                            style={{
                                textAlign: 'center',
                                marginTop: 20 + 'px',
                                marginBottom: 20 + 'px',
                            }}
                            onClick={this.props.deleteRole}
                        >
                            Delete
                        </Button>
                    </td>
                    <td style={{display: 'inline-block', marginLeft: 20 + 'px', marginRight: 10 + 'px'}}>
                        <Button
                            variant='primary'
                            style={{
                                textAlign: 'center',
                                marginTop: 20 + 'px',
                                marginBottom: 20 + 'px',
                            }}
                            onClick={()=> this.props.closePopup('deleteRole')}>
                            Cancel
                        </Button>
                    </td>
                </tr>
            </table>
        )
    }
}

export default DeleteRole