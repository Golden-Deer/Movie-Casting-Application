import {React, Component} from 'react';
import Button from 'react-bootstrap/Button';

class EditRole extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discret: false,
            preset: true,
        }

        this.editField = this.editField.bind(this);
        this.selectPreset = this.selectPreset.bind(this);
        this.selectDiscrete = this.selectDiscrete.bind(this);
    }

    editField(e, field, original) {
        if (original == e.target.value)
            this.props.setNewValue(e, true)
        else
            this.props.setNewValue(e, false)
    }

    selectPreset() {
        this.setState({preset: true, discrete: false})
    }

    selectDiscrete() {
        this.setState({preset: false, discrete: true})
    }

    render() {
        var options = null;
        if (this.props.field == 'Age') {
            options = [
                <option selected disabled>Choose here</option>,
                <option value='0-10'>Under 10</option>,
                <option value='10-17'>10-17</option>,
                <option value="18-25">18-25</option>,
                <option value="26-35">26-35</option>,
                <option value="36-45">36-45</option>,
                <option value="46-60">46-60</option>,
                <option value="61-80">61-80</option>,
                <option value=">80">Over 80</option>,
                <option value="unspecified">Unspecified</option>,]
        }
        if (this.props.field == 'Gender') {
            options = [
                <option selected disabled>Choose here</option>,
                <option value="female">Female</option>,
                <option value="male">Male</option>,
                <option value="unspecified">Unspecified</option>,
            ]
        }
        if (this.props.field == 'Height') {
            options = [
                <option selected disabled>Choose here</option>,
                <option value="0-140">Below 140cm</option>,
                <option value="140-149">140cm-149cm</option>,
                <option value="150-159">150cm-159cm</option>,
                <option value="160-169">160cm-169cm</option>,
                <option value="170-179">170cm-179cm</option>,
                <option value="180-189">180cm-189cm</option>,
                <option value="190-199">190cm-199cm</option>,
                <option value=">199">Over 199cm</option>,
                <option value="unspecified">Unspecified</option>,]
        }
        if (this.props.field == 'Weight') {
            options = [
                <option selected disabled>Choose here</option>,
                <option value="<40">Below 40kg</option>,
                <option value="40-49">40kg-49kg</option>,
                <option value="50-59">50kg-59kg</option>,
                <option value="60-69">60kg-69kg</option>,
                <option value="70-79">70kg-79kg</option>,
                <option value="80-89">80kg-89kg</option>,
                <option value="90-99">90kg-99kg</option>,
                <option value=">99">Over 100kg</option>,
                <option value="unspecified">Unspecified</option>,]
        }

        return (
            <table id='editRoleTag' class='popup' style={{opacity: 0 + '%', visibility: 'hidden'}}>
                <tr>
                    <p class='closeButton' onClick={() => this.props.closePopup('editRoleTag')}>
                        x
                    </p>
                </tr>
                <tr class='center'>
                    <p style={{fontSize: 25 + 'px', textAlign: 'center'}}>
                        <b>Update {this.props.field}</b>
                    </p>
                </tr>
                <tr class='center'>
                    <td style={{display: 'inline-block', marginRight: 10 + 'px'}}>
                        <input type="radio" value="MALE" name="option" checked={this.state.preset}
                               onChange={this.selectPreset}/> Preset
                    </td>
                    <td style={{display: 'inline-block', marginLeft: 10 + 'px'}}>
                        <input type="radio" value="MALE" name="option" checked={this.state.discrete}
                               onChange={this.selectDiscrete}/> Custom
                    </td>
                </tr>
                <tr class='center'>
                    {this.state.preset ?
                        <select value={this.props.newValue} style={{marginTop: 40 + 'px'}} onChange={(e) =>
                            this.editField(e, this.props.field, this.props.originalValue)}>
                            {options}
                        </select>
                        :
                        <input style={{marginTop: 35 + 'px'}}
                               onChange={(e) => this.editField(e, this.props.field, this.props.originalValue)}></input>
                    }

                </tr>
                <tr class='center'>
                    <td style={{display: 'inline-block', marginLeft: 10 + 'px', marginRight: 20 + 'px'}}>
                        <Button
                            variant='primary'
                            style={{
                                textAlign: 'center',
                                marginTop: 20 + 'px',
                                marginBottom: 20 + 'px',
                            }}
                            onClick={this.props.updateRole}
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
                            onClick={() => this.props.closePopup('editRoleTag')}>
                            Cancel
                        </Button>
                    </td>
                </tr>
            </table>
        )
    }
}

export default EditRole;