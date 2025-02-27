 const makeGetRequest = async (url , auth = false) =>  {
   try {
     const response = await fetch(`api${url}`, {
         method: "GET",
         credentials : auth ? 'include' :"omit",
     });
 
    if(!response.ok){
        throw new Error(`Error : ${response.status}`)
    }
    return await response.json();
   } catch (error) {
    console.log('Error which making a get request' , error);
    return null;
    
   }
 }

 export default makeGetRequest;