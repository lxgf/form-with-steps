import React, {useEffect, useState} from 'react';
import stepsStyle from '../../assets/styles/Steps.module.css'
import DataList from "../DataList";
import dialCodes from '../../data/dialCodes.json'

const PhoneNumber = ({returnData, index, isShowed, switchStep, showStep, lastIndex}) => {
    const [formData, setFormData] = useState({
        dialCode: '',
        number: ''
    })

    const [errors, setErrors] = useState([])

    useEffect(() => {
        const validation = () => {
            let tempErrors = []


            if (formData.number.length < 6)
                tempErrors.push('Длина номера телефона меньше 6')

            if (!/^\d+$/.test(formData.number))
                tempErrors.push('Номер должен содержаить только цифры')

            if (formData.dialCode.length === 0)
                tempErrors.push('Нет кода страны')

            setErrors(tempErrors)

            returnData({phoneNumber: (formData.dialCode + formData.number).slice(1)})
        }

        validation()
    }, [formData, returnData])

    const getDialCode = countryDialInfo => {
        setFormData(prevState => ({
            dialCode: countryDialInfo.dial_code,
            number: prevState.number
        }))
    }

    return (
        <div className={stepsStyle.step + ' ' + (!isShowed ? stepsStyle.darkBg : '')}>
            <div className={stepsStyle.line + ' ' + (index === 0 ? stepsStyle.line_top : '') + (index === lastIndex ? stepsStyle.line_bottom : '')}>
                <div className={stepsStyle.line__pointer}>
                    <div className={stepsStyle.line__check + ' ' + (errors.length === 0 ? stepsStyle.check : '')}/>
                    <span className={stepsStyle.line__counter}>
                        {index+1}
                    </span>
                </div>
            </div>
            <div className={stepsStyle.rightBlock}>
                <div className={stepsStyle.info} onClick={() => {showStep(index)}}>
                    <div className={stepsStyle.info__title}>
                        Персональный номер телефона
                    </div>
                    {!isShowed &&
                        <div className={stepsStyle.info__addText}>
                            {errors.length === 0 ? <p>Все данные введены верно</p>
                                :
                                <p>Не заполнено</p>
                            }
                        </div>
                    }
                </div>
                {isShowed &&
                    <div className={stepsStyle.hidingData}>
                        {errors.length !== 0 &&
                            <div className={stepsStyle.errors}>
                                {
                                    errors.map((error, errorIndex) => <p key={errorIndex}>{error} </p>)
                                }
                            </div>
                        }
                        <div className={stepsStyle.form}>
                            <label className={stepsStyle.label}>
                                Страна
                                <DataList myValues={dialCodes} getValue={getDialCode} />
                            </label>
                            <label className={stepsStyle.label}>
                                Код
                                <input
                                    type="text"
                                    className={stepsStyle.textInput + ' ' + stepsStyle.minifiedTextInput + ' ' + stepsStyle.roTextInput}
                                    value={formData.dialCode}
                                    readOnly={true}
                                    />
                            </label>
                            <label className={stepsStyle.label}>
                                Поле номера
                                <input
                                    type="number"
                                    className={stepsStyle.numberInput}
                                    value={formData.number}
                                    maxLength="18"
                                    onChange={e => {
                                        if (e.target.value.length < 15) {
                                            setFormData(prevState => ({
                                                dialCode: prevState.dialCode,
                                                number: e.target.value
                                            }))
                                        }
                                    }}/>
                            </label>
                        </div>
                        <button
                            className={stepsStyle.btn}
                            onClick={() => {
                                if (errors.length === 0)
                                    switchStep(index)
                            }}
                        >Далее</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default PhoneNumber;
