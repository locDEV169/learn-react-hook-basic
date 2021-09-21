// lab2 Pagination (phân trang)
//set up 
//  + có 2 nút prev , next
//  + Props:    -pagination: required
//              -onPageChange: hàm sẽ được gọi user click next or prev
//  +State: N/A
//  +Render:    -Nút prev: trigger hàm onPageChange với page = page - 1
//              -Nút next: trigger hàm onPageChange với page = page + 1
//  +Note:      -Nút prev sẽ bị disable nếu đang ở trang 1
//              -Nút next sẽ bị disable nếu ở trang cuối

import React from 'react';
import PropTypes from 'prop-types';
//sét props
Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
};

function Pagination(props) {
    //call props từ component cha
    const { pagination, onPageChange } = props;
    //set dữ liệu cho các biến
    const { _page, _limit, _totalRows } = pagination;
    // tính tổng số trang
    const totalPages = Math.ceil(_totalRows / _limit);
    // 51 / 10 = 5.1 --> 6
    //handle thay đổi trang
    function handlePageChange(newPage) {
        // hàm này dùng kiểm tra component cha có truyền data xuống ko
        //nếu có thì gọi lại function onPageChange
        if (onPageChange) {
            onPageChange(newPage);
        }
    }

    return (
        <div>
            <button
                disabled={_page <= 1}
                onClick={() => handlePageChange(_page - 1)}
            >
                Prev
            </button>

            <button
                disabled={_page >= totalPages}
                onClick={() => handlePageChange(_page + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;