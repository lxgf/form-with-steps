import React, {useState} from 'react';
import mainStyle from '../assets/styles/Main.module.css'
import settingIcon from '../assets/images/setting.svg'
import FullName from "./Steps/FullName";
import PhoneNumber from "./Steps/PhoneNumber";
import PlaceSelect from "./Steps/PlaceSelect";

const Main = () => {
    const returnData = data => {
        console.log(data)
    }

    const switchStep = index => {
        const newShowStatuses = [...showStatuses]
        if (index !== newShowStatuses.length-1){
            newShowStatuses[index] = false
            newShowStatuses[index+1] = true
            setShowStatuses(newShowStatuses)
        } else {
            console.log('all')
        }
    }

    let stepIndex = 0

    const [showStatuses, setShowStatuses] = useState(
        new Array(3)
            .fill(true)
            .fill(false, 1)
    )

    const showStep = index => {
        const newShowStatuses = [...showStatuses]
        newShowStatuses.fill(false)
        newShowStatuses[index] = true
        setShowStatuses(newShowStatuses)
    }

    return (
        <div className={mainStyle.main}>
            <div className={mainStyle.container}>
                <header className={mainStyle.header}>
                    <img src={settingIcon} alt="Мастер Настройки"/>
                    <span>Мастер Настройки</span>
                </header>
                <div className={mainStyle.regBlock}>
                    <div className={mainStyle.regBlock__title}>
                        <span>Новый канал</span>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
