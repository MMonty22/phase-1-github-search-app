// When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
const form = document.getElementById('github-form')
form.addEventListener('submit', event => {
    event.preventDefault()
    submitForm(event.target[0])
})

function submitForm(event) {
    fetch (`https://api.github.com/search/users?q=${event.value}`)
    .then (res => res.json())
    .then (users => {
        for (let user of users.items) {
            //console.log('user',user)
            renderUsers(user)
        }
    })
}
// Using the results of the search, display information about the users to the page. You might include showing their username, avatar and a link to their profile 
const githubContainer = document.getElementById('github-container')

function renderUsers(user) {
    const userList = document.getElementById('user-list')
    const userLogin = document.createElement('h3')
    userLogin.innerText = user.login
    userLogin.addEventListener('click', event => {
        getRepos(event.target)
    })
    //console.log('userLogin', userLogin)
    const userAvatar = document.createElement('img')
    userAvatar.src = user.avatar_url
    //console.log('userAvatar', userAvatar)
    const userUrl = document.createElement('p')
    userUrl.innerText = user.html_url
    //console.log('userUrl', userUrl)
    githubContainer.append(userList)
    userList.append(userLogin, userUrl, userAvatar)
}

// Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
function getRepos(event) {
    fetch (`https://api.github.com/users/${event.innerText}/repos`)
    .then (res => res.json())
    .then (repos => {
        for (let repo of repos) {
            console.log('repo',repo)
            renderRepos(repo)
        }
    })
}

// Using the response from the Users Repos Endpoint, display all the repositories for that user on the page. 

function renderRepos(repo) {
    const repoList = document.getElementById('repos-list')
    const repoLi = document.createElement('li')
    repoLi.innerText = repo.name
    githubContainer.append(repoList)
    repoList.append(repoLi)
}