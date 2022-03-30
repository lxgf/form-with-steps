import React, {useState} from 'react';
import mainStyle from '../assets/styles/Main.module.css'
import deliveryIcon from '../assets/images/delivery.svg'
import FullName from "./Steps/FullName";
import PhoneNumber from "./Steps/PhoneNumber";
import PlaceSelect from "./Steps/PlaceSelect";
import AdditionalInformation from "./Steps/AdditionalInformation";
import Overlay from "./Overlay";

const Main = () => {
    const [allData, setAllData] = useState({})
    const [olShowStatus, setOlShowStatus] = useState(false)

    const returnData = data => {
        let newData = allData
        Object.keys(data).forEach(fieldName => {
            newData[fieldName] = data[fieldName]
        });

        setAllData(newData)
    }

    const switchStep = index => {
        const newShowStatuses = [...showStatuses]
        if (index !== newShowStatuses.length-1){
            newShowStatuses[index] = false
            newShowStatuses[index+1] = true
            setShowStatuses(newShowStatuses)
        } else {
            let emptyFieldsCount = 0
            for (const dataValue of Object.entries(allData)) {
                if (dataValue === '') emptyFieldsCount++
            }

            if (emptyFieldsCount === 0) {
                setOlShowStatus(true)
                console.log(allData)
            }
        }
    }

    let stepIndex = 0

    const [showStatuses, setShowStatuses] = useState(
        new Array(4)
            .fill(true)
            .fill(false, 1)
    )

    const showStep = index => {
        const newShowStatuses = [...showStatuses]
        newShowStatuses.fill(false)
        newShowStatuses[index] = true
        setShowStatuses(newShowStatuses)
    }

    const hideOl = () => {
        setOlShowStatus(false)
    }

    return (
        <div className={mainStyle.main}>
            <Overlay data={allData} isShowed={olShowStatus} hideOl={hideOl}/>
            <div className={mainStyle.container}>
                <header className={mainStyle.header}>
                    <span>Оформить доставку</span>
                    <img src={deliveryIcon} alt="Доставка"/>
                </header>
                <div className={mainStyle.regBlock}>
                    <div className={mainStyle.regBlock__title}>
                        <span>Новый профиль</span>
                    </div>
                    <div className={mainStyle.regBlock__steps}>
                        <FullName
                            returnData={returnData}
                            isShowed={showStatuses[stepIndex]}
                            index={stepIndex++}
                            switchStep={switchStep}
                            showStep={showStep}
                        />
                        <PhoneNumber
                            returnData={returnData}
                            isShowed={showStatuses[stepIndex]}
                            index={stepIndex++}
                            switchStep={switchStep}
                            showStep={showStep}
                        />
                        <PlaceSelect
                            returnData={returnData}
                            isShowed={showStatuses[stepIndex]}
                            index={stepIndex++}
                            switchStep={switchStep}
                            showStep={showStep}
                        />
                        <AdditionalInformation
                            returnData={returnData}
                            isShowed={showStatuses[stepIndex]}
                            index={stepIndex++}
                            switchStep={switchStep}
                            showStep={showStep}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
