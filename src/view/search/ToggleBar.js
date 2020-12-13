import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import React, {useState} from 'react';

export const ToggleBar = () => {
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        {name: 'Top Choices', value: '1'},
        {name: 'Age', value: '2'},
        {name: 'Height', value: '3'},
    ];

    return (
        <>
            <ButtonGroup toggle>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        type="radio"
                        variant="outline-dark"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </>
    );
}

export default ToggleBar;