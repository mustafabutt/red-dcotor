export function formDataToJson (formData:any){
    const obj = {};
    formData.forEach((value, key) => {
      // Check if the key already exists in the object
      if (obj.hasOwnProperty(key)) {
        // If the key already exists and is not an array, convert it to an array
        if (!Array.isArray(obj[key])) {
          obj[key] = [obj[key]];
        }
        // Push the new value to the array
        obj[key].push(value);
      } else {
        // Otherwise, set the key and value
        obj[key] = value;
      }
    });
    return obj;
  }