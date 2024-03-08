import { User } from "../model/User";
import { Formik, Form, Field } from 'formik';
import { ValidationMessage, validateAddressCity, validateAddressGeoLat, validateAddressGeoLng, validateAddressStreet, validateAddressSuite, validateAddressZipCode, validateCompanyBs, validateCompanyCatchphrase, validateCompanyName, validateEmail, validateName, validatePhone, validateUsername, validateWebsite } from "../utilities/FormValidation";

const CreateEditUser = (props:any) => {
    let {
        setAction,
        setAllUsers,
        setErrorMsg,
        user,
        setUser,
        mutation,
        isEdit
    } = props;
    
    const submitForm = () => {
        let data:any = user
        mutation.mutate(data);
    };
    if (mutation.isLoading) {
        return <span>Submitting...</span>;
    }

    
    function goBack(){
        setErrorMsg(null);
        setAction('list');
    }
    function changeUser(e:any, field:string){
        setUser((prevUser:User)=>{
            return {
                ...prevUser,
                [field]: e.target.value
            }
        })
    }
    function setNested(v:any, k:string[], object:any){
        if(k.length > 1){
            const KEY = k.shift()!;
            setNested(v, k, object[KEY])
        }
        else{
            const IDX = k[0]
            object[IDX] = v
        }
    }
    function changeUserNested(e:any, fields:string[]){
        setUser((prevUser:User)=>{
            let newUser:User = {
                ...prevUser,
            }
            setNested(e.target.value, fields, newUser);
            return newUser
        })
    }
  return (
    <div className="container">
        <Formik
        enableReinitialize
        initialValues={{
            name: user.name,
            username: user.username,
            email: user.email,
            address_street: user.address && user.address.street,
            address_suite: user.address && user.address.suite,
            address_city: user.address && user.address.city,
            address_zipcode: user.address && user.address.zipcode,
            address_geo_lat: user.address && user.address.geo && user.address.geo.lat,
            address_geo_lng: user.address && user.address.geo && user.address.geo.lng,
            phone: user.phone,
            website: user.website,
            company_name: user.company!.name,
            company_catchPhrase: user.company!.catchPhrase,
            company_bs: user.company!.bs,
        }}
        onSubmit={values => {
            // same shape as initial values
            submitForm();
        }}
        >
        {({ errors, touched, isValidating }) => (
            <div className="container">
                <Form>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="name" id="floatingName" 
                                className="form-control"
                                placeholder="Name" validate={validateName}
                                onChange={(e:any) => changeUser(e, 'name')}/>
                                {errors.name && touched.name && <ValidationMessage msg={errors.name}/>}
                                <label htmlFor="floatingName">
                                    Name
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="username" id="floatingUsername" 
                                className="form-control"
                                placeholder="Username" validate={validateUsername}
                                onChange={(e:any) => changeUser(e, 'username')}/>
                                {errors.username && touched.username && <ValidationMessage msg={errors.username}/>}
                                <label htmlFor="floatingUsername">
                                    Username
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="email" id="floatingEmail" 
                                className="form-control"
                                placeholder="Email" validate={validateEmail}
                                onChange={(e:any) => changeUser(e, 'email')}/>
                                {errors.email && touched.email && <ValidationMessage msg={errors.email}/>}
                                <label htmlFor="floatingEmail">
                                    Email
                                </label>
                            </div>
                        </div>

                        {/* phone */}
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="phone" id="floatingPhone" 
                                className="form-control"
                                placeholder="Phone" validate={validatePhone}
                                onChange={(e:any) => changeUser(e, 'phone')}/>
                                {errors.phone && touched.phone && <ValidationMessage msg={errors.phone}/>}
                                <label htmlFor="floatingPhone">
                                    Phone
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* address */}
                    <div className="row">
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="address_street" id="floatingStreet" 
                                className="form-control"
                                placeholder="Street" validate={validateAddressStreet}
                                onChange={(e:any) => changeUserNested(e, ['address','street'])}/>
                                {errors.address_street && touched.address_street && 
                                <ValidationMessage msg={errors.address_street}/>}
                                <label htmlFor="floatingStreet">
                                    Street
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="address_suite" id="floatingSuite" 
                                className="form-control"
                                placeholder="Suite" validate={validateAddressSuite}
                                onChange={(e:any) => changeUserNested(e, ['address','suite'])}/>
                                {errors.address_suite && touched.address_suite && 
                                <ValidationMessage msg={errors.address_suite}/>}
                                <label htmlFor="floatingStreet">
                                    Suite
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="address_city" id="floatingAddressCity" 
                                className="form-control"
                                placeholder="City" validate={validateAddressCity}
                                onChange={(e:any) => changeUserNested(e, ['address','city'])}/>
                                {errors.address_city && touched.address_city && 
                                <ValidationMessage msg={errors.address_city}/>}
                                <label htmlFor="floatingAddressCity">
                                    City
                                </label>
                            </div>        
                        </div>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="address_zipcode" id="floatingAddressZipCode" 
                                className="form-control"
                                placeholder="Zipcode" validate={validateAddressZipCode}
                                onChange={(e:any) => changeUserNested(e, ['address','zipcode'])}/>
                                {errors.address_zipcode && touched.address_zipcode && 
                                <ValidationMessage msg={errors.address_zipcode}/>}
                                <label htmlFor="floatingAddressZipCode">
                                    Zipcode
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="address_geo_lat" id="floatingAddressGeoLat" 
                                className="form-control"
                                placeholder="Latitude" validate={validateAddressGeoLat}
                                onChange={(e:any) => changeUserNested(e, ['address','geo', 'lat'])}/>
                                {errors.address_geo_lat && touched.address_geo_lat && 
                                <ValidationMessage msg={errors.address_geo_lat}/>}
                                <label htmlFor="floatingAddressGeoLat">
                                    Latitude
                                </label>
                            </div> 
                        </div>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="address_geo_lng" id="floatingAddressGeoLng" 
                                className="form-control"
                                placeholder="Longitude" validate={validateAddressGeoLng}
                                onChange={(e:any) => changeUserNested(e, ['address','geo', 'lng'])}/>
                                {errors.address_geo_lng && touched.address_geo_lng && 
                                <ValidationMessage msg={errors.address_geo_lng}/>}
                                <label htmlFor="floatingAddressGeoLng">
                                    Longitude
                                </label>
                            </div> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="website" id="floatingWebsite" 
                                className="form-control"
                                placeholder="Website" validate={validateWebsite}
                                onChange={(e:any) => changeUser(e, 'website')}/>
                                {errors.website && touched.website && <ValidationMessage msg={errors.website}/>}
                                <label htmlFor="floatingWebsite">
                                    Website
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="company_name" id="floatingCompanyName" 
                                className="form-control"
                                placeholder="Company name" validate={validateCompanyName}
                                onChange={(e:any) => changeUserNested(e, ['company', 'name'])}/>
                                {errors.company_name && touched.company_name && 
                                <ValidationMessage msg={errors.company_name}/>}
                                <label htmlFor="floatingCompanyName">
                                    Company name
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="company_catchPhrase" id="floatingCompanyCatchphrase" 
                                className="form-control"
                                placeholder="Company Catchphrase" validate={validateCompanyCatchphrase}
                                onChange={(e:any) => changeUserNested(e, ['company', 'catchPhrase'])}/>
                                {errors.company_catchPhrase && touched.company_catchPhrase && 
                                <ValidationMessage msg={errors.company_catchPhrase}/>}
                                <label htmlFor="floatingCompanyCatchphrase">
                                    Company Catchphrase
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <Field name="company_bs" id="floatingCompanyBusinessService" 
                                className="form-control"
                                placeholder="Company Business Service" validate={validateCompanyBs}
                                onChange={(e:any) => changeUserNested(e, ['company', 'bs'])}/>
                                {errors.company_bs && touched.company_bs && 
                                <ValidationMessage msg={errors.company_bs}/>}
                                <label htmlFor="floatingCompanyBusinessService">
                                    Company Business Service
                                </label>
                            </div>  
                        </div>
                    </div>
                    <button
                    type="submit"
                    className="btn btn-primary me-1">
                        {isEdit?'Update':'Create'}
                    </button>
                    <button onClick={()=>goBack()}
                    type="button"
                    className="btn btn-danger">
                        Back
                    </button>
                </Form>
            </div>
        )}
        </Formik>
    </div>
  );
};
export default CreateEditUser;