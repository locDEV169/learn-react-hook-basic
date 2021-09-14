//lab1: cho 1 cái Box, với màu deepPink, 
//1. sau đó onClick vào thì thay đổi màu theo danh sách Color List đã cho
//2. khi reload lại thì giữ nguyên màu đã onClick
// Phân tích 
//câu 2: +ko dùng useEffect()
//       +mỗi lần đổi màu lưu vào localStorage để khi reload thì hiển thị lại màu
//       +set initState của color để set từ giá trị trong localStorage
//       +sử dụng callback initialState để chi thực hiện 1 lần
import React,{useState} from 'react'
import './ColorBox.scss'

ColorBox.propTypes = {};
function getRamdomColor() {
    const COLOR_LIST = ['deeppink', 'goldenrod', 'marooon', 'lightgreen'];
    const ramdomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[ramdomIndex];
}
function ColorBox(props) {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem("colorChange") || 'deeppink';
        console.log(initColor)
        return initColor;
    })

    function handleBoxClick() {
        const newColor = getRamdomColor()
        setColor(newColor);
        //setIndex((x) => (x + 1) % COLOR_LIST.length);
        localStorage.setItem("colorChange", newColor)
    }

    return (
        <div className='color-box' style={{ backgroundColor: color }} onClick={handleBoxClick}>
            Color Box
        </div>
    )
}
export default ColorBox;