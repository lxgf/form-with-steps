import React, {useEffect, useState} from 'react';
import stepsStyle from '../../assets/styles/Steps.module.css'

const AdditionalInformation = ({returnData, index, isShowed, switchStep, showStep, lastIndex}) => {
    const [formData, setFormData] = useState({
        info: ''
    })

    useEffect(() => {
        if (formData.info === '')
            returnData({info: null})
        else
            returnData(formData)

    }, [formData, returnData])

    return (
        <div className={stepsStyle.step + ' ' + (!isShowed ? stepsStyle.darkBg : '')}>
            <div className={stepsStyle.line + ' ' + (index === 0 ? stepsStyle.line_top : '') + (index === lastIndex ? stepsStyle.line_bottom : '')}>
                <div className={stepsStyle.line__pointer}>
                    <div className={stepsStyle.line__check}/>
                    <span className={stepsStyle.line__counter}>
                        {index+1}
                    </span>
                </div>
            </div>
            <div className={stepsStyle.rightBlock}>
                <div className={stepsStyle.info} onClick={() => {showStep(index)}}>
                    <div className={stepsStyle.info__title}>
                        Дополнительная инфорамция
                    </div>
                    {!isShowed &&
                        <div className={stepsStyle.info__addText}>
                            <p>Здесь вы можете ввести дополнительную информацию по доставке</p>
                        </div>
                    }
                </div>
                {isShowed &&
                    <div className={stepsStyle.hidingData}>
                        <div className={stepsStyle.form}>
                            <label className={stepsStyle.label}>
                                Текст (максимум 255 символов)
                                <textarea
                                    className={stepsStyle.textarea}
                                    value={formData.info}
                                    maxLength="255"
                                    style={{height: 'fit-content'}}
                                    onKeyUp={(e) => {
                                        if(e.target.scrollTop > 0){
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }
                                        setFormData(prevState => ({
                                            info: e.target.value
                                        }))
                                    }}
                                    onChange={e => {
                                        setFormData(prevState => ({
                                            info: e.target.value
                                        }))
                                    }} />
                            </label>
                        </div>
                        <button
                            className={stepsStyle.btn}
                            onClick={() => {
                                switchStep(index)
                            }}
                        >Далее</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default AdditionalInformation;
