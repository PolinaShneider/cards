import React from 'react'
import {useCallback} from 'react'
import TargetBox from '../TargetBox/TargetBox'
import PropTypes from 'prop-types';

const DragnDrop = (props) => {
    const {onDrop} = props;
    const handleFileDrop = useCallback((item, monitor) => {
        if (monitor) {
            const files = monitor.getItem().files;

            onDrop(files);
        }
    }, []);
    return (
        <>
            <TargetBox onDrop={handleFileDrop}/>
        </>
    )
};

DragnDrop.propTypes = {
    onDrop: PropTypes.func
};

export default DragnDrop
