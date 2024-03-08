import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function validateEmail(value:any) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}
export function validateName(value:any) {
    let error;
    console.log("validateName - value:",value);
    if (!value) {
        error = 'Required field';
    }
    return error;
}
export function validateUsername(value:any) {
    let error;
    console.log("validateUsername - value:",value);
    if (!value) {
        error = 'Required field';
    }
    
    return error;
}
/* 1-770-736-8031 x56442
010-692-6593 x09125
1-463-123-4447
493-170-9623 x156
(254)954-1289
1-477-935-8478 x6430
210.067.6132
586.493.6943 x140
(775)976-6794 x41206
024-648-3804 */
export function validatePhone(value:any) {
    let error;
    console.log("validatePhone - value:",value);
    if (!value) {
        error = 'Required field';
    }
    else if(!(/^[0-9().\- x]+$/.test(value))){
        error = 'Invalid phone number'
    }
    return error;
}
export function validateAddressStreet(value:any) {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}
export function validateAddressSuite(value:any) {
    let error;
    /* if (!value) {
        error = 'Required';
    } */
    return error;
}
export function validateAddressCity(value:any) {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}
export function validateAddressZipCode(value:any) {
    let error;
    /* if (!value) {
        error = 'Required';
    } */
    return error;
}
export function validateAddressGeoLat(value:any) {
    let error;
    /* if (!value) {
        error = 'Required';
    } */
    return error;
}
export function validateAddressGeoLng(value:any) {
    let error;
    /* if (!value) {
        error = 'Required';
    } */
    return error;
}

export function validateCompanyName(value:any) {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}

export function validateCompanyCatchphrase(value:any) {
    let error;
    /* if (!value) {
        error = 'Required';
    } */
    return error;
}

export function validateCompanyBs(value:any) {
    let error;
    /* if (!value) {
        error = 'Required';
    } */
    return error;
}
export function validateWebsite(value:any) {
    let error;
    console.log("validateWebsite - value:",value);
    if (!value) {
        error = 'Required field';
    }
    return error;
}
export function ValidationMessage({msg}:any){
    return (
        <div className="text-danger">
        <FontAwesomeIcon icon={faExclamationCircle}/> {msg}
    </div>
    );
}