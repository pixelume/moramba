import React from 'react';
import {FaWifi, FaUtensils, FaMale, FaMoneyBillWave, FaCouch, FaFire, FaCarAlt, FaSatelliteDish, FaSwimmer} from 'react-icons/fa';
import {TooltipIcn} from './contentBody';

export default ({icons}) => {
    return Object.keys(icons).map((icon, idx) => {
        switch (icon) {
            case "wifi":
                if (icons.wifi) return <TooltipIcn key={`icn${idx}`} title="High Speed Wifi"><FaWifi/></TooltipIcn>
                break;
            case "maxGuests":
                if (icons.maxGuests) return <TooltipIcn key={`icn${idx}`} title={`Maximum Guests ${icons.maxGuests}`}><FaMale/> x {icons.maxGuests}</TooltipIcn>
                break;
            case "dstv":
                if (icons.dstv) return <TooltipIcn key={`icn${idx}`} title="DSTV Premium"><FaSatelliteDish/></TooltipIcn>
                break;
            case "kitchen":
                if (icons.kitchen) return <TooltipIcn key={`icn${idx}`} title="Fully Equiped Kitchen"><FaUtensils/></TooltipIcn>
                break;
            case "parking":
                if (icons.parking) return <TooltipIcn key={`icn${idx}`} title={`Parking for ${icons.parking} cars`}><FaCarAlt/> x {icons.parking}</TooltipIcn>
                break;
            case "priceFrom":
                if (icons.priceFrom) return <TooltipIcn key={`icn${idx}`} title={`Unit rates from R${icons.priceFrom} per night`}><FaMoneyBillWave/></TooltipIcn>
                break;
            case "livingRoom":
                if (icons.livingRoom) return <TooltipIcn key={`icn${idx}`} title="Living Area"><FaCouch/></TooltipIcn>
                break;
            case "fireplace":
                if (icons.fireplace) return <TooltipIcn key={`icn${idx}`} title="Built-in Braai"><FaFire/></TooltipIcn>
                break;
            case "pool":
                if (icons.pool) return <TooltipIcn key={`icn${idx}`} title="Swimming Pool"><FaSwimmer/></TooltipIcn>
                break;
            default:
                return null;
        }
    })
}