//s9 useEffect search có  debounce 
//phân tích
//Props: onSubmit: gọi hàm này mỗi khi có filter thay đổi
//State: searchTerm
//Render: form > input[type=text]
//Note: đợi user nhập đầy đủ form r mới tiến hàng gọi api (áp dug debounce basic) 
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

PostFiltersForm.propTypes = {
    //onSubmit là 1 function Submit
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null,
};

function PostFiltersForm(props) {
    // call prop from Component Cha
    const { onSubmit } = props;
    // create useState searchTerm
    const [searchTerm, setSearchTerm] = useState('');
    //kỹ thuật Debounce
    //coi lại lab9 : https://www.youtube.com/watch?v=WF3pUtvC01M
    const typingTimeoutRef = useRef(null);

    //function thay đổi lại State của searchTerm
    function handleSearchTermChange(e) {
        //call value từ event
        const value = e.target.value;
        console.log(value)
        //setState cho setSearchTerm = giá trị value đầu vào
        //cập nhật lại giá trị của setSearch
        setSearchTerm(value);

        if (!onSubmit) return;

        // SET -- 100 -- CLEAR, SET -- 300 --> SUBMIT
        // SET -- 300 --> SUBMIT
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                //add vào giá trị của searchTerm là value
                searchTerm: value,
            };
            //khi Submit thì gọi lại form value để ra truyền dữ liệu
            onSubmit(formValues);
        }, 300);
    }

    return (
        <form>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
        </form>
    );
}

export default PostFiltersForm;