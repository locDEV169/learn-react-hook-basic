import React,{ useState, useEffect } from 'react';

Clock.propTypes = {};

//function xử lý fomatDate
//cái function này là func có sẵn,chi cần gọi
function fomatDate(date) {
    if (!date) return '';

    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
}

function Clock() {
    const [timeString, setTimeString] = useState('')

    useEffect(() => {

        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = fomatDate(now)

            setTimeString(newTimeString)
        }, 1000);
        
        //clean lại quá trình setInterval()
        //fix bug cho vấn đề đị unmount trong trường hợp clean up
        //Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        return () => {
            console.log("clean up ")
            clearInterval(clockInterval);
          };
    }, [])

    return (
        <p style={{ fontSize: '42px' }}>{timeString}</p>
    )
}
export default Clock;