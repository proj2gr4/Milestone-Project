module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    format_dateTwo: date => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const days = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th",
                      "21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st"];
      return `${months[new Date(date).getMonth()]} ${days[new Date(date).getDate()-1]}, ${new Date(
        date
      ).getFullYear()}`;
    },
    format_dateThree: date => {
      console.log("Hello");
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const days = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th",
                      "21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st"];
      let hours = new Date(date).getHours();
      let minutes = new Date(date).getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      let time = hours + ':' + minutes + ' ' + ampm;
      
      return `${months[new Date(date).getMonth()]} ${days[new Date(date).getDate()-1]}, ${new Date(
        date
      ).getFullYear()} @ ${time}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1){
            return `${word}s`;
        }
        return word;
    },
    format_url: url =>{
        return url
            .replace('http://', '')
            .replace('https://', '')
            .replace('www.', '')
            .split('/')[0]
            .split('?')[0];
    },
    counter: arr=>{
      return arr.length;
    }
}