import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState('');
    //thay đổi giá trị cho value input
    function handleValueChange(e) {
        console.log(e.target.value);
        setValue(e.target.value);
    }

    function handleSubmit(e) {
        // Prevent reloading browser
        e.preventDefault();
        // nếu ko có onSubmit thì ko làm gì cả
        if (!onSubmit) return;
        // nếu có onSubmit thì truyền lại cho form Submit
        const formValues = {
            //add vào giá trị của title là value
            title: value,
        };
        //khi Submit thì gọi lại form value để ra truyền dữ liệu
        onSubmit(formValues);

        // Reset form
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={handleValueChange}
            />
        </form>
    );
}
export default TodoForm;