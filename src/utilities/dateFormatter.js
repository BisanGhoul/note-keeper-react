export const formatDateToJerusalemTime = (dateString) => {
    const date = new Date(dateString);
    
    if (isNaN(date)) {
      throw new Error("Invalid date format");
    }
  
    const options = {
      timeZone: 'Asia/Jerusalem',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    
    const [day, month, year, hour, minute] = formattedDate.replace(',', '').split(/[\s\/:]+/);
    
    // Return in "YYYY-MM-DD HH:MM" format
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };
