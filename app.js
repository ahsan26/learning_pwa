if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registeration => {
            console.log('SW REGISTERED!!');
        })
        .catch(err => {
            console.log("SW FAILED TO REGISTER!!", err);
        })
}

function getData(userId) {
    return fetch(`https://api.github.com/users/${userId}`)
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log('err', err);
            return err;
        });
}

async function showData() {
    const userId = document.getElementById('userId').value;
    let data = await getData(userId);
    document.querySelector('#data').style.display = 'block';
    document.querySelector('#name').innerHTML = data.name;
    document.querySelector('#respos').innerHTML = data.public_repos;
    document.querySelector('#profile_picture').src = data.avatar_url;
    document.querySelector('#followers').innerHTML = data.followers;
}