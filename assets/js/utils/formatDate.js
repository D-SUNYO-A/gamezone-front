export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    };
    
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}
