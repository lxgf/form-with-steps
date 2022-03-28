import React, {useEffect, useState} from 'react';
import stepsStyle from '../../assets/styles/Steps.module.css'

const FullName = ({returnData, index, isShowed, switchStep, showStep}) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: ''
    })

    const [errors, setErrors] = useState([])

    const validation = () => {
        let tempErrors = []

        if (formData.name.length < 2)
            tempErrors.push('Длина имени меньше 2-х')

        if (formData.surname.length < 2)
            tempErrors.push('Длина фамилии меньше 2-х')

        if (/[^a-zA-Zа-яА-Я]/g.test(formData.name))
            tempErrors.push('Имя должно содержаить только букы')

        if (/[^a-zA-Zа-яА-Я]/g.test(formData.surname))
            tempErrors.push('Фамилия должна содержаить только букы')

        setErrors(tempErrors)

        returnData(formData)
    }

    useEffect(() => {
        validation()
    }, [formData])

    return (
        <div className={stepsStyle.step}>
            <div className={stepsStyle.line}>
                <div className={stepsStyle.line__pointer}>
                    <div className={stepsStyle.line__check + ' ' + stepsStyle.check}/>
                    <span className={stepsStyle.line__counter}>
                        {index}
                    </span>
                </div>
            </div>
            <div className={stepsStyle.rightBlock}>
                <div className={stepsStyle.info} onClick={() => {showStep(index)}}>
                    <div className={stepsStyle.info__title}>
                        Полное имя
                    </div>
                    {!isShowed &&
                        <div className={stepsStyle.info__addText}>
                            {errors.length === 0 ? <p>Все данные введены верно</p>
                                :
                                errors.map((error, errorIndex) => <p key={errorIndex}>{error} </p>)
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
                                Имя
                                <input
                                    type="text"
                                    className={stepsStyle.textInput}
                                    value={formData.name}
                                    maxLength="20"
                                    onChange={e => {
                                       setFormData(prevState => ({
                                           name: e.target.value,
                                           surname: prevState.surname
                                       }))
                                    }}/>
                            </label>
                            <label className={stepsStyle.label}>
                                Фамилия
                                <input
                                    type="text"
                                    className={stepsStyle.textInput}
                                    value={formData.surname}
                                    maxLength="30"
                                    onChange={e => {
                                        setFormData(prevState => ({
                                            name: prevState.name,
                                            surname: e.target.value
                                        }))
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

export default FullName;
