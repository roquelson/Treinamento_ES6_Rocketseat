import api from './api';

class App{
    constructor(){
        this.repositories = [];

        this.formEl =document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.ListEl =document.getElementById('repo-list');
        this.registerHandlers();
    }
    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
       

        

    }
    setLoading(loading = true){
if(loading === true){
    let loadingEl = document.createElement('span');
    loadingEl.appendChild(document.createTextNode('Carregando...'));
    loadingEl.setAttribute('id','loading');
    this.formEl.appendChild(loadingEl);
}
else{
    document.getElementById('loading').remove();
}
    }
    async addRepository(event){
        event.preventDefault();

        const repoInput =this.inputEl.value;

        if(repoInput.length === 0)
        return;
         this.setLoading();
     try{
        const response = await api.get(`/repos/${repoInput}`);
        const {name,description,html_url,owner:{avatar_url}}=response.data;

        console.log(response);

        this.repositories.push({
        name,
        description,
        avatar_url,
        html_url,
        });
        this.inputEl.value="";
        this.render();
     }catch(err){
       alert('O repositorio nao existe');
       this.inputEl.value="";
     }
     this.setLoading(false);
    }
    render(){

        this.ListEl.innerHTML = '';

         this.repositories.forEach(repo => {
             let imgEL = document.createElement('img');
                 imgEL.setAttribute('src',repo.avatar_url);

             let titleEl = document.createElement('strong');
             titleEl.appendChild(document.createTextNode(repo.name));

             let description = document.createElement('p');
             description.appendChild(document.createTextNode(repo.description));


             let LinkEl = document.createElement('a');
             LinkEl.setAttribute('target','_blank');
             LinkEl.setAttribute('href',repo.html_url);
             LinkEl.appendChild(document.createTextNode('Acessar'));

             let  listItemEl =document.createElement('li');
             listItemEl.appendChild(imgEL);
             listItemEl.appendChild(titleEl);
             listItemEl.appendChild(description);
             listItemEl.appendChild(LinkEl);

             this.ListEl.appendChild(listItemEl);
});
        }
}
new App();