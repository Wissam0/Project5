import updateUI from './updateUI';
const submitbutton = document.getElementById('submit');

submitbutton.addEventListener('click', async function () {
  const departtime = new Date(document.getElementById('myDate').value).getTime() / 1000;
  const returntime = new Date(document.getElementById('backDate').value).getTime() / 1000;
  const currenttime = Math.round((new Date()).getTime() / 1000);
  const future = parseInt((departtime - currenttime) / (3600 * 24));
  const duration = parseInt((returntime - departtime) / (3600 * 24));
  const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    })
  };

  const clientInfo = {
    departtime: departtime,
    currenttime: currenttime,
    city: document.getElementById('myCity').value,
    future: future,
    duration: duration
  };

  postData('http://localhost:8082/dataPost', clientInfo)
    .then(data => updateUI())
});