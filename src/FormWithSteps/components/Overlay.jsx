import React from 'react';
import overlayStyle from '../assets/styles/Overlay.module.css'
import checkIcon from '../assets/images/overlay-check.svg'

const Overlay = ({data, isShowed, hideOl}) => {
    return (
        <div className={overlayStyle.overlay + ' ' + (!isShowed ? overlayStyle.hidden : '')}>
            <div className={overlayStyle.container}>
                <button className={overlayStyle.overlay__closeBtn} onClick={() => hideOl()} />
                <img className={overlayStyle.overlay__checkIcon} src={checkIcon} alt="Успешно!"/>
                <p className={overlayStyle.overlay__mainText}>
                    Успешно
                </p>
                <table className={overlayStyle.overlay__table}>
                    <thead>
                    <tr>
                        <td>Поле</td>
                        <td>Значение</td>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(data).map((fieldName, key) =>
                        <tr key={key}>
                            <td>{fieldName}</td>
                            <td>{data[fieldName]}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Overlay;
