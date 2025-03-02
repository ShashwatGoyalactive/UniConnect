 const makeGetRequest = async (url) =>  {
   try {
     const response = await fetch(`api${url}`, {
         method: "GET",
         credentials : "include",
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