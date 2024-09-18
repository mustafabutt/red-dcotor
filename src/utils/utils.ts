const moment = require('moment');

export const filterDoctorsbyCity = (doctors, city)=>{

    const result = [];
  
    for (const doctor of doctors) {
      let found = false;
  
      // Ensure doctorTiming is an array
      const doctorTimings = Array.isArray(doctor.doctorTiming) ? doctor.doctorTiming : [doctor.doctorTiming];
  
      for (const timing of doctorTimings) {
        // Ensure location is an array
        const locations = Array.isArray(timing.location) ? timing.location : [timing.location];
        
        for (const location of locations) {
          if (location.city === city) {
            found = true;
            break;
          }
        }
        if (found) break;
      }
  
      if (found) {
        result.push(doctor);
      }
    }
  
    return result;
}

export const removeEmptyLocation = (doctorData) => {
  let timings = doctorData.map(doctor => {
    // Filter out doctorTiming objects where the location array is empty
    const filteredTimings = doctor.doctorTiming.filter(timing => timing.location.length > 0);

    // Return the doctor object with the filtered doctorTiming array
    return { doctorTiming: filteredTimings };
  });
  let arr=[];
  doctorData.forEach((doc,i) => {
    doc.doctorTiming = timings[i].doctorTiming
    arr.push(doc);
  });
  return arr
}


export const generateSlots = async (doctorTiming)=>{
  doctorTiming.forEach(locationData => {
      locationData.timing.forEach(timingData => {
          const slots = [];
          
          // Combine date with start and end times to create proper DateTime objects
          const day = timingData.day;
          let startTime = moment(`${day} ${timingData.start_time}`, 'YYYY-MM-DD HH:mm:ss');
          let endTime = moment(`${day} ${timingData.end_time}`, 'YYYY-MM-DD HH:mm:ss');

          // Generate time slots with 30-minute intervals
          while (startTime.isBefore(endTime)) {
              let slotStart = startTime.format('HH:mm:ss');
              let slotEnd = startTime.add(20, 'minutes').format('HH:mm:ss');

              // Check if slot end goes beyond endTime
              if (moment(slotEnd, 'HH:mm:ss').isAfter(endTime)) {
                  slotEnd = endTime.format('HH:mm:ss');
              }

              slots.push({
                  start: slotStart,
                  end: slotEnd
              });
          }

          // Add the generated slots to the timing object
          timingData.slots = slots;
      });
  });
  
  return doctorTiming;
}