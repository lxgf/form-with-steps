import React, {useEffect, useState} from 'react';
import stepsStyle from '../../assets/styles/Steps.module.css'
import DataList from "../DataList";
import countries from '../../data/countries.json'


const TemplateStep = ({returnData, index, isShowed, switchStep, showStep}) => {
    const [formData, setFormData] = useState({
        country: '',
        state: '',
        town: '',
        street: '',
        house: ''
    })

    const [errors, setErrors] = useState([])

    const getCountry = country => {
        setFormData(prevState => ({
            country: country.name,
            state: prevState.state,
            town: prevState.town,
            street: prevState.street,
            house: prevState.house
        }))
    }

    useEffect(() => {
        const validation = () => {
            let tempErrors = []

            if (formData.country.length === 0)
                tempErrors.push('Введите название страны')

            if (formData.state.length < 2)
                tempErrors.push('Длина назвагия области меньше 2-х')

            if (formData.town.length < 2)
                tempErrors.push('Длина назвагия города меньше 2-х')

            if (formData.street.length < 5)
                tempErrors.push('Длина назвагия улицы меньше 5-х')

            if (formData.house.length === 0)
                tempErrors.push('Введите номер дома')


            setErrors(tempErrors)

            returnData(formData)
        }

        validation()
    }, [formData, returnData])

    return (
        <div className={stepsStyle.step + ' ' + (!isShowed ? stepsStyle.darkBg : '')}>
            <div className={stepsStyle.line}>
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
                        Адрес досавки
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
                                Страна
                                <DataList myValues={countries} getValue={getCountry} currentValue={formData.country} />
                            </label>
                            <label className={stepsStyle.label}>
                                Область / Штат
                                <input
                                    type="text"
                                    className={stepsStyle.textInput}
                                    value={formData.state}
                                    maxLength="35"
                                    onChange={e => {
                                        setFormData(prevState => ({
                                            country: prevState.country,
                                            state: e.target.value,
                                            town: prevState.town,
                                            street: prevState.street,
                                            house: prevState.house
                                        }))
                                    }}/>
                            </label>
                            <label className={stepsStyle.label}>
                                Город (населённый пункт)
                                <input
                                    type="text"
                                    className={stepsStyle.textInput}
                                    value={formData.town}
                                    maxLength="25"
                                    onChange={e => {
                                        setFormData(prevState => ({
                                            country: prevState.country,
                                            state: prevState.state,
                                            town: e.target.value,
                                            street: prevState.street,
                                            house: prevState.house
                                        }))
                                    }}/>
                            </label>
                            <label className={stepsStyle.label}>
                                Улица
                                <input
                                    type="text"
                                    className={stepsStyle.textInput}
                                    value={formData.street}
                                    maxLength="30"
                                    onChange={e => {
                                        setFormData(prevState => ({
                                            country: prevState.country,
                                            state: prevState.state,
                                            town: prevState.town,
                                            street: e.target.value,
                                            house: prevState.house
                                        }))
                                    }}/>
                            </label>
                            <label className={stepsStyle.label}>
                                Дом / строение
                                <input
                                    type="text"
                                    className={stepsStyle.textInput}
                                    value={formData.house}
                                    maxLength="5"
                                    onChange={e => {
                                        setFormData(prevState => ({
                                            country: prevState.country,
                                            state: prevState.state,
                                            town: prevState.town,
                                            street: prevState.street,
                                            house: e.target.value
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

export default TemplateStep;
