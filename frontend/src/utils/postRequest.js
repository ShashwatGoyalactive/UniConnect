
const makePostRequest = async (url , formData) => {

  try {
      const response = await fetch(`api${url}` ,{
          method: "POST",
          credentials :"include",
          body : formData,
      });
      if(!response.ok){
        throw new Error(`Error : ${response.status}`)
      }
      return await response.json();
  } catch (error) {
    console.log('Error while making post request , ' , error);
    return null;
  }
}

export default makePostRequest;