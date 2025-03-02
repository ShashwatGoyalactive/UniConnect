import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import makePostRequest from './../utils/postRequest';
import makeGetRequest from './../utils/getRequest';
const SignUp = () => {
    const [formData , setFormData] = useState( {
        firstName : '',
        lastName : '',
        password : '',
        email: '',
        username : '',
        phone: '',
        profileImage : null,
    });

    const [error, setError] = useState({});

    const navigate = useNavigate();

    // update form data fields for modified value 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.type === 'file' ? e.target.files[0] : e.target.value 
        });
    };

    // check for unique fields (email , username)
    const CheckisUnique = async (field , value) => {
        if(!value)return;

        try{
            const response = await makeGetRequest(`/users/check/${field}/${value}`);

            if(!response.isUnique){  
                setError({
                    ...error,
                    [field] : `${field} already exists`
                });
                
        }
        else {
            setError((prev) => {
                    const updateErrors = { ...prev };
                    delete updateErrors[field];
                    return updateErrors;
            })
        }
    }catch(error){
        console.log(`Duplicate check failed for ${field}` , error);
        
    }
}

    const handleSubmit = async(e) => {
        e.preventDefault();
        // clear previous errors
        setError({});

        //  check for empty fields
        for( const field in formData ){
            if( formData[field] === '' && field !== 'profileImage' && field !== 'lastName' ){ 
                setError({
                    ...error,
                    [field] : `${field} is required`
                });
            }
        }

        //  if any required field is empty return
        if(Object.keys(error).length >  0) return;

        // create form data object
        const fromDataObj = new FormData();

        for( const field in formData ){
            fromDataObj.append(field , formData[field]);
        }

        // make post request
        const response = await makePostRequest('/users/signup' , fromDataObj);

        try {
            if(response && response.data){
                console.log(response);
                navigate('/login');
            }
        
        } catch (error) {
            console.log('Error encountered while signing up' , error);
            setError('Error encountered while signing up');
        }
    };


  return (
    <>
      <form action="post" onSubmit={handleSubmit}>
        <label htmlFor="firstName">FirstName</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        {error.firstName && <p className="error">{error.firstName}</p>}

        <label htmlFor="lastName">LastName</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {error.lastName && <p className="error">{error.lastName}</p>}

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter phone"
          value={formData.phone}
          onChange={handleChange}
        />

        {error.phone && <p className="error">{error.phone}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          onBlur={(e) => CheckisUnique("email", e.target.value)}
          required
        />

        {error.email && <p className="error">{error.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error.password && <p className="error">{error.password}</p>}


        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onBlur={(e) => CheckisUnique("email", e.target.value)}
          onChange={handleChange}
          required
        />

        {error.username && <p className="error">{error.username}</p>}

        <label htmlFor="profileImage">Profile Image</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          value={formData.profileImage}
          onChange={handleChange}
        />

        {error.profileImage && <p className="error">{error.profileImage}</p>}

        <button type="submit" disabled={Object.keys(error).length > 0}>Sign Up</button>
      </form>
    </>
  );
}

export default SignUp