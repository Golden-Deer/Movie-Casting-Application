import {React, Component} from 'react';
import Button from 'react-bootstrap/Button';

class EditProjectPopup extends Component {
    constructor(props) {
        super(props);

        this.editField = this.editField.bind(this);
    }

    editField(e, field, original) {
        const re = /^[0-9\b]+$/;
        if (!(field == 'Release Date' && (e.target.value.length > 4 || !re.test(e.target.value)))) {
            if (original == e.target.value || (field == 'Release Date' && e.target.value.length != 4))
                this.props.setNewValue(e, true)
            else
                this.props.setNewValue(e, false)
        }
    }

    render() {
        return (
            <table id='editProjectPopup' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr>
                    <p class='closeButton' onClick={() => this.props.closePopup('editProjectPopup')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{fontSize: 25 + 'px', textAlign: 'center'}}>
                        <b>Edit Project {this.props.field}</b>
                    </p>
                </tr>
                {this.props.field == 'Description' ?
                    <tr class='center'>
                        <textarea value={this.props.newValue} cols='41' rows='4'
                                  onChange={(e) => this.editField(e, this.props.field, this.props.originalValue)}
                                  style={{marginTop: 40 + 'px'}}></textarea>
                    </tr>
                    :
                    <tr class='center'>
                        <input value={this.props.newValue}
                               onChange={(e) => this.editField(e, this.props.field, this.props.originalValue)}
                               style={{marginTop: 50 + 'px'}}></input>
                    </tr>
                }
                <tr class='center'>
                    <td style={{display: 'inline-block', marginLeft: 10 + 'px', marginRight: 20 + 'px'}}>
                        <Button
                            variant='primary'
                            style={{
                                textAlign: 'center',
                                marginTop: 20 + 'px',
                                marginBottom: 20 + 'px',
                            }}
                            onClick={this.props.updateProject}
                            disabled={this.props.disableSave}
                        >
                            Save
                        </Button>
                    </td>
                    <td style={{display: 'inline-block', marginLeft: 20 + 'px', marginRight: 10 + 'px'}}>
                        <Button
                            variant='danger'
                            style={{
                                textAlign: 'center',
                                marginTop: 20 + 'px',
                                marginBottom: 20 + 'px',
                            }}
                            onClick={() => this.props.closePopup('editProjectPopup')}>
                            Cancel
                        </Button>
                    </td>
                </tr>
            </table>
        )
    }
}

export default EditProjectPopup;